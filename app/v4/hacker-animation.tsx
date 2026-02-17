"use client"

import { useEffect, useRef, type RefObject } from "react"

const THREAT_MESSAGES = [
  "ACCESS DENIED",
  "BREACH DETECTED",
  "DATA STOLEN",
  "IDENTITY SPOOFED",
  "SYSTEM HACKED",
  "CREDENTIALS LEAKED",
  "UNAUTHORIZED ACCESS",
  "TAMPERED DATA",
  "DEEPFAKE DETECTED",
  "TRUST BROKEN",
  "ORIGIN UNKNOWN",
  "FORGERY ALERT",
  "SUPPLY CHAIN COMPROMISED",
  "MODEL POISONED",
  "PROMPT INJECTED",
  "AI HALLUCINATION",
  "UNVERIFIED SOURCE",
  "INTEGRITY FAILED",
]

const SECURE_MESSAGES = [
  "VERIFIED",
  "ACCESS AUTHORIZED",
  "CONTEXT SECURE",
  "IDENTITY CONFIRMED",
  "PROVENANCE VALID",
  "SIGNATURE VERIFIED",
  "HASH MATCHED",
  "TRUST ESTABLISHED",
  "ORIGIN AUTHENTICATED",
  "INTEGRITY CHECK PASSED",
  "CHAIN VALID",
  "REVISION SEALED",
  "WITNESS CONFIRMED",
  "DATA SOVEREIGN",
  "AQUA PROTECTED",
  "CRYPTOGRAPHIC PROOF",
]

interface FloatingMessage {
  text: string
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  maxOpacity: number
  fadeIn: boolean
  life: number
  maxLife: number
  type: "threat" | "secure"
  fontSize: number
  glitchTimer: number
  glitchActive: boolean
}

interface HackerAnimationProps {
  /** Ref whose .current is 0 (top/hostile) → 1 (bottom/secure). */
  scrollRatioRef: RefObject<number>
}

