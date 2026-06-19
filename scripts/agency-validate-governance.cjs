#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = process.cwd();
const errors = [];
const EXPECTED_AGENT_COUNT = 9;

function resolve(relativePath) {
  return path.join(repoRoot, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(resolve(relativePath));
}

function read(relativePath) {
  return fs.readFileSync(resolve(relativePath), "utf8");
}

function requireFile(relativePath) {
  if (!exists(relativePath)) {
    errors.push(`Missing required file: ${relativePath}`);
  }
}

function requirePathAbsent(relativePath) {
  if (exists(relativePath)) {
    errors.push(`Deprecated path must be removed: ${relativePath}`);
  }
}

function requireText(relativePath, textChecks) {
  if (!exists(relativePath)) {
    errors.push(`Missing required file: ${relativePath}`);
    return;
  }

  const content = read(relativePath);
  for (const check of textChecks) {
    if (!content.includes(check)) {
      errors.push(`${relativePath} is missing required text: "${check}"`);
    }
  }
}

function requireTextAbsent(relativePath, textChecks) {
  if (!exists(relativePath)) {
    errors.push(`Missing required file: ${relativePath}`);
    return;
  }

  const content = read(relativePath);
  for (const check of textChecks) {
    if (content.includes(check)) {
      errors.push(`${relativePath} still contains deprecated text: "${check}"`);
    }
  }
}

function validatePackageScripts(relativePath) {
  if (!exists(relativePath)) {
    errors.push(`Missing required file: ${relativePath}`);
    return;
  }

  try {
    const parsed = JSON.parse(read(relativePath));
    const scripts = parsed && typeof parsed === "object" ? parsed.scripts : undefined;

    if (!scripts || typeof scripts !== "object") {
      errors.push(`${relativePath} must define a scripts object.`);
      return;
    }

    if (scripts["token-runtime:check"] !== "node scripts/check-token-runtime-reconciliation.cjs") {
      errors.push(
        `${relativePath} scripts.token-runtime:check must equal "node scripts/check-token-runtime-reconciliation.cjs".`,
      );
    }

    const governance = scripts["governance:check"];
    if (typeof governance !== "string") {
      errors.push(`${relativePath} must define scripts.governance:check as a string.`);
      return;
    }

    if (!governance.includes("node scripts/check-token-runtime-reconciliation.cjs")) {
      errors.push(
        `${relativePath} scripts.governance:check must invoke node scripts/check-token-runtime-reconciliation.cjs directly.`,
      );
    }

    if (!governance.includes("node scripts/check-token-doc-coverage.cjs")) {
      errors.push(
        `${relativePath} scripts.governance:check must invoke node scripts/check-token-doc-coverage.cjs directly.`,
      );
    }

    if (!governance.includes("node scripts/check-style-literals.cjs")) {
      errors.push(
        `${relativePath} scripts.governance:check must invoke node scripts/check-style-literals.cjs directly.`,
      );
    }

    if (!governance.includes("node scripts/check-storefront-status-governance.cjs")) {
      errors.push(
        `${relativePath} scripts.governance:check must invoke node scripts/check-storefront-status-governance.cjs directly.`,
      );
    }
    if (!governance.includes("node scripts/check-token-cssvar-naming.cjs")) {
      errors.push(
        `${relativePath} scripts.governance:check must invoke node scripts/check-token-cssvar-naming.cjs directly.`,
      );
    }
  } catch (error) {
    errors.push(`${relativePath} is not valid JSON: ${error.message}`);
  }
}

function validateCuratedJson(relativePath) {
  if (!exists(relativePath)) {
    errors.push(`Missing required file: ${relativePath}`);
    return;
  }

  try {
    const parsed = JSON.parse(read(relativePath));
    if (parsed.project !== "io-design-system") {
      errors.push(`${relativePath} must set "project" to "io-design-system".`);
    }
    if (!Array.isArray(parsed.agents) || parsed.agents.length !== EXPECTED_AGENT_COUNT) {
      errors.push(
        `${relativePath} must include exactly ${EXPECTED_AGENT_COUNT} curated agents.`,
      );
    }

    const sources = Array.isArray(parsed.agents)
      ? parsed.agents.map((agent) => agent.source).filter(Boolean)
      : [];

    if (sources.length !== EXPECTED_AGENT_COUNT) {
      errors.push(
        `${relativePath} must define source paths for all ${EXPECTED_AGENT_COUNT} agents.`,
      );
    }

    if (new Set(sources).size !== sources.length) {
      errors.push(`${relativePath} contains duplicate agent source paths.`);
    }
  } catch (error) {
    errors.push(`${relativePath} is not valid JSON: ${error.message}`);
  }
}


// Required governance files
requireFile("scripts/check-token-runtime-reconciliation.cjs");
requireFile("scripts/check-token-doc-coverage.cjs");
requireFile("scripts/check-style-literals.cjs");
requireFile("scripts/check-storefront-status-governance.cjs");
requireFile("scripts/sync-stencil-assets.cjs");
requireFile("io-storefront/package.json");
requireFile("docs/token-runtime-reconciliation.json");
requireFile("docs/token-cssvar-implemented-map.json");
requireFile("docs/token-deprecated-unused.json");
requireFile("docs/style-literal-allowlist.json");
requireFile("docs/storefront-status-governance.md");
requireFile("docs/component-stability-recommendations.md");

// Claude Code agent manifest — curated agents installed via npm run agents:install:claude
validateCuratedJson("docs/agency-agents/curated-io-design-system.json");

// Deprecated paths must be removed
// Note: .claude/ is excluded — it is the Claude Code CLI tooling directory (images, worktrees, settings).
requirePathAbsent(".agent");
requirePathAbsent(".codex");
requirePathAbsent(".gemini");
requirePathAbsent("design-system");

// Workspace topology + scripts
requireText("package.json", [
  "\"io-storefront\"",
  "\"governance:check\"",
  "\"token-runtime:check\"",
  "\"token-doc-coverage:check\"",
  "\"style-literals:check\"",
  "\"status-governance:check\"",
]);
requireTextAbsent("package.json", [
  "\"io-components/storefront\"",
  "\"design-system\"",
  ".claude/skills",
  "ui-ux-pro-max",
]);

validatePackageScripts("package.json");

requireText("pnpm-workspace.yaml", ["- 'io-storefront'"]);
requireTextAbsent("pnpm-workspace.yaml", ["io-components/storefront"]);

// Core package dependency + dev flow
requireText("io-components/package.json", [
  "\"@stencil/core\": \"~4.43.3\"",
  "../io-storefront run dev",
]);
requireTextAbsent("io-components/package.json", [
  "\"design-system\"",
  ".claude/skills",
  "ui-ux-pro-max",
]);

// Sync script target integrity
requireText("scripts/sync-stencil-assets.cjs", [
  "'io-storefront'",
  "'public'",
  "'stencil'",
]);

// Governance docs presence — Claude Code is primary AI; CLAUDE.md is the authoritative instructions file
requireText("CLAUDE.md", [
  "npm run governance:check",
  "npm run build:quality-gates",
]);

if (errors.length > 0) {
  console.error("[Governance Gate] Validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("[Governance Gate] Validation passed.");
