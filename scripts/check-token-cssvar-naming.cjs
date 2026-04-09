#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = process.cwd();
const mappingPath = path.join(repoRoot, "docs/token-cssvar-naming-map.json");
const tokensPath = path.join(repoRoot, "docs/tokens.json");
const appCssPath = path.join(repoRoot, "io-components/src/global/app.css");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getTokenAtPath(tokens, tokenPath) {
  return tokenPath.split(".").reduce((acc, segment) => {
    if (!acc || typeof acc !== "object") {
      return undefined;
    }
    return acc[segment];
  }, tokens);
}

function parseCssVariables(content) {
  const map = new Map();
  const regex = /(--io-[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match = regex.exec(content);

  while (match) {
    const varName = match[1].trim();
    const value = match[2].trim();

    if (!map.has(varName)) {
      map.set(varName, []);
    }

    map.get(varName).push(value);
    match = regex.exec(content);
  }

  return map;
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
    errors.push("docs/token-cssvar-naming-map.json must set $schemaVersion to 1.");
  }

  if (!Array.isArray(mapping.mappings) || mapping.mappings.length === 0) {
    errors.push("docs/token-cssvar-naming-map.json must contain a non-empty mappings array.");
  }

  const seenTokenPaths = new Set();
  const seenAliases = new Set();

  for (const entry of mapping.mappings || []) {
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
    }

    if (!isValidCssVar(aliasCssVar)) {
      errors.push(`Invalid aliasCssVar format for ${tokenPath}: ${aliasCssVar}`);
    }

    if (seenAliases.has(aliasCssVar)) {
      errors.push(`Duplicate aliasCssVar in mapping: ${aliasCssVar}`);
    }
    seenAliases.add(aliasCssVar);

    if (status !== "aliased") {
      errors.push(`Unsupported status for ${tokenPath}: ${status}. Expected \"aliased\".`);
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
      if (typeof entry.migration.reviewAfter !== "string" || entry.migration.reviewAfter.trim().length === 0) {
        errors.push(`migration.reviewAfter must be a non-empty string for ${tokenPath}`);
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
      const effectiveAlias = aliasValues[aliasValues.length - 1];

      if (effectiveAlias !== expected) {
        errors.push(`${aliasCssVar} must alias ${canonicalCssVar} using \"${expected}\" as its effective declaration.`);
      }
    }

    if (cssVariables.has(canonicalCssVar)) {
      const canonicalValues = cssVariables.get(canonicalCssVar);
      const effectiveCanonical = canonicalValues[canonicalValues.length - 1];
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
