import { MeiliSearch } from "meilisearch"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getConfig } from "../lib/config.server"
import { extractSearchText } from "@/components/docs/componentTextProps"

interface SearchDocument {
    id: string
    title: string
    content: string
    slug: string
    version: string
    category?: string
    tags?: string[]
}

async function indexDocuments() {
    const config = getConfig()
    const searchConfig = config.search

    if (!searchConfig?.enabled || searchConfig.provider !== "meilisearch") {
        console.error("Meilisearch is not enabled in config")
        process.exit(1)
    }

    const meilisearchConfig = searchConfig.meilisearch
    if (!meilisearchConfig) {
        console.error("Meilisearch configuration is missing")
        process.exit(1)
    }

    console.log("Connecting to Meilisearch at:", meilisearchConfig.host)

    const client = new MeiliSearch({
        host: meilisearchConfig.host,
        apiKey: meilisearchConfig.apiKey || "",
    })

    const index = client.index(meilisearchConfig.indexName)

    // Get all MDX files
    const docsDir = path.join(process.cwd(), "docs")
    const documents: SearchDocument[] = []

    function processDirectory(dir: string, version: string) {
        const files = fs.readdirSync(dir)

        for (const file of files) {
            const filePath = path.join(dir, file)
            const stat = fs.statSync(filePath)

            if (stat.isDirectory()) {
                processDirectory(filePath, version)
            } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
                const content = fs.readFileSync(filePath, "utf-8")
                const { data, content: mdxContent } = matter(content)

                // Generate slug from file path
                const relativePath = path.relative(path.join(docsDir, version), filePath)
                const slug = relativePath
                    .replace(/\.(mdx|md)$/, "")
                    .replace(/\\/g, "/")

                // Extract category from path
                const pathParts = slug.split("/")
                const category = pathParts.length > 1 ? pathParts[0] : undefined

                // Clean content (remove code blocks and special chars for better search)
                // const cleanContent = mdxContent
                //     .replace(/```[\s\S]*?```/g, "") // Remove code blocks
                //     .replace(/`[^`]+`/g, "") // Remove inline code
                //     .replace(/[#*_~]/g, "") // Remove markdown symbols
                //     .replace(/\n+/g, " ") // Replace newlines with spaces
                //     .trim()
                //     .slice(0, 1000) // Limit content length

                const cleanContent = extractSearchText(mdxContent);

                // console.log("------");
                // console.log("Cleaned content: ");
                // console.log(cleanContent);
                // console.log("------");
                // Create a valid document ID (replace periods with underscores)
                // const docId = `${version.replace(/\./g, "_")}-${slug.replace(/\//g, "-")}`
                const docId = slug.replace(/\//g, "-")

                documents.push({
                    id: docId,
                    title: data.title || slug,
                    content: cleanContent,
                    slug: slug,
                    version: version,
                    category: category,
                    tags: data.tags || [],
                })
            }
        }
    }

    // Process all version directories
    const versions = fs.readdirSync(docsDir).filter((item) => {
        const itemPath = path.join(docsDir, item)
        return fs.statSync(itemPath).isDirectory()
    })

    console.log(`Found ${versions.length} version(s):`, versions.join(", "))

    for (const version of versions) {
        const versionPath = path.join(docsDir, version)
        processDirectory(versionPath, version)
    }

    console.log(`Indexing ${documents.length} documents...`)

    try {
        // Configure searchable attributes first
        console.log("Configuring search settings...")
        await index.updateSearchableAttributes(["title", "content", "tags"])
        await index.updateFilterableAttributes(["version", "category", "tags"])
        await index.updateSortableAttributes(["title"])
        await index.updateDistinctAttribute("id")
        await index.updateSettings({
            rankingRules: [
                "words",
                "typo",
                "proximity",
                "attribute",
                "sort",
                "exactness"
            ]
        })
        console.log("✅ Search configuration updated!")

        // Delete existing documents
        console.log("Clearing old documents...")
        const deleteTask = await index.deleteAllDocuments()
        console.log("Delete task created:", deleteTask.taskUid)

        // Add new documents
        console.log("Adding documents...")
        const addTask = await index.addDocuments(documents, { primaryKey: "id" })
        console.log("Add task created:", addTask.taskUid)
        console.log("✅ Documents sent for indexing!")

        console.log("\n⏳ Indexing is processing in the background...")
        console.log("Wait a few seconds, then run 'npm run test:search' to verify!")
    } catch (error) {
        console.error("Error indexing documents:", error)
        if (error instanceof Error) {
            console.error("Error message:", error.message)
        }
        process.exit(1)
    }
}

indexDocuments()