export default function HackerAnimation({ scrollRatioRef }: HackerAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const parent = canvas.parentElement
    if (!parent) return

    let w = (canvas.width = parent.offsetWidth)
    let h = (canvas.height = parent.offsetHeight)
    let animId = 0

    /* ── Offscreen caches ── */
    let hexCache: HTMLCanvasElement
    let scanCache: HTMLCanvasElement

    function buildHexCache() {
      hexCache = document.createElement("canvas")
      hexCache.width = w
      hexCache.height = h
      const hctx = hexCache.getContext("2d")!
      const spacing = 80
      // Draw at full alpha; composited with globalAlpha in animate()
      hctx.strokeStyle = "rgb(0, 255, 65)"
      hctx.lineWidth = 0.5
      for (let x = 0; x < w + spacing; x += spacing) {
        for (let y = 0; y < h + spacing; y += spacing * 0.866) {
          const offset = (Math.floor(y / (spacing * 0.866)) % 2) * (spacing / 2)
          hctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6
            const px = x + offset + Math.cos(angle) * (spacing / 2.5)
            const py = y + Math.sin(angle) * (spacing / 2.5)
            if (i === 0) hctx.moveTo(px, py)
            else hctx.lineTo(px, py)
          }
          hctx.closePath()
          hctx.stroke()
        }
      }
    }

    function buildScanCache() {
      scanCache = document.createElement("canvas")
      scanCache.width = w
      scanCache.height = h
      const sctx = scanCache.getContext("2d")!
      sctx.fillStyle = "rgba(255, 255, 255, 0.008)"
      for (let y = 0; y < h; y += 4) {
        sctx.fillRect(0, y, w, 1)
      }
    }

    function buildCaches() {
      buildHexCache()
      buildScanCache()
    }
    buildCaches()

    const handleResize = () => {
      w = canvas.width = parent.offsetWidth
      h = canvas.height = parent.offsetHeight
      buildCaches()
    }
    window.addEventListener("resize", handleResize)

    const isMobile = w < 640
    const maxMessages = isMobile ? 20 : 50
    const messages: FloatingMessage[] = []
    let frameCount = 0

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a)
    }
    function pick<T>(arr: T[]): T {
      return arr[Math.floor(Math.random() * arr.length)]
    }

    function spawnMessage() {
      const r = scrollRatioRef.current
      const threatChance = 0.8 - r * 0.6
      const isThreat = Math.random() < threatChance
      const type = isThreat ? "threat" : "secure"
      const text = isThreat ? pick(THREAT_MESSAGES) : pick(SECURE_MESSAGES)

      const speedMult = 1 - r * 0.4
      const edge = Math.floor(Math.random() * 4)
      let x: number, y: number, vx: number, vy: number
      const speed = rand(0.3, 1.2) * speedMult

      switch (edge) {
        case 0:
          x = rand(0, w); y = -20; vx = rand(-1.2, 1.2) * speedMult; vy = speed
          break
        case 1:
          x = w + 20; y = rand(0, h); vx = -speed; vy = rand(-1.2, 1.2) * speedMult
          break
        case 2:
          x = rand(0, w); y = h + 20; vx = rand(-1.2, 1.2) * speedMult; vy = -speed
          break
        default:
          x = -20; y = rand(0, h); vx = speed; vy = rand(-1.2, 1.2) * speedMult
          break
      }

      messages.push({
        text, x, y, vx, vy,
        opacity: 0,
        maxOpacity: rand(0.08, 0.35),
        fadeIn: true,
        life: 0,
        maxLife: rand(400, 900),
        type,
        fontSize: rand(10, 18),
        glitchTimer: 0,
        glitchActive: false,
      })
    }

    /* ── Vertical data streams ── */
    const streams: { x: number; chars: string[]; y: number; speed: number; baseSpeed: number; opacity: number; baseOpacity: number }[] = []
    const streamCount = isMobile ? Math.floor(w / 60) : Math.floor(w / 30)
    for (let i = 0; i < streamCount; i++) {
      const spd = rand(0.3, 1.5)
      const op = rand(0.02, 0.06)
      streams.push({
        x: rand(0, w),
        chars: Array.from({ length: Math.floor(rand(5, 20)) }, () =>
          String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
        ),
        y: rand(-h, 0),
        speed: spd,
        baseSpeed: spd,
        opacity: op,
        baseOpacity: op,
      })
    }

    function drawStreams() {
      const r = scrollRatioRef.current
      ctx!.font = "12px monospace"
      for (const stream of streams) {
        stream.speed = stream.baseSpeed * (1 - r * 0.5)
        stream.opacity = stream.baseOpacity * (1 - r * 0.4)

        stream.y += stream.speed
        if (stream.y > h + stream.chars.length * 14) {
          stream.y = -stream.chars.length * 14
          stream.x = rand(0, w)
        }
        for (let i = 0; i < stream.chars.length; i++) {
          const cy = stream.y + i * 14
          if (cy < -14 || cy > h + 14) continue
          const fade = i === stream.chars.length - 1 ? stream.opacity * 2 : stream.opacity
          ctx!.fillStyle = `rgba(0, 255, 65, ${fade})`
          ctx!.fillText(stream.chars[i], stream.x, cy)
          if (Math.random() < 0.01 * (1 - r * 0.7)) {
            stream.chars[i] = String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
          }
        }
      }
    }

    /* ── Main loop ── */
    function animate() {
      const r = scrollRatioRef.current

      // Background tint: black → very dark green
      const bgR = Math.round(5 - r * 2)
      const bgG = Math.round(5 + r * 8)
      const bgB = Math.round(8 - r * 3)
      ctx!.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`
      ctx!.fillRect(0, 0, w, h)

      frameCount++

      // Hex grid — cached, composited with variable alpha
      const hexAlpha = 0.015 + r * 0.015
      ctx!.globalAlpha = hexAlpha
      ctx!.drawImage(hexCache, 0, 0)
      ctx!.globalAlpha = 1

      drawStreams()

      // Scan lines — cached
      ctx!.drawImage(scanCache, 0, 0)

      // Spawn messages
      const spawnInterval = Math.round(25 + r * 25)
      if (frameCount % spawnInterval === 0 && messages.length < maxMessages) {
        spawnMessage()
      }
      if (frameCount % (spawnInterval + 15) === 0 && messages.length < maxMessages) {
        spawnMessage()
      }

      // Update & draw messages (no shadowBlur — major perf win)
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i]
        msg.life++
        msg.x += msg.vx
        msg.y += msg.vy

        // Fade in/out
        const fadeInDuration = 60
        const fadeOutStart = msg.maxLife - 120
        if (msg.life < fadeInDuration) {
          msg.opacity = (msg.life / fadeInDuration) * msg.maxOpacity
        } else if (msg.life > fadeOutStart) {
          msg.opacity = ((msg.maxLife - msg.life) / 120) * msg.maxOpacity
        } else {
          msg.opacity = msg.maxOpacity
        }

        // Glitch effect for threats
        if (msg.type === "threat") {
          msg.glitchTimer++
          const glitchThreshold = 100 + r * 400
          if (msg.glitchTimer > rand(glitchThreshold, glitchThreshold + 200)) {
            msg.glitchActive = true
            msg.glitchTimer = 0
          }
          if (msg.glitchActive && msg.glitchTimer > 5) msg.glitchActive = false
        }

        // Remove dead messages
        if (msg.life > msg.maxLife || msg.x < -200 || msg.x > w + 200 || msg.y < -50 || msg.y > h + 50) {
          messages.splice(i, 1)
          continue
        }

        // Draw — lightweight glow via double-render instead of expensive shadowBlur
        ctx!.font = `bold ${msg.fontSize}px monospace`

        if (msg.type === "threat") {
          const threatAlpha = msg.opacity * (1 - r * 0.5)

          if (msg.glitchActive) {
            ctx!.fillStyle = `rgba(255, 0, 0, ${threatAlpha * 0.5})`
            ctx!.fillText(msg.text, msg.x + rand(-3, 3), msg.y + rand(-2, 2))
            ctx!.fillStyle = `rgba(255, 100, 100, ${threatAlpha * 0.7})`
            ctx!.fillText(msg.text, msg.x + rand(-2, 2), msg.y + rand(-1, 1))
          }

          // Soft glow layer (cheaper than shadowBlur)
          ctx!.fillStyle = `rgba(255, 20, 20, ${threatAlpha * 0.3})`
          ctx!.fillText(msg.text, msg.x + 1, msg.y + 1)
          // Main text
          ctx!.fillStyle = `rgba(255, 20, 20, ${threatAlpha})`
          ctx!.fillText(msg.text, msg.x, msg.y)
        } else {
          const secureAlpha = msg.opacity * (1 + r * 0.3)

          // Soft glow layer
          ctx!.fillStyle = `rgba(0, 255, 65, ${secureAlpha * 0.3})`
          ctx!.fillText(msg.text, msg.x + 1, msg.y + 1)
          // Main text
          ctx!.fillStyle = `rgba(0, 255, 65, ${secureAlpha})`
          ctx!.fillText(msg.text, msg.x, msg.y)

          // Underline for bright secure messages
          if (secureAlpha > 0.15) {
            const textWidth = ctx!.measureText(msg.text).width
            ctx!.strokeStyle = `rgba(0, 255, 65, ${secureAlpha * 0.3})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(msg.x, msg.y + 3)
            ctx!.lineTo(msg.x + textWidth, msg.y + 3)
            ctx!.stroke()
          }
        }
      }

      // Occasional screen flash — hostile zone only
      if (r < 0.4 && Math.random() < 0.002) {
        ctx!.fillStyle = "rgba(255, 0, 0, 0.02)"
        ctx!.fillRect(0, 0, w, h)
      }

      animId = requestAnimationFrame(animate)
    }

    // Clear canvas initially
    ctx.fillStyle = "#050508"
    ctx.fillRect(0, 0, w, h)

    // Seed initial messages
    for (let i = 0; i < 15; i++) {
      spawnMessage()
      const msg = messages[messages.length - 1]
      const age = rand(50, 300)
      msg.life = age
      msg.x += msg.vx * age
      msg.y += msg.vy * age
      msg.opacity = msg.maxOpacity
    }

    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animId)
    }
  }, [scrollRatioRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  )
}
