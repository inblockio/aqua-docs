

export const COMPONENT_TEXT_PROPS: Record<string, string[]> = {
    // Accordion components
    Accordion: ["title"],
    AccordionItem: ["title"],

    // Alert/Callout components
    Alert: ["title", "description"],
    Banner: ["title"],
    Callout: ["title", "content"],
    Note: ["title"],
    Warning: ["title", "text"],

    // Navigation components
    BreadCrumb: ["title", "slug", "version"],

    // Card components
    Card: ["title", "description"],
    ImageCard: ["title", "description", "alt"],

    // Media components
    Image: ["alt", "caption"],
    Video: ["caption"],
    Frame: ["title"],
    Mermaid: ["caption"],

    // Interactive components
    Tooltip: ["content"],

    // Code components
    CodeBlock: ["filename"],

    // Step components
    Step: ["title"],
}

export function extractComponentPropsText(mdx: string): string {
    return mdx.replace(
        /<([A-Z][\w]*)\b([^/>]*)\/>/g,
        (_, component, props) => {
            const searchableProps = COMPONENT_TEXT_PROPS[component]
            if (!searchableProps) return " "

            let extracted = ""

            for (const prop of searchableProps) {
                const match = props.match(
                    new RegExp(`${prop}="([^"]+)"`, "i")
                )
                if (match) {
                    extracted += " " + match[1]
                }
            }

            return extracted || " "
        }
    )
}

export function extractSearchText(mdx: string): string {
    return extractComponentPropsText(mdx)
        // 2. Remove fenced code blocks
        .replace(/```[\s\S]*?```/g, " ")

        // 3. Remove JSX blocks with children
        .replace(/<([A-Z][\w]*)\b[^>]*>[\s\S]*?<\/\1>/g, " ")

        // 4. Remove remaining JSX & HTML
        .replace(/<\/?[A-Za-z][^>]*>/g, " ")

        // 5. Remove inline code
        .replace(/`[^`]+`/g, " ")

        // 6. Remove markdown links (keep text)
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

        // 7. Remove markdown noise
        .replace(/[#>*_~=-]+/g, " ")

        // 8. Normalize whitespace
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 1000)
}