#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const RAW_BASE = "https://raw.githubusercontent.com/msitarzewski/agency-agents";
const EXPECTED_PROJECT = "io-design-system";
const EXPECTED_AGENT_COUNT = 14;
const MANIFEST_FILE = "io-ds-ext-copilot-managed-manifest.json";

function parseArgs(argv) {
  let ref = "main";
  let dryRun = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }

    if (arg === "--ref") {
      const value = argv[i + 1];
      if (!value) {
        throw new Error("--ref requires a value.");
      }
      ref = value;
      i += 1;
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Sync extended on-demand agency-agents profiles into .github/agents for GitHub Copilot.",
          "",
          "Usage:",
          "  node scripts/sync-curated-agency-copilot-extended.cjs [--ref <git-ref>] [--dry-run]",
          "",
          "Options:",
          "  --ref <git-ref>  Git ref from msitarzewski/agency-agents (default: main)",
          "  --dry-run        Print intended actions without writing files",
        ].join("\n"),
      );
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { ref, dryRun };
}

function managedFileName(sourcePath) {
  return `io-ds-ext-${path.basename(sourcePath)}`;
}

function splitFrontmatter(markdown, sourcePath) {
  if (!markdown.startsWith("---\n")) {
    throw new Error(`Source ${sourcePath} is missing expected frontmatter.`);
  }

  const marker = "\n---\n";
  const endIndex = markdown.indexOf(marker, 4);

  if (endIndex < 0) {
    throw new Error(`Source ${sourcePath} frontmatter is not closed.`);
  }

  const frontmatter = markdown.slice(0, endIndex + marker.length);
  const body = markdown.slice(endIndex + marker.length).trimStart();
  return { frontmatter, body };
}

function buildAdaptationBlock(adaptationText) {
  return [
    "## io-design-system Project Adaptation",
    "",
    "The following guardrails are mandatory for this repository:",
    "",
    adaptationText.trim(),
    "",
    "---",
    "",
  ].join("\n");
}

async function readCuratedConfig(repoRoot) {
  const curatedPath = path.join(
    repoRoot,
    "docs",
    "agency-agents",
    "curated-io-design-system-copilot-extended.json",
  );

  const content = await fs.readFile(curatedPath, "utf8");
  const parsed = JSON.parse(content);

  if (parsed.project !== EXPECTED_PROJECT) {
    throw new Error(
      `Expected curated project "${EXPECTED_PROJECT}" but found "${parsed.project}".`,
    );
  }

  if (!Array.isArray(parsed.agents)) {
    throw new Error("curated-io-design-system-copilot-extended.json must include an agents array.");
  }

  if (parsed.agents.length !== EXPECTED_AGENT_COUNT) {
    throw new Error(
      `Expected ${EXPECTED_AGENT_COUNT} curated extended Copilot agents, found ${parsed.agents.length}.`,
    );
  }

  const sources = parsed.agents.map((entry) => entry.source).filter(Boolean);
  if (sources.length !== EXPECTED_AGENT_COUNT) {
    throw new Error(
      `Curated extended source list must contain ${EXPECTED_AGENT_COUNT} valid source entries.`,
    );
  }

  if (new Set(sources).size !== sources.length) {
    throw new Error("Curated extended source list contains duplicates.");
  }

  return { sources, curatedPath };
}

async function fetchAgentMarkdown(ref, sourcePath) {
  const url = `${RAW_BASE}/${ref}/${sourcePath}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "io-design-system-copilot-agent-sync-extended" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${sourcePath} (${response.status} ${response.statusText}).`);
  }

  const markdown = await response.text();
  return { source: sourcePath, url, markdown };
}

async function listManagedExtendedFiles(destinationDir) {
  try {
    const entries = await fs.readdir(destinationDir, { withFileTypes: true });
    return entries
      .filter(
        (entry) =>
          entry.isFile() &&
          entry.name.startsWith("io-ds-ext-") &&
          entry.name.endsWith(".md"),
      )
      .map((entry) => entry.name);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function syncAgents({ repoRoot, ref, dryRun }) {
  const { sources, curatedPath } = await readCuratedConfig(repoRoot);
  const adaptationPath = path.join(repoRoot, "docs", "agency-agents", "ADAPTATION_LAYER.md");
  const adaptationText = await fs.readFile(adaptationPath, "utf8");

  const destinationDir = path.join(repoRoot, ".github", "agents");
  const existingManaged = await listManagedExtendedFiles(destinationDir);
  const adaptedAgents = [];

  for (const sourcePath of sources) {
    const fetched = await fetchAgentMarkdown(ref, sourcePath);
    const { frontmatter, body } = splitFrontmatter(fetched.markdown, sourcePath);
    const adaptedMarkdown = `${frontmatter}${buildAdaptationBlock(adaptationText)}${body}`;
    adaptedAgents.push({
      source: sourcePath,
      destination: managedFileName(sourcePath),
      url: fetched.url,
      sha256: crypto.createHash("sha256").update(adaptedMarkdown).digest("hex"),
      markdown: adaptedMarkdown,
    });
  }

  if (dryRun) {
    console.log("[Dry Run] Curated file:", curatedPath);
    console.log("[Dry Run] Ref:", ref);
    console.log("[Dry Run] Destination:", destinationDir);
    console.log("[Dry Run] Existing extended managed files to replace:", existingManaged.length);
    for (const item of adaptedAgents) {
      console.log(`[Dry Run] ${item.source} -> ${item.destination}`);
    }
    return;
  }

  await fs.mkdir(destinationDir, { recursive: true });

  for (const oldFile of existingManaged) {
    await fs.rm(path.join(destinationDir, oldFile), { force: true });
  }

  for (const item of adaptedAgents) {
    await fs.writeFile(path.join(destinationDir, item.destination), item.markdown, "utf8");
  }

  const manifest = {
    managedBy: "scripts/sync-curated-agency-copilot-extended.cjs",
    project: EXPECTED_PROJECT,
    sourceRepository: "msitarzewski/agency-agents",
    ref,
    adaptedWith: "docs/agency-agents/ADAPTATION_LAYER.md",
    installedAt: new Date().toISOString(),
    count: adaptedAgents.length,
    files: adaptedAgents.map((item) => ({
      source: item.source,
      destination: item.destination,
      url: item.url,
      sha256: item.sha256,
    })),
  };

  await fs.writeFile(
    path.join(destinationDir, MANIFEST_FILE),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  console.log(`Synced ${adaptedAgents.length} extended Copilot agents into ${destinationDir}`);
  console.log(`Wrote manifest: ${path.join(destinationDir, MANIFEST_FILE)}`);
}

async function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const options = parseArgs(process.argv.slice(2));
  await syncAgents({ repoRoot, ...options });
}

main().catch((error) => {
  console.error("[Copilot Extended Agent Sync] Failed:");
  console.error(`- ${error.message}`);
  process.exit(1);
});
