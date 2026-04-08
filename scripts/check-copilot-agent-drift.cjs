#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const repoRoot = process.cwd();
const curatedPath = path.join(
  repoRoot,
  "docs",
  "agency-agents",
  "curated-io-design-system-copilot.json",
);
const agentsDir = path.join(repoRoot, ".github", "agents");
const manifestPath = path.join(agentsDir, "io-ds-copilot-managed-manifest.json");

const errors = [];

function fail(code, message) {
  errors.push(`[copilot-drift] ${code} ${message}`);
}

function readJson(filePath, code) {
  if (!fs.existsSync(filePath)) {
    fail(code, `missing file: ${path.relative(repoRoot, filePath)}`);
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(code, `invalid JSON in ${path.relative(repoRoot, filePath)}: ${error.message}`);
    return null;
  }
}

function managedFileName(sourcePath) {
  return `io-ds-${path.basename(sourcePath)}`;
}

function sha256(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function main() {
  const curated = readJson(curatedPath, "E_CURATED_FILE");
  const manifest = readJson(manifestPath, "E_MANIFEST_FILE");

  if (!curated || !manifest) {
    return false;
  }

  if (curated.project !== "io-design-system") {
    fail(
      "E_CURATED_PROJECT",
      `expected project io-design-system, actual ${String(curated.project)}`,
    );
  }

  if (!Array.isArray(curated.agents) || curated.agents.length === 0) {
    fail("E_CURATED_AGENTS", "curated agents must be a non-empty array");
  }

  const curatedSources = Array.isArray(curated.agents)
    ? curated.agents.map((entry) => entry.source).filter(Boolean)
    : [];

  if (new Set(curatedSources).size !== curatedSources.length) {
    fail("E_CURATED_DUP", "duplicate source entries in curated list");
  }

  if (manifest.managedBy !== "scripts/sync-curated-agency-copilot.cjs") {
    fail(
      "E_MANAGED_BY",
      `expected managedBy scripts/sync-curated-agency-copilot.cjs, actual ${String(manifest.managedBy)}`,
    );
  }

  if (manifest.project !== "io-design-system") {
    fail(
      "E_MANIFEST_PROJECT",
      `expected project io-design-system, actual ${String(manifest.project)}`,
    );
  }

  if (manifest.adaptedWith !== "docs/agency-agents/ADAPTATION_LAYER.md") {
    fail(
      "E_MANIFEST_ADAPTED",
      `expected adaptedWith docs/agency-agents/ADAPTATION_LAYER.md, actual ${String(manifest.adaptedWith)}`,
    );
  }

  if (!Array.isArray(manifest.files)) {
    fail("E_MANIFEST_FILES", "manifest files must be an array");
    return false;
  }

  if (manifest.count !== curatedSources.length) {
    fail(
      "E_MANIFEST_COUNT",
      `expected count ${curatedSources.length}, actual ${String(manifest.count)}`,
    );
  }

  if (manifest.files.length !== curatedSources.length) {
    fail(
      "E_FILES_COUNT",
      `expected files length ${curatedSources.length}, actual ${manifest.files.length}`,
    );
  }

  for (let i = 0; i < curatedSources.length; i += 1) {
    const source = curatedSources[i];
    const file = manifest.files[i];

    if (!file) {
      fail("E_MAP_ORDER", `missing manifest entry at index ${i}`);
      continue;
    }

    if (file.source !== source) {
      fail(
        "E_MAP_ORDER",
        `index ${i} expected source ${source}, actual ${String(file.source)}`,
      );
    }

    const expectedDestination = managedFileName(source);
    if (file.destination !== expectedDestination) {
      fail(
        "E_DESTINATION",
        `index ${i} expected destination ${expectedDestination}, actual ${String(file.destination)}`,
      );
    }

    if (typeof file.sha256 !== "string" || file.sha256.length === 0) {
      fail("E_HASH_MISSING", `missing sha256 for ${expectedDestination}`);
      continue;
    }

    const managedPath = path.join(agentsDir, expectedDestination);
    if (!fs.existsSync(managedPath)) {
      fail("E_MISSING_FILE", `missing managed file ${path.relative(repoRoot, managedPath)}`);
      continue;
    }

    const actualHash = sha256(fs.readFileSync(managedPath, "utf8"));
    if (actualHash !== file.sha256) {
      fail(
        "E_HASH_MISMATCH",
        `${path.relative(repoRoot, managedPath)} expected sha256 ${file.sha256}, actual ${actualHash}`,
      );
    }
  }

  if (!fs.existsSync(agentsDir)) {
    fail("E_AGENTS_DIR", `missing directory ${path.relative(repoRoot, agentsDir)}`);
    return false;
  }

  const entries = fs.readdirSync(agentsDir, { withFileTypes: true });
  const managedMarkdownFiles = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.startsWith("io-ds-") &&
        !entry.name.startsWith("io-ds-ext-") &&
        entry.name.endsWith(".md"),
    )
    .map((entry) => entry.name)
    .sort();

  const expectedManagedFiles = curatedSources.map((source) => managedFileName(source)).sort();

  for (const expectedFile of expectedManagedFiles) {
    if (!managedMarkdownFiles.includes(expectedFile)) {
      fail("E_MISSING_FILE", `missing managed file .github/agents/${expectedFile}`);
    }
  }

  for (const actualFile of managedMarkdownFiles) {
    if (!expectedManagedFiles.includes(actualFile)) {
      fail("E_EXTRA_FILE", `unexpected managed file .github/agents/${actualFile}`);
    }
  }

  if (!fs.existsSync(manifestPath)) {
    fail("E_MANIFEST_FILE", `missing file ${path.relative(repoRoot, manifestPath)}`);
  }

  return errors.length === 0;
}

const ok = main();

if (!ok) {
  for (const error of errors) {
    console.error(error);
  }
  console.error(`[copilot-drift] FAILED with ${errors.length} mismatch(es).`);
  console.error("[copilot-drift] Fix hint: run npm run agents:sync:copilot");
  process.exit(1);
}

console.log("[copilot-drift] OK: no drift detected.");
