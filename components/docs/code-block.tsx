"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlightCode = (code: string, lang: string) => {
    const lines = code.split("\n")

    return lines.map((line, i) => {
      const tokens: Array<{ type: string; value: string }> = []
      let currentPos = 0

      // Regex patterns for different token types
      const patterns = [
        { type: "comment", regex: /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/ },
        { type: "string", regex: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/ },
        {
          type: "keyword",
          regex:
            /\b(const|let|var|function|return|if|else|for|while|do|break|continue|switch|case|default|import|export|from|as|class|extends|implements|interface|type|enum|namespace|async|await|try|catch|finally|throw|new|this|super|static|public|private|protected|readonly|abstract|void|null|undefined|true|false|typeof|instanceof|delete|in|of)\b/,
        },
        { type: "operator", regex: /([+\-*/%=<>!&|^~?:]+)/ },
        { type: "number", regex: /\b(0x[a-fA-F0-9]+|0b[01]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/ },
        { type: "function", regex: /\b([a-zA-Z_$][\w$]*)\s*(?=\()/ },
        { type: "property", regex: /\.([a-zA-Z_$][\w$]*)/ },
        { type: "punctuation", regex: /([{}[\]();,])/ },
      ]

      while (currentPos < line.length) {
        let matched = false

        for (const { type, regex } of patterns) {
          const match = line.slice(currentPos).match(regex)
          if (match && match.index === 0) {
            tokens.push({ type, value: match[0] })
            currentPos += match[0].length
            matched = true
            break
          }
        }

        if (!matched) {
          // Regular text or whitespace
          const nextSpecialChar = line.slice(currentPos).search(/["'`/\w.+\-*/%=<>!&|^~?:;,()[\]{}#]/)
          if (nextSpecialChar === -1) {
            tokens.push({ type: "text", value: line.slice(currentPos) })
            break
          } else if (nextSpecialChar > 0) {
            tokens.push({ type: "text", value: line.slice(currentPos, currentPos + nextSpecialChar) })
            currentPos += nextSpecialChar
          } else {
            tokens.push({ type: "text", value: line[currentPos] })
            currentPos++
          }
        }
      }

      return (
        <div key={i} className="table-row">
          <span className="table-cell pr-4 text-right select-none text-muted-foreground/40 w-8 align-top">{i + 1}</span>
          <span className="table-cell align-top">
            {tokens.length === 0 ? (
              <span>&nbsp;</span>
            ) : (
              tokens.map((token, j) => (
                <span key={j} className={`token-${token.type}`}>
                  {token.value}
                </span>
              ))
            )}
          </span>
        </div>
      )
    })
  }

  return (
    <div className="relative group my-2">
      {/* Header - always visible */}
      <div className="bg-muted/50 dark:bg-muted/30 px-4 py-2 rounded-t-xl border border-b-0 border-border/50 flex items-center justify-between">
        {/* Left section: Safari-style dots + filename */}
        <div className="flex items-center gap-3">
          {/* Safari-style window controls */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 dark:bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 dark:bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 dark:bg-green-500/60" />
          </div>
          {/* Filename or "Code" */}
          <span className="text-xs font-mono text-foreground">{filename || "Code"}</span>
        </div>
        
        {/* Right section: Language + Copy button */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground/60 font-mono uppercase tracking-wide">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-muted/50 transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
          </button>
        </div>
      </div>
      
      {/* Code content */}
      <div className="bg-gray-200/50 dark:bg-[#0d1117] rounded-b-xl overflow-x-auto border border-border/50">
        <pre className="p-2 text-[13px] font-mono leading-relaxed text-gray-800 dark:text-gray-200">
          <code className="table w-full">{highlightCode(code, language)}</code>
        </pre>
      </div>
    </div>
  )
}
