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
requireFile("docs/agency-agents/ADAPTATION_LAYER.md");
requireFile("docs/agency-agents/README.md");
requireFile("docs/agency-agents/curated-io-design-system.json");
requireFile("scripts/install-curated-agency-claude.cjs");
requireFile("scripts/sync-stencil-assets.cjs");
requireFile("io-storefront/package.json");

// Deprecated paths must be removed
requirePathAbsent(".agent");
requirePathAbsent(".claude");
requirePathAbsent(".codex");
requirePathAbsent(".gemini");
requirePathAbsent(".github");
requirePathAbsent("CLAUDE.md");
requirePathAbsent("design-system");

// Workspace topology + scripts
requireText("package.json", [
  "\"io-storefront\"",
  "\"governance:check\"",
  "\"agents:install:claude\"",
]);
requireTextAbsent("package.json", [
  "\"io-components/storefront\"",
  "\"design-system\"",
  ".claude/skills",
  "ui-ux-pro-max",
]);

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

// Governance docs presence
requireText("docs/agency-agents/README.md", [
  "Curated source of truth",
  "npm run agents:install:claude",
  "CI is intentionally disabled",
]);

requireText("docs/agency-agents/ADAPTATION_LAYER.md", [
  "Non-Negotiable Guardrails",
  "token-first styling",
  "io-storefront",
  "npm run governance:check",
]);

validateCuratedJson("docs/agency-agents/curated-io-design-system.json");

if (errors.length > 0) {
  console.error("[Governance Gate] Validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("[Governance Gate] Validation passed.");
