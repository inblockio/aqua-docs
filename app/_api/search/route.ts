import { NextRequest, NextResponse } from "next/server"
import { MeiliSearch } from "meilisearch"
import { getConfig } from "@/lib/config"

export async function POST(request: NextRequest) {
  try {
    const config = getConfig()
    const searchConfig = config.search

    // Check if search is enabled and Meilisearch is configured
    if (!searchConfig?.enabled || searchConfig.provider !== "meilisearch") {
      return NextResponse.json(
        { error: "Search is not enabled" },
        { status: 400 }
      )
    }

    const meilisearchConfig = searchConfig.meilisearch
    if (!meilisearchConfig) {
      return NextResponse.json(
        { error: "Meilisearch is not configured" },
        { status: 400 }
      )
    }

    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Invalid query" },
        { status: 400 }
      )
    }

    // Initialize Meilisearch client with API key
    const client = new MeiliSearch({
      host: meilisearchConfig.host,
      apiKey: meilisearchConfig.apiKey || "",
    })

    // Search the index
    const index = client.index(meilisearchConfig.indexName)
    const searchResults = await index.search(query, {
      limit: 50, // Get more results before deduplication
      attributesToHighlight: ["title", "content"],
      attributesToCrop: ["content"],
      cropLength: 100,
    })

    // Deduplicate results by slug and version on the server side
    const seenDocs = new Set<string>()
    const uniqueHits = searchResults.hits.filter((hit: any) => {
      const key = `${hit.version}-${hit.slug}`
      if (seenDocs.has(key)) {
        return false
      }
      seenDocs.add(key)
      return true
    }).slice(0, 20) // Return only top 20 unique results

    return NextResponse.json({
      hits: uniqueHits,
      query: query,
      processingTimeMs: searchResults.processingTimeMs,
      estimatedTotalHits: uniqueHits.length,
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      { error: "Search failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
