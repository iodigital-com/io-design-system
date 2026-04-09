#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = process.cwd();
const mappingPath = path.join(repoRoot, "docs/token-cssvar-naming-map.json");
const tokensPath = path.join(repoRoot, "docs/tokens.json");
const appCssPath = path.join(repoRoot, "io-components/src/global/app.css");

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function readJson(filePath) {
  let content;

  try {
    content = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    console.error(
      `[token-naming] Failed to read JSON file ${path.relative(repoRoot, filePath)}: ${message}`,
    );
    process.exit(1);
  }

  let parsed;

  try {
    parsed = JSON.parse(content);
  } catch (error) {
    const message = error && error.message ? error.message : String(error);
    console.error(
      `[token-naming] Invalid JSON in ${path.relative(repoRoot, filePath)}: ${message}`,
    );
    process.exit(1);
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    console.error(
      `[token-naming] Expected ${path.relative(repoRoot, filePath)} to contain a top-level JSON object.`,
    );
    process.exit(1);
  }

  return parsed;
}

function getTokenAtPath(tokens, tokenPath) {
  return tokenPath.split(".").reduce((acc, segment) => {
    if (!acc || typeof acc !== "object") {
      return undefined;
    }
    return acc[segment];
  }, tokens);
}

function stripCssComments(content) {
  return content.replace(/\/\*[\s\S]*?\*\//g, "");
}

function parseCssVariables(content) {
  const map = new Map();
  const stripped = stripCssComments(content);
  const regex = /(--io-[a-z0-9-]+)\s*:\s*([^;]+);/g;
  let match = regex.exec(stripped);

  while (match) {
    const varName = match[1].trim();
    const value = match[2].trim();

    if (!map.has(varName)) {
      map.set(varName, []);
    }

    map.get(varName).push(value);
    match = regex.exec(stripped);
  }

  return map;
}

function normalizeVarRef(value) {
  return value.replace(/var\(\s*(--[a-z0-9-]+)\s*\)/g, "var($1)");
}

function isValidCssVar(value) {
  return /^--io-[a-z0-9-]+$/.test(value);
}

function main() {
  const errors = [];

  if (!fs.existsSync(mappingPath)) {
    errors.push(`Missing mapping file: ${path.relative(repoRoot, mappingPath)}`);
  }

  if (!fs.existsSync(tokensPath)) {
    errors.push(`Missing tokens file: ${path.relative(repoRoot, tokensPath)}`);
  }

  if (!fs.existsSync(appCssPath)) {
    errors.push(`Missing app.css file: ${path.relative(repoRoot, appCssPath)}`);
  }

  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`[token-naming] ${error}`);
    }
    process.exit(1);
  }

  const mapping = readJson(mappingPath);
  const tokens = readJson(tokensPath);
  const cssVariables = parseCssVariables(fs.readFileSync(appCssPath, "utf8"));

  if (mapping.$schemaVersion !== 1) {
    console.error("[token-naming] Validation failed:");
    console.error("[token-naming] - docs/token-cssvar-naming-map.json must set $schemaVersion to 1.");
    process.exit(1);
  }

  if (!Array.isArray(mapping.mappings) || mapping.mappings.length === 0) {
    console.error("[token-naming] Validation failed:");
    console.error("[token-naming] - docs/token-cssvar-naming-map.json must contain a non-empty mappings array.");
    process.exit(1);
  }

  const seenTokenPaths = new Set();
  const seenAliases = new Set();
  const seenCanonicals = new Set();

  for (const entry of mapping.mappings) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      errors.push("Each mapping entry must be a non-null object.");
      continue;
    }

    const { tokenPath, canonicalCssVar, aliasCssVar, status } = entry;

    if (typeof tokenPath !== "string" || tokenPath.trim().length === 0) {
      errors.push("Each mapping entry must include a non-empty tokenPath string.");
      continue;
    }

    if (seenTokenPaths.has(tokenPath)) {
      errors.push(`Duplicate tokenPath in mapping: ${tokenPath}`);
    }
    seenTokenPaths.add(tokenPath);

    if (!isValidCssVar(canonicalCssVar)) {
      errors.push(`Invalid canonicalCssVar format for ${tokenPath}: ${canonicalCssVar}`);
      continue;
    }

    if (!isValidCssVar(aliasCssVar)) {
      errors.push(`Invalid aliasCssVar format for ${tokenPath}: ${aliasCssVar}`);
      continue;
    }

    if (seenAliases.has(aliasCssVar)) {
      errors.push(`Duplicate aliasCssVar in mapping: ${aliasCssVar}`);
    }
    seenAliases.add(aliasCssVar);

    if (seenCanonicals.has(canonicalCssVar)) {
      errors.push(`Duplicate canonicalCssVar in mapping: ${canonicalCssVar}`);
    }
    seenCanonicals.add(canonicalCssVar);

    if (status !== "aliased") {
      errors.push(`Unsupported status for ${tokenPath}: ${status}. Expected "aliased".`);
    }

    const tokenLeaf = getTokenAtPath(tokens, tokenPath);
    if (!tokenLeaf || typeof tokenLeaf !== "object" || (!("$value" in tokenLeaf) && !("$aliasOf" in tokenLeaf))) {
      errors.push(`tokenPath must resolve to a token leaf with $value or $aliasOf: ${tokenPath}`);
    }

    if (!entry.migration || typeof entry.migration !== "object") {
      errors.push(`Each mapping entry must include migration metadata: ${tokenPath}`);
    } else {
      if (typeof entry.migration.notes !== "string" || entry.migration.notes.trim().length === 0) {
        errors.push(`migration.notes must be a non-empty string for ${tokenPath}`);
      }
      if (typeof entry.migration.reviewAfter !== "string" || !ISO_DATE.test(entry.migration.reviewAfter)) {
        errors.push(`migration.reviewAfter must be an ISO 8601 date (YYYY-MM-DD) for ${tokenPath}`);
      }
    }

    if (!cssVariables.has(canonicalCssVar)) {
      errors.push(`canonicalCssVar not found in app.css for ${tokenPath}: ${canonicalCssVar}`);
    }

    if (!cssVariables.has(aliasCssVar)) {
      errors.push(`aliasCssVar not found in app.css for ${tokenPath}: ${aliasCssVar}`);
    }

    if (cssVariables.has(aliasCssVar)) {
      const aliasValues = cssVariables.get(aliasCssVar);
      const expected = `var(${canonicalCssVar})`;
      const effectiveAlias = normalizeVarRef(aliasValues[aliasValues.length - 1]);

      if (effectiveAlias !== expected) {
        errors.push(`${aliasCssVar} must alias ${canonicalCssVar} using "${expected}" as its effective declaration.`);
      }
    }

    if (cssVariables.has(canonicalCssVar)) {
      const canonicalValues = cssVariables.get(canonicalCssVar);
      const effectiveCanonical = normalizeVarRef(canonicalValues[canonicalValues.length - 1]);
      const referencesAlias = effectiveCanonical.includes(`var(${aliasCssVar})`);
      if (referencesAlias) {
        errors.push(`${canonicalCssVar} must not reference alias ${aliasCssVar}.`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("[token-naming] Validation failed:");
    for (const error of errors) {
      console.error(`[token-naming] - ${error}`);
    }
    process.exit(1);
  }

  console.log("[token-naming] OK: token path and CSS variable naming mappings are valid.");
}

main();
