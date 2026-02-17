import { NextRequest } from 'next/server'
import { watch } from 'fs'
import { join } from 'path'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Not available in production', { status: 404 })
  }

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      const connectMsg = `data: ${JSON.stringify({ type: 'connected' })}\n\n`
      controller.enqueue(encoder.encode(connectMsg))

      const docsPath = join(process.cwd(), 'docs')

      // Watch the docs directory recursively
      const watcher = watch(
        docsPath,
        { recursive: true },
        (eventType, filename) => {
          if (!filename) return

          // Only watch for .mdx and .json files (MDX files and category configs)
          if (filename.endsWith('.mdx') || filename.endsWith('.json')) {
            console.log(`[MDX Watch] ${eventType}: ${filename}`)

            const message = `data: ${JSON.stringify({
              type: 'change',
              file: filename,
              eventType
            })}\n\n`

            try {
              controller.enqueue(encoder.encode(message))
            } catch (error) {
              console.error('[MDX Watch] Error sending message:', error)
            }
          }
        }
      )

      function cleanup() {
        clearInterval(heartbeat)
        watcher.close()
        try {
          controller.close()
        } catch (error) {
          // Controller might already be closed
        }
      }

      // Heartbeat: close watcher if client silently disconnects
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': heartbeat\n\n'))
        } catch {
          console.log('[MDX Watch] Heartbeat failed, cleaning up')
          cleanup()
        }
      }, 30_000)

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        console.log('[MDX Watch] Client disconnected')
        cleanup()
      })

      // Handle errors
      watcher.on('error', (error) => {
        console.error('[MDX Watch] Watcher error:', error)
        cleanup()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  })
}
