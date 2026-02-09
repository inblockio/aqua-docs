"use client"

import { useEffect, useRef } from "react"

interface AquaAnimationProps {
  reverse?: boolean
  laneCount?: number
  invertSpeed?: boolean
}

interface AquaNode {
  x: number
  y: number
  type: "genesis" | "revision" | "signature" | "witness"
  lineY: number
}

interface AquaEdge {
  from: AquaNode
  to: AquaNode
}

interface AquaBranch {
  tip: AquaNode
  lineY: number
}

interface AquaChain {
  nodes: AquaNode[]
  edges: AquaEdge[]
  lane: Lane
  branches: AquaBranch[]
}

interface CrossLink {
  from: AquaNode
  to: AquaNode
  birth: number
}

interface Lane {
  y: number
  occupants: AquaChain[]
  drift: number
}

export default function AquaAnimation({
  reverse = false,
  laneCount = 5,
  invertSpeed = false,
}: AquaAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const parent = canvas.parentElement
    if (!parent) return

    canvas.width = parent.offsetWidth
    canvas.height = parent.offsetHeight

    const handleResize = () => {
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      initLanes()
    }
    window.addEventListener("resize", handleResize)

    const COLORS: Record<string, [number, number, number]> = {
      genesis: [220, 40, 40],
      revision: [239, 84, 1],
      signature: [40, 180, 80],
      witness: [50, 130, 220],
    }

    const DRIFT_MIN = 0.5
    const DRIFT_MAX = 1.0
    const SPAWN_INTERVAL = 50
    const MAX_CHAINS = 20
    const MAX_NODES = 10
    const NODE_R = 4
    let LANE_HEIGHT = 0
    const BRANCH_TYPES: Array<"revision" | "signature" | "witness"> = ["revision", "signature", "witness"]
    const MAX_PER_LANE = 3
    const MIN_LANE_GAP = 250
    const MAX_LINKS_PER_PAIR = 4
    const FLASH_DURATION = 30

    let chains: AquaChain[] = []
    let crossLinks: CrossLink[] = []
    let frameCount = 0
    let lanes: Lane[] = []
    let animId: number

    function posAlpha(x: number): number {
      const cx = canvas!.width / 2
      const half = canvas!.width / 2
      const dist = Math.abs(x - cx)
      let fade = dist / (half * 0.75) - 0.5
      if (fade < 0) fade = 0
      if (fade > 1) fade = 1
      return fade * 0.75
    }

    function rand(a: number, b: number) {
      return a + Math.random() * (b - a)
    }
    function randInt(a: number, b: number) {
      return Math.floor(rand(a, b + 1))
    }
    function pick<T>(arr: T[]): T {
      return arr[randInt(0, arr.length - 1)]
    }

    function initLanes() {
      LANE_HEIGHT = canvas!.height / laneCount
      lanes = []
      for (let i = 0; i < laneCount; i++) {
        const t = laneCount > 1 ? i / (laneCount - 1) : 0
        const speed = invertSpeed
          ? DRIFT_MIN + (1 - t) * (DRIFT_MAX - DRIFT_MIN)
          : DRIFT_MIN + t * (DRIFT_MAX - DRIFT_MIN)
        lanes.push({ y: LANE_HEIGHT * (i + 0.5), occupants: [], drift: speed })
      }
    }

    function chainEdgeX(c: AquaChain): number {
      let ex = reverse ? Infinity : -Infinity
      for (let i = 0; i < c.nodes.length; i++) {
        if (reverse) {
          if (c.nodes[i].x < ex) ex = c.nodes[i].x
        } else {
          if (c.nodes[i].x > ex) ex = c.nodes[i].x
        }
      }
      return ex
    }

    function getFreeLane(): Lane | null {
      const free: Lane[] = []
      for (let i = 0; i < lanes.length; i++) {
        const lane = lanes[i]
        if (lane.occupants.length === 0) {
          free.push(lane)
        } else if (lane.occupants.length < MAX_PER_LANE) {
          let hasRoom = true
          for (let j = 0; j < lane.occupants.length; j++) {
            const edge = chainEdgeX(lane.occupants[j])
            if (reverse) {
              if (edge < -40 + MIN_LANE_GAP) {
                hasRoom = false
                break
              }
            } else {
              if (edge > canvas!.width + 40 - MIN_LANE_GAP) {
                hasRoom = false
                break
              }
            }
          }
          if (hasRoom) free.push(lane)
        }
      }
      if (free.length === 0) return null
      return pick(free)
    }

    function spawnChain() {
      const lane = getFreeLane()
      if (!lane) return

      const startX = reverse ? -40 : canvas!.width + 40
      const yOffset = lane.occupants.length % 2 === 0 ? -LANE_HEIGHT * 0.12 : LANE_HEIGHT * 0.12
      const centerY = lane.y + yOffset
      const yBand = LANE_HEIGHT * 0.45
      const forkStep = yBand / 3
      const nodeStep = rand(24, 36)
      const chain: AquaChain = { nodes: [], edges: [], lane: lane, branches: [] }

      const genesis: AquaNode = { x: startX, y: centerY, type: "genesis", lineY: centerY }
      chain.nodes.push(genesis)

      const mainBranch: AquaBranch = { tip: genesis, lineY: centerY }
      chain.branches.push(mainBranch)

      const steps = randInt(2, 4)
      const stepDir = reverse ? -1 : 1
      for (let i = 0; i < steps; i++) {
        if (chain.nodes.length >= MAX_NODES) break
        const branchCount = chain.branches.length
        for (let b = 0; b < branchCount; b++) {
          if (chain.nodes.length >= MAX_NODES) break
          const br = chain.branches[b]
          const type = pick(BRANCH_TYPES)
          const child: AquaNode = {
            x: br.tip.x + stepDir * nodeStep,
            y: br.lineY,
            type: type,
            lineY: br.lineY,
          }
          chain.nodes.push(child)
          chain.edges.push({ from: br.tip, to: child })
          br.tip = child
        }

        if (chain.nodes.length < MAX_NODES && Math.random() < 0.3 && chain.branches.length < 4) {
          const srcBranch = pick(chain.branches)
          const dir = Math.random() < 0.5 ? -1 : 1
          let newLineY = srcBranch.lineY + dir * forkStep
          if (newLineY < centerY - yBand) newLineY = centerY - yBand
          if (newLineY > centerY + yBand) newLineY = centerY + yBand
          let taken = false
          for (let b2 = 0; b2 < chain.branches.length; b2++) {
            if (Math.abs(chain.branches[b2].lineY - newLineY) < forkStep * 0.5) {
              taken = true
              break
            }
          }
          if (!taken) {
            const forkType = pick(BRANCH_TYPES)
            const forkNode: AquaNode = {
              x: srcBranch.tip.x + stepDir * nodeStep,
              y: newLineY,
              type: forkType,
              lineY: newLineY,
            }
            chain.nodes.push(forkNode)
            chain.edges.push({ from: srcBranch.tip, to: forkNode })
            chain.branches.push({ tip: forkNode, lineY: newLineY })
          }
        }
      }

      lane.occupants.push(chain)
      chains.push(chain)
      addCrossLinks(chain)
    }

    function pickTargetNode(sourceNode: AquaNode, otherChain: AquaChain): AquaNode {
      const weights: number[] = []
      let totalWeight = 0
      for (let i = 0; i < otherChain.nodes.length; i++) {
        const n = otherChain.nodes[i]
        const yDist = Math.abs(n.y - sourceNode.y)
        const proximity = 1 / (1 + yDist / 40)
        const w = proximity * (n.type === "genesis" ? 5 : 1)
        weights.push(w)
        totalWeight += w
      }
      const r = Math.random() * totalWeight
      let acc = 0
      for (let i = 0; i < weights.length; i++) {
        acc += weights[i]
        if (r <= acc) return otherChain.nodes[i]
      }
      return otherChain.nodes[otherChain.nodes.length - 1]
    }

    function chainAvgX(c: AquaChain): number {
      if (c.nodes.length === 0) return 0
      let sum = 0
      for (let i = 0; i < c.nodes.length; i++) sum += c.nodes[i].x
      return sum / c.nodes.length
    }

    function countLinksBetween(a: AquaChain, b: AquaChain): number {
      let count = 0
      for (let i = 0; i < crossLinks.length; i++) {
        const l = crossLinks[i]
        const fromInA = a.nodes.indexOf(l.from) !== -1
        const toInB = b.nodes.indexOf(l.to) !== -1
        const fromInB = b.nodes.indexOf(l.from) !== -1
        const toInA = a.nodes.indexOf(l.to) !== -1
        if ((fromInA && toInB) || (fromInB && toInA)) count++
      }
      return count
    }

    function addCrossLinks(chain: AquaChain) {
      const chainX = chainAvgX(chain)
      const others: { chain: AquaChain; dist: number }[] = []
      for (let i = 0; i < chains.length - 1; i++) {
        const dist = Math.abs(chains[i].lane.y - chain.lane.y)
        others.push({ chain: chains[i], dist: dist })
      }
      others.sort((a, b) => a.dist - b.dist)

      for (let i = 0; i < others.length; i++) {
        const other = others[i].chain
        if (other.nodes.length === 0) continue
        if (countLinksBetween(chain, other) >= MAX_LINKS_PER_PAIR) continue
        let chance = 1.0 / (1 + i * 0.3)
        const otherX = chainAvgX(other)
        if (reverse) {
          if (otherX < chainX) chance *= 3
          else chance *= 0.15
        } else {
          if (otherX > chainX) chance *= 3
          else chance *= 0.15
        }
        if (Math.random() < chance) {
          const fromNode = pick(chain.nodes)
          const toNode = pickTargetNode(fromNode, other)
          crossLinks.push({ from: fromNode, to: toNode, birth: frameCount })
        }
      }
    }

    function growChain(chain: AquaChain) {
      if (chain.nodes.length >= MAX_NODES || !chain.branches || chain.branches.length === 0) return
      const br = pick(chain.branches)
      const remaining = MAX_NODES - chain.nodes.length
      const witnessChance = remaining <= 1 ? 1.0 : remaining <= 3 ? 0.6 : 0.15
      const type = Math.random() < witnessChance ? "witness" : pick(BRANCH_TYPES)
      const stepDir = reverse ? -1 : 1
      const child: AquaNode = {
        x: br.tip.x + stepDir * rand(24, 36),
        y: br.lineY,
        type: type,
        lineY: br.lineY,
      }
      chain.nodes.push(child)
      chain.edges.push({ from: br.tip, to: child })
      br.tip = child

      if (Math.random() < 0.85 && chains.length > 1) {
        const myX = chainAvgX(chain)
        let bestChain: AquaChain | null = null
        let bestScore = -Infinity
        for (let k = 0; k < chains.length; k++) {
          if (chains[k] === chain) continue
          if (chains[k].nodes.length === 0) continue
          if (countLinksBetween(chain, chains[k]) >= MAX_LINKS_PER_PAIR) continue
          const d = Math.abs(chains[k].lane.y - chain.lane.y)
          const proximity = 1 / (1 + d / 40)
          const otherAvgX = chainAvgX(chains[k])
          let dirBonus: number
          if (reverse) {
            dirBonus = otherAvgX < myX ? 3 : 0.15
          } else {
            dirBonus = otherAvgX > myX ? 3 : 0.15
          }
          const score = proximity * dirBonus
          if (score > bestScore) {
            bestScore = score
            bestChain = chains[k]
          }
        }
        if (bestChain) {
          crossLinks.push({ from: child, to: pickTargetNode(child, bestChain), birth: frameCount })
        }
      }
    }

    function drawNode(n: AquaNode) {
      const a = posAlpha(n.x)
      if (a < 0.01) return
      const c = COLORS[n.type]
      ctx!.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`
      ctx!.beginPath()
      ctx!.arc(n.x, n.y, NODE_R, 0, Math.PI * 2)
      ctx!.fill()
      if (n.type === "genesis" && a > 0.15) {
        ctx!.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a * 0.15})`
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, NODE_R * 3, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function drawEdge(from: AquaNode, to: AquaNode) {
      const a = Math.min(posAlpha(from.x), posAlpha(to.x))
      if (a < 0.01) return
      ctx!.strokeStyle = `rgba(20,60,80,${a * 0.85})`
      ctx!.lineWidth = 1.6
      ctx!.beginPath()
      ctx!.moveTo(from.x, from.y)
      ctx!.lineTo(to.x, to.y)
      ctx!.stroke()
    }

    function drawCrossLink(link: CrossLink) {
      const a = Math.min(posAlpha(link.from.x), posAlpha(link.to.x))
      if (a < 0.01) return
      const age = frameCount - (link.birth || 0)
      const flash = age < FLASH_DURATION ? 1 - age / FLASH_DURATION : 0
      if (flash > 0) {
        const glowAlpha = a * flash * 0.8
        ctx!.strokeStyle = `rgba(0,0,0,${glowAlpha})`
        ctx!.lineWidth = 3
        ctx!.setLineDash([])
        ctx!.beginPath()
        ctx!.moveTo(link.from.x, link.from.y)
        ctx!.lineTo(link.to.x, link.to.y)
        ctx!.stroke()
      }
      const baseAlpha = a * (0.6 + flash * 0.4)
      ctx!.strokeStyle = `rgba(40,50,100,${baseAlpha})`
      ctx!.lineWidth = 1.0 + flash * 1.3
      ctx!.setLineDash([4, 5])
      ctx!.beginPath()
      ctx!.moveTo(link.from.x, link.from.y)
      ctx!.lineTo(link.to.x, link.to.y)
      ctx!.stroke()
      ctx!.setLineDash([])
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      frameCount++

      if (frameCount % SPAWN_INTERVAL === 0 && chains.length < MAX_CHAINS) {
        spawnChain()
      }

      if (frameCount % 70 === 35 && chains.length > 0) {
        growChain(pick(chains))
      }

      for (let i = 0; i < chains.length; i++) {
        const speed = chains[i].lane.drift
        for (let j = 0; j < chains[i].nodes.length; j++) {
          if (reverse) {
            chains[i].nodes[j].x += speed
          } else {
            chains[i].nodes[j].x -= speed
          }
        }
      }

      chains = chains.filter((chain) => {
        let shouldRemove: boolean
        if (reverse) {
          let minX = Infinity
          for (let j = 0; j < chain.nodes.length; j++) {
            if (chain.nodes[j].x < minX) minX = chain.nodes[j].x
          }
          shouldRemove = minX > canvas!.width + 80
        } else {
          let maxX = -Infinity
          for (let j = 0; j < chain.nodes.length; j++) {
            if (chain.nodes[j].x > maxX) maxX = chain.nodes[j].x
          }
          shouldRemove = maxX < -80
        }
        if (shouldRemove) {
          const idx = chain.lane.occupants.indexOf(chain)
          if (idx !== -1) chain.lane.occupants.splice(idx, 1)
          return false
        }
        return true
      })

      crossLinks = crossLinks.filter((link) => {
        if (reverse) {
          return link.from.x < canvas!.width + 80 && link.to.x < canvas!.width + 80
        }
        return link.from.x > -80 && link.to.x > -80
      })

      for (let i = 0; i < crossLinks.length; i++) {
        drawCrossLink(crossLinks[i])
      }

      for (let i = 0; i < chains.length; i++) {
        const chain = chains[i]
        for (let j = 0; j < chain.edges.length; j++) {
          drawEdge(chain.edges[j].from, chain.edges[j].to)
        }
        for (let j = 0; j < chain.nodes.length; j++) {
          drawNode(chain.nodes[j])
        }
      }

      animId = requestAnimationFrame(animate)
    }

    initLanes()
    const seedCount = Math.min(12, lanes.length)
    for (let i = 0; i < seedCount; i++) {
      spawnChain()
      const chain = chains[chains.length - 1]
      if (chain) {
        const shiftX = (seedCount - i) * (canvas.width / (seedCount + 1))
        for (let j = 0; j < chain.nodes.length; j++) {
          if (reverse) {
            chain.nodes[j].x += shiftX
          } else {
            chain.nodes[j].x -= shiftX
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animId)
    }
  }, [reverse, laneCount, invertSpeed])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  )
}
