#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");

const RAW_BASE = "https://raw.githubusercontent.com/msitarzewski/agency-agents";
const EXPECTED_PROJECT = "io-design-system";
const EXPECTED_AGENT_COUNT = 9;
const MANIFEST_FILE = "io-ds-managed-manifest.json";

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
          "Install curated agency-agents profiles into ~/.claude/agents.",
          "",
          "Usage:",
          "  node scripts/install-curated-agency-claude.cjs [--ref <git-ref>] [--dry-run]",
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
  return `io-ds-${path.basename(sourcePath)}`;
}

async function readCuratedConfig(repoRoot) {
  const curatedPath = path.join(
    repoRoot,
    "docs",
    "agency-agents",
    "curated-io-design-system.json",
  );

  const content = await fs.readFile(curatedPath, "utf8");
  const parsed = JSON.parse(content);

  if (parsed.project !== EXPECTED_PROJECT) {
    throw new Error(
      `Expected curated project "${EXPECTED_PROJECT}" but found "${parsed.project}".`,
    );
  }

  if (!Array.isArray(parsed.agents)) {
    throw new Error("curated-io-design-system.json must include an agents array.");
  }

  if (parsed.agents.length !== EXPECTED_AGENT_COUNT) {
    throw new Error(
      `Expected ${EXPECTED_AGENT_COUNT} curated agents, found ${parsed.agents.length}.`,
    );
  }

  const sources = parsed.agents.map((entry) => entry.source).filter(Boolean);
  const uniqueSources = new Set(sources);

  if (sources.length !== uniqueSources.size) {
    throw new Error("Curated agent source list contains duplicates.");
  }

  if (sources.length !== EXPECTED_AGENT_COUNT) {
    throw new Error(
      `Curated source list must contain ${EXPECTED_AGENT_COUNT} valid source entries.`,
    );
  }

  return { sources, curatedPath };
}

async function fetchAgentMarkdown(ref, sourcePath) {
  const url = `${RAW_BASE}/${ref}/${sourcePath}`;
  const response = await fetch(url, {
    headers: { "User-Agent": "io-design-system-curated-installer" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${sourcePath} (${response.status} ${response.statusText}).`);
  }

  const markdown = await response.text();

  if (!markdown.startsWith("---\n")) {
    throw new Error(`Source ${sourcePath} is missing expected frontmatter.`);
  }

  return {
    source: sourcePath,
    url,
    destination: managedFileName(sourcePath),
    markdown,
  };
}

async function listManagedAgentFiles(destinationDir) {
  try {
    const entries = await fs.readdir(destinationDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.startsWith("io-ds-") && entry.name.endsWith(".md"))
      .map((entry) => entry.name);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function installAgents({ repoRoot, ref, dryRun }) {
  const { sources, curatedPath } = await readCuratedConfig(repoRoot);

  const fetched = [];
  for (const sourcePath of sources) {
    fetched.push(await fetchAgentMarkdown(ref, sourcePath));
  }

  const destinationDir = path.join(os.homedir(), ".claude", "agents");
  const existingManaged = await listManagedAgentFiles(destinationDir);

  if (dryRun) {
    console.log("[Dry Run] Curated file:", curatedPath);
    console.log("[Dry Run] Ref:", ref);
    console.log("[Dry Run] Destination:", destinationDir);
    console.log("[Dry Run] Existing managed files to replace:", existingManaged.length);
    for (const file of fetched) {
      console.log(`[Dry Run] ${file.source} -> ${file.destination}`);
    }
    return;
  }

  await fs.mkdir(destinationDir, { recursive: true });

  for (const oldFile of existingManaged) {
    await fs.rm(path.join(destinationDir, oldFile), { force: true });
  }

  for (const item of fetched) {
    await fs.writeFile(path.join(destinationDir, item.destination), item.markdown, "utf8");
  }

  const manifest = {
    managedBy: "scripts/install-curated-agency-claude.cjs",
    project: EXPECTED_PROJECT,
    sourceRepository: "msitarzewski/agency-agents",
    ref,
    installedAt: new Date().toISOString(),
    count: fetched.length,
    files: fetched.map((item) => ({
      source: item.source,
      destination: item.destination,
      url: item.url,
    })),
  };

  await fs.writeFile(
    path.join(destinationDir, MANIFEST_FILE),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );

  console.log(`Installed ${fetched.length} curated agents into ${destinationDir}`);
  console.log(`Wrote manifest: ${path.join(destinationDir, MANIFEST_FILE)}`);
}

async function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const options = parseArgs(process.argv.slice(2));
  await installAgents({ repoRoot, ...options });
}

main().catch((error) => {
  console.error("[Curated Agency Installer] Failed:");
  console.error(`- ${error.message}`);
  process.exit(1);
});
