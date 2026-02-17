"use client"

import { useEffect, useRef } from "react"

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
  /** 0 = top (hostile), 1 = bottom (secure). Drives atmosphere transition. */
  scrollRatio?: number
}

export default function HackerAnimation({ scrollRatio = 0 }: HackerAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollRef = useRef(scrollRatio)

  // Keep scroll ratio in sync without re-running the effect
  useEffect(() => {
    scrollRef.current = scrollRatio
  }, [scrollRatio])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const parent = canvas.parentElement
    if (!parent) return

    let w = (canvas.width = parent.offsetWidth)
    let h = (canvas.height = parent.offsetHeight)

    const handleResize = () => {
      w = canvas.width = parent.offsetWidth
      h = canvas.height = parent.offsetHeight
    }
    window.addEventListener("resize", handleResize)

    const messages: FloatingMessage[] = []
    let frameCount = 0

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a)
    }
    function pick<T>(arr: T[]): T {
      return arr[Math.floor(Math.random() * arr.length)]
    }

    function spawnMessage() {
      const r = scrollRef.current
      // At top (r=0): 80% threats. At bottom (r=1): 20% threats.
      const threatChance = 0.8 - r * 0.6
      const isThreat = Math.random() < threatChance
      const type = isThreat ? "threat" : "secure"
      const text = isThreat ? pick(THREAT_MESSAGES) : pick(SECURE_MESSAGES)

      // Speed slows down as page calms: 100% at top, 60% at bottom
      const speedMult = 1 - r * 0.4
      const edge = Math.floor(Math.random() * 4)
      let x: number, y: number, vx: number, vy: number
      const speed = rand(0.3, 1.2) * speedMult

      switch (edge) {
        case 0: // top
          x = rand(0, w)
          y = -20
          vx = rand(-1.2, 1.2) * speedMult
          vy = speed
          break
        case 1: // right
          x = w + 20
          y = rand(0, h)
          vx = -speed
          vy = rand(-1.2, 1.2) * speedMult
          break
        case 2: // bottom
          x = rand(0, w)
          y = h + 20
          vx = rand(-1.2, 1.2) * speedMult
          vy = -speed
          break
        default: // left
          x = -20
          y = rand(0, h)
          vx = speed
          vy = rand(-1.2, 1.2) * speedMult
          break
      }

      const maxLife = rand(400, 900)
      messages.push({
        text,
        x,
        y,
        vx,
        vy,
        opacity: 0,
        maxOpacity: rand(0.08, 0.35),
        fadeIn: true,
        life: 0,
        maxLife,
        type,
        fontSize: rand(10, 18),
        glitchTimer: 0,
        glitchActive: false,
      })
    }

    // Scan lines data
    const scanLineSpacing = 4

    function drawScanLines() {
      ctx!.fillStyle = "rgba(255, 255, 255, 0.008)"
      for (let y = 0; y < h; y += scanLineSpacing) {
        ctx!.fillRect(0, y, w, 1)
      }
    }

    // Hex grid background
    function drawHexGrid() {
      const r = scrollRef.current
      const spacing = 80
      // Grid shifts from faint green to brighter green as page calms
      const alpha = 0.015 + r * 0.015
      ctx!.strokeStyle = `rgba(0, 255, 65, ${alpha})`
      ctx!.lineWidth = 0.5
      for (let x = 0; x < w + spacing; x += spacing) {
        for (let y = 0; y < h + spacing; y += spacing * 0.866) {
          const offset = (Math.floor(y / (spacing * 0.866)) % 2) * (spacing / 2)
          ctx!.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6
            const px = x + offset + Math.cos(angle) * (spacing / 2.5)
            const py = y + Math.sin(angle) * (spacing / 2.5)
            if (i === 0) ctx!.moveTo(px, py)
            else ctx!.lineTo(px, py)
          }
          ctx!.closePath()
          ctx!.stroke()
        }
      }
    }

    // Vertical data streams (matrix-like)
    const streams: { x: number; chars: string[]; y: number; speed: number; baseSpeed: number; opacity: number; baseOpacity: number }[] = []
    function initStreams() {
      const count = Math.floor(w / 30)
      for (let i = 0; i < count; i++) {
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
    }
    initStreams()

    function drawStreams() {
      const r = scrollRef.current
      ctx!.font = "12px monospace"
      for (const stream of streams) {
        // Streams slow down and dim as page calms
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
          // Randomly mutate chars — less mutation when calm
          if (Math.random() < 0.01 * (1 - r * 0.7)) {
            stream.chars[i] = String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
          }
        }
      }
    }

    function animate() {
      const r = scrollRef.current

      // Background tint transitions from pure black to very dark green
      const bgR = Math.round(5 - r * 2)
      const bgG = Math.round(5 + r * 8)
      const bgB = Math.round(8 - r * 3)
      ctx!.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`
      ctx!.fillRect(0, 0, w, h)

      frameCount++

      // Background layers
      if (frameCount % 3 === 0) drawHexGrid()
      drawStreams()
      drawScanLines()

      // Spawn rate decreases as page calms: every 25 frames at top, every 50 at bottom
      const spawnInterval = Math.round(25 + r * 25)
      if (frameCount % spawnInterval === 0 && messages.length < 50) {
        spawnMessage()
      }
      if (frameCount % (spawnInterval + 15) === 0 && messages.length < 50) {
        spawnMessage()
      }

      // Update & draw messages
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

        // Glitch effect for threat messages — less frequent when calm
        if (msg.type === "threat") {
          msg.glitchTimer++
          const glitchThreshold = 100 + r * 400 // glitches become rare
          if (msg.glitchTimer > rand(glitchThreshold, glitchThreshold + 200)) {
            msg.glitchActive = true
            msg.glitchTimer = 0
          }
          if (msg.glitchActive) {
            if (msg.glitchTimer > 5) msg.glitchActive = false
          }
        }

        // Remove dead messages
        if (msg.life > msg.maxLife || msg.x < -200 || msg.x > w + 200 || msg.y < -50 || msg.y > h + 50) {
          messages.splice(i, 1)
          continue
        }

        // Draw
        ctx!.save()
        ctx!.font = `bold ${msg.fontSize}px monospace`

        if (msg.type === "threat") {
          // Red glow — dimmer when calm
          const threatAlpha = msg.opacity * (1 - r * 0.5)
          ctx!.shadowColor = `rgba(255, 0, 0, ${0.5 * (1 - r * 0.6)})`
          ctx!.shadowBlur = 8 * (1 - r * 0.5)
          ctx!.fillStyle = `rgba(255, 20, 20, ${threatAlpha})`

          if (msg.glitchActive) {
            ctx!.fillStyle = `rgba(255, 0, 0, ${threatAlpha * 0.5})`
            ctx!.fillText(msg.text, msg.x + rand(-3, 3), msg.y + rand(-2, 2))
            ctx!.fillStyle = `rgba(255, 100, 100, ${threatAlpha * 0.7})`
            ctx!.fillText(msg.text, msg.x + rand(-2, 2), msg.y + rand(-1, 1))
          }
          ctx!.fillText(msg.text, msg.x, msg.y)
        } else {
          // Green glow — brighter when calm
          const secureAlpha = msg.opacity * (1 + r * 0.3)
          ctx!.shadowColor = `rgba(0, 255, 65, ${0.5 * (1 + r * 0.3)})`
          ctx!.shadowBlur = 10 + r * 5
          ctx!.fillStyle = `rgba(0, 255, 65, ${secureAlpha})`
          ctx!.fillText(msg.text, msg.x, msg.y)

          // Extra glow line underneath for secure messages
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
        ctx!.restore()
      }

      // Occasional screen flash — only in hostile zone
      if (r < 0.4 && Math.random() < 0.002) {
        ctx!.fillStyle = "rgba(255, 0, 0, 0.02)"
        ctx!.fillRect(0, 0, w, h)
      }

      requestAnimationFrame(animate)
    }

    // Clear canvas initially
    ctx.fillStyle = "#050508"
    ctx.fillRect(0, 0, w, h)

    // Seed initial messages
    for (let i = 0; i < 15; i++) {
      spawnMessage()
      // Age them so they're already visible
      const msg = messages[messages.length - 1]
      const age = rand(50, 300)
      msg.life = age
      msg.x += msg.vx * age
      msg.y += msg.vy * age
      msg.opacity = msg.maxOpacity
    }

    const animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

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
