import { NextRequest } from 'next/server'
import { watch } from 'fs'
import path from 'path'

const DOCS_DIR = path.join(process.cwd(), 'docs')

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Not available in production', { status: 404 })
  }

  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'connected' })}\n\n`))

      // Watch for file changes in docs directory
      const watcher = watch(
        DOCS_DIR,
        { recursive: true },
        (eventType, filename) => {
          if (filename && filename.endsWith('.mdx')) {
            console.log(`[MDX Watch] File ${eventType}: ${filename}`)
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'change', file: filename })}\n\n`)
            )
          }
        }
      )

      // Cleanup on close
      request.signal.addEventListener('abort', () => {
        watcher.close()
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
