export interface TOCItem {
  id: string
  title: string
  level: number
}

/**
 * Extract headings from HTML string for table of contents
 */
export function extractHeadings(html: string): TOCItem[] {
  const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/g
  const toc: TOCItem[] = []
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = Number.parseInt(match[1])
    const id = match[2]
    const title = match[3].replace(/<[^>]*>/g, "") // Strip HTML tags

    toc.push({ id, title, level })
  }

  return toc
}
