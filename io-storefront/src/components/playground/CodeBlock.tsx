"use client";

import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useStorefrontTheme } from "@/hooks/useStorefrontTheme";
import type { Framework, FrameworkCode } from "@/models/framework";

const LS_KEY = "io-playground-framework";

function readStoredFramework(): Framework {
  if (typeof window === "undefined") return "html";
  const stored = localStorage.getItem(LS_KEY);
  const valid: Framework[] = ["html", "react", "angular", "vue"];
  return valid.includes(stored as Framework) ? (stored as Framework) : "html";
}

const SYNTAX_LANGUAGE: Record<Framework, string> = {
  html: "xml",
  react: "typescript",
  angular: "typescript",
  vue: "xml",
};

const FRAMEWORKS: { id: Framework; label: string }[] = [
  { id: "html", label: "HTML" },
  { id: "react", label: "React" },
  { id: "angular", label: "Angular" },
  { id: "vue", label: "Vue" },
];

type CodeBlockProps = {
  frameworkCode: FrameworkCode;
  /** Whether the code is visible; controlled by Playground. */
  visible: boolean;
  /** Called when the show/hide button is clicked. */
  onToggle: () => void;
};

// ── Icon components ──────────────────────────────────────────────────────────

function CopyIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * CodeBlock — framework tab bar + syntax-highlighted code panel.
 * The code's collapsed/expanded state is owned by the parent (Playground).
 */
export function CodeBlock({
  frameworkCode,
  visible,
  onToggle,
}: CodeBlockProps) {
  const [framework, setFramework] = useState<Framework>("html");
  const [copied, setCopied] = useState(false);

  // Sync from localStorage after mount — avoids SSR/client hydration mismatch.
  useEffect(() => {
    const stored = readStoredFramework();
    if (stored !== "html") setFramework(stored);
  }, []);

  const selectFramework = (f: Framework) => {
    setFramework(f);
    localStorage.setItem(LS_KEY, f);
  };
  const { resolvedTheme } = useStorefrontTheme();
  const activeCode = frameworkCode[framework];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const syntaxStyle = resolvedTheme === "dark" ? atomOneDark : atomOneLight;

  return (
    <div>
      {/* Tab bar — always visible */}
      <div className="flex items-center border-t border-[var(--io-border)] bg-[var(--io-bg-raised)]">
        {/* Framework tabs */}
        <div className="flex items-end flex-1">
          {FRAMEWORKS.map(({ id, label }) => {
            const isActive = framework === id;
            return (
              <button
                key={id}
                onClick={() => selectFramework(id)}
                className={[
                  "px-4 py-2.5 min-h-[var(--io-touch-target-min-size)] text-xs border-b-2 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--io-border-focus)] cursor-pointer",
                  isActive
                    ? "border-[var(--io-accent)] text-[var(--io-accent)] bg-[var(--io-bg-base)] font-semibold"
                    : "font-medium border-transparent text-[var(--io-text-secondary)] hover:text-[var(--io-text-primary)]",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Actions — separated by a vertical rule */}
        <div className="flex items-center gap-1 px-2 border-l border-[var(--io-border)]">
          <button
            onClick={handleCopy}
            className={[
              "flex items-center gap-1.5 px-3 py-2 min-h-[var(--io-touch-target-min-size)] text-xs font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--io-border-focus)] cursor-pointer",
              copied
                ? "text-[var(--io-color-success)] hover:text-[var(--io-color-success)]"
                : "text-[var(--io-text-secondary)] hover:text-[var(--io-text-primary)] hover:bg-[var(--io-bg-hover)]",
            ].join(" ")}
            aria-label="Copy code"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
          <button
            onClick={onToggle}
            className="flex items-center gap-1.5 px-3 py-2 min-h-[var(--io-touch-target-min-size)] text-xs font-medium rounded text-[var(--io-text-secondary)] hover:text-[var(--io-text-primary)] hover:bg-[var(--io-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--io-border-focus)] cursor-pointer"
            aria-expanded={visible}
          >
            {visible ? <ChevronUpIcon /> : <ChevronDownIcon />}
            <span>{visible ? "Hide" : "Show"}</span>
          </button>
        </div>
      </div>

      {/* Syntax-highlighted code — toggled by parent */}
      {visible && (
        <div data-no-auto-highlight="true">
          <SyntaxHighlighter
            language={SYNTAX_LANGUAGE[framework]}
            style={syntaxStyle}
            customStyle={{
              margin: 0,
              padding: "1rem 1.25rem",
              background: "var(--io-bg-base)",
              fontSize: "0.8125rem",
              lineHeight: "1.65",
              maxHeight: "420px",
              overflow: "auto",
              borderRadius: 0,
            }}
            showLineNumbers={false}
            wrapLongLines={false}
          >
            {activeCode}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
}
