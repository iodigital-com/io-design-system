#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const tokensPath = path.join(repoRoot, "docs/tokens.json");
const implementedPath = path.join(repoRoot, "docs/token-cssvar-implemented-map.json");
const deprecatedPath = path.join(repoRoot, "docs/token-deprecated-unused.json");
const appCssPath = path.join(repoRoot, "io-components/src/global/app.css");

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const CSS_VAR = /^--io-[a-z0-9-]+$/;
const REQUIRED_SEMANTIC_MAPPINGS = {
  "form.input.borderWidthFocus": "--io-input-border-width-focus",
  "form.label.fontSize": "--io-label-font-size",
  "pageTokens.color.colorPrimaryPink": "--io-color-pink",
};

function fail(message) {
  console.error(`[token-doc-coverage] ${message}`);
  process.exit(1);
}

function readJson(filePath) {
  let content;

  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    fail(`Failed to read ${path.relative(repoRoot, filePath)}: ${message}`);
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    fail(`Invalid JSON in ${path.relative(repoRoot, filePath)}: ${message}`);
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    fail(`Expected ${path.relative(repoRoot, filePath)} to contain a top-level JSON object.`);
  }

  return parsed;
}

function getTokenLeaves(node, basePath = [], out = []) {
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    return out;
  }

  if ("$value" in node || "$aliasOf" in node) {
    out.push(basePath.join("."));
    return out;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) {
      continue;
    }

    getTokenLeaves(value, [...basePath, key], out);
  }

  return out;
}

function parseCssVars(content) {
  const stripped = content.replace(/\/\*[\s\S]*?\*\//g, "");
    if (stripped.includes("/*")) {
      throw new Error(
        "app.css contains an unclosed CSS comment — run parseCssVars on a syntactically valid file."
      );
    }
  const regex = /(--io-[a-z0-9-]+)\s*:\s*([^;]+);/g;
  const vars = new Set();
  let match = regex.exec(stripped);

  while (match) {
    vars.add(match[1].trim());
    match = regex.exec(stripped);
  }

  return vars;
}

function main() {
  for (const requiredPath of [tokensPath, implementedPath, deprecatedPath, appCssPath]) {
    if (!fs.existsSync(requiredPath)) {
      fail(`Missing required file: ${path.relative(repoRoot, requiredPath)}`);
    }
  }

  const tokens = readJson(tokensPath);
  const implemented = readJson(implementedPath);
  const deprecated = readJson(deprecatedPath);
  const cssVars = parseCssVars(fs.readFileSync(appCssPath, "utf8"));

  const errors = [];

  if (implemented.$schemaVersion !== 1) {
    errors.push("docs/token-cssvar-implemented-map.json must set $schemaVersion to 1.");
  }

  if (!Array.isArray(implemented.mappings)) {
    errors.push("docs/token-cssvar-implemented-map.json must contain a mappings array.");
  }

  if (deprecated.$schemaVersion !== 1) {
    errors.push("docs/token-deprecated-unused.json must set $schemaVersion to 1.");
  }

  if (!Array.isArray(deprecated.entries)) {
    errors.push("docs/token-deprecated-unused.json must contain an entries array.");
  }

  if (errors.length > 0) {
    errors.sort();
    console.error("[token-doc-coverage] Validation failed:");
    for (const error of errors) {
      console.error(`[token-doc-coverage] - ${error}`);
    }
    process.exit(1);
  }

  const tokenLeaves = getTokenLeaves(tokens).sort();
  const covered = new Set();

  for (const mapping of implemented.mappings) {
    if (!mapping || typeof mapping !== "object" || Array.isArray(mapping)) {
      errors.push("Each implemented mapping must be a non-null object.");
      continue;
    }

    const { tokenPath, runtimeCssVar, sourceFile, notes } = mapping;

    if (typeof tokenPath !== "string" || tokenPath.trim().length === 0) {
      errors.push("Each implemented mapping must include a non-empty tokenPath.");
      continue;
    }

    if (covered.has(tokenPath)) {
      errors.push(`Duplicate token coverage entry: ${tokenPath}`);
      continue;
    }

    covered.add(tokenPath);

    if (!tokenLeaves.includes(tokenPath)) {
      errors.push(`Implemented mapping references unknown tokenPath: ${tokenPath}`);
    }

    if (typeof runtimeCssVar !== "string" || !CSS_VAR.test(runtimeCssVar)) {
      errors.push(`Invalid runtimeCssVar for ${tokenPath}: ${runtimeCssVar}`);
    } else if (!cssVars.has(runtimeCssVar)) {
      errors.push(`runtimeCssVar not found in app.css for ${tokenPath}: ${runtimeCssVar}`);
    }

    if (
      Object.prototype.hasOwnProperty.call(REQUIRED_SEMANTIC_MAPPINGS, tokenPath) &&
      runtimeCssVar !== REQUIRED_SEMANTIC_MAPPINGS[tokenPath]
    ) {
      errors.push(
        `Semantic mapping mismatch for ${tokenPath}: expected ${REQUIRED_SEMANTIC_MAPPINGS[tokenPath]}, got ${runtimeCssVar}`,
      );
    }

    if (typeof sourceFile !== "string" || sourceFile.trim().length === 0) {
      errors.push(`sourceFile must be a non-empty string for implemented mapping: ${tokenPath}`);
    }

    if (typeof notes !== "string" || notes.trim().length === 0) {
      errors.push(`notes must be a non-empty string for implemented mapping: ${tokenPath}`);
    }
  }

  for (const entry of deprecated.entries) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      errors.push("Each deprecated entry must be a non-null object.");
      continue;
    }

    const { tokenPath, rationale, reviewAfter } = entry;

    if (typeof tokenPath !== "string" || tokenPath.trim().length === 0) {
      errors.push("Each deprecated entry must include a non-empty tokenPath.");
      continue;
    }

    if (covered.has(tokenPath)) {
      errors.push(`Duplicate token coverage entry: ${tokenPath}`);
      continue;
    }

    covered.add(tokenPath);

    if (!tokenLeaves.includes(tokenPath)) {
      errors.push(`Deprecated entry references unknown tokenPath: ${tokenPath}`);
    }

    if (typeof rationale !== "string" || rationale.trim().length === 0) {
      errors.push(`rationale must be a non-empty string for deprecated entry: ${tokenPath}`);
    }

    if (typeof reviewAfter !== "string" || !ISO_DATE.test(reviewAfter)) {
      errors.push(`reviewAfter must be ISO 8601 (YYYY-MM-DD) for deprecated entry: ${tokenPath}`);
    }
  }

  for (const tokenPath of tokenLeaves) {
    if (!covered.has(tokenPath)) {
      errors.push(`Token leaf missing coverage disposition: ${tokenPath}`);
    }
  }

  if (covered.size !== tokenLeaves.length) {
    errors.push(
      `Coverage cardinality mismatch: expected ${tokenLeaves.length} token leaves, got ${covered.size} covered entries.`,
    );
  }

  if (errors.length > 0) {
    errors.sort();
    console.error("[token-doc-coverage] Validation failed:");
    for (const error of errors) {
      console.error(`[token-doc-coverage] - ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `[token-doc-coverage] OK: ${tokenLeaves.length} token leaves covered by implemented/deprecated artifacts.`,
  );
}

main();
