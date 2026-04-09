#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const reconciliationPath = path.join(repoRoot, "docs/token-runtime-reconciliation.json");
const namingMapPath = path.join(repoRoot, "docs/token-cssvar-naming-map.json");
const tokensPath = path.join(repoRoot, "docs/tokens.json");
const appCssPath = path.join(repoRoot, "io-components/src/global/app.css");

const VAR_NAME = /^--io-[a-z0-9-]+$/;
const ALLOWED_DISPOSITIONS = new Set(["documented", "aliased", "removed"]);
const ALLOWED_DOC_SCOPES = new Set(["tokens-json", "app-css-runtime", "retired"]);

function fail(message) {
  console.error(`[runtime-reconciliation] ${message}`);
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

function parseCssVars(content) {
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

function hasTokenLeaf(tokens, tokenPath) {
  const tokenLeaf = getTokenAtPath(tokens, tokenPath);
  return !!(
    tokenLeaf
    && typeof tokenLeaf === "object"
    && !Array.isArray(tokenLeaf)
    && ("$value" in tokenLeaf || "$aliasOf" in tokenLeaf)
  );
}

function main() {
  for (const requiredPath of [reconciliationPath, namingMapPath, tokensPath, appCssPath]) {
    if (!fs.existsSync(requiredPath)) {
      fail(`Missing required file: ${path.relative(repoRoot, requiredPath)}`);
    }
  }

  const reconciliation = readJson(reconciliationPath);
  const namingMap = readJson(namingMapPath);
  const tokens = readJson(tokensPath);
  const cssMap = parseCssVars(fs.readFileSync(appCssPath, "utf8"));

  const errors = [];

  if (reconciliation.$schemaVersion !== 1) {
    errors.push("docs/token-runtime-reconciliation.json must set $schemaVersion to 1.");
  }

  if (!Array.isArray(reconciliation.entries) || reconciliation.entries.length === 0) {
    errors.push("docs/token-runtime-reconciliation.json must contain a non-empty entries array.");
  }

  if (!Array.isArray(namingMap.mappings)) {
    errors.push("docs/token-cssvar-naming-map.json must contain a mappings array.");
  }

  if (errors.length > 0) {
    errors.sort();
    console.error("[runtime-reconciliation] Validation failed:");
    for (const error of errors) {
      console.error(`[runtime-reconciliation] - ${error}`);
    }
    process.exit(1);
  }

  const runtimeVars = new Set(cssMap.keys());
  const entryByRuntimeVar = new Map();
  const aliasByVar = new Map();

  for (const row of namingMap.mappings || []) {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      continue;
    }

    if (typeof row.aliasCssVar === "string") {
      aliasByVar.set(row.aliasCssVar, row);
    }
  }

  for (const entry of reconciliation.entries) {
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      errors.push("Each reconciliation entry must be a non-null object.");
      continue;
    }

    const {
      runtimeCssVar,
      disposition,
      documentationScope,
      tokenPath,
      canonicalCssVar,
      notes,
    } = entry;

    if (typeof runtimeCssVar !== "string" || !VAR_NAME.test(runtimeCssVar)) {
      errors.push(`Invalid runtimeCssVar format: ${runtimeCssVar}`);
      continue;
    }

    if (entryByRuntimeVar.has(runtimeCssVar)) {
      errors.push(`Duplicate runtimeCssVar in reconciliation: ${runtimeCssVar}`);
      continue;
    }

    entryByRuntimeVar.set(runtimeCssVar, entry);

    if (!ALLOWED_DISPOSITIONS.has(disposition)) {
      errors.push(`Unsupported disposition for ${runtimeCssVar}: ${disposition}`);
    }

    if (!ALLOWED_DOC_SCOPES.has(documentationScope)) {
      errors.push(`Unsupported documentationScope for ${runtimeCssVar}: ${documentationScope}`);
    }

    if (typeof notes !== "string" || notes.trim().length === 0) {
      errors.push(`notes must be a non-empty string for ${runtimeCssVar}`);
    }

    if (disposition === "documented") {
      if (documentationScope !== "tokens-json" && documentationScope !== "app-css-runtime") {
        errors.push(
          `documentationScope must be tokens-json or app-css-runtime for documented entry: ${runtimeCssVar}`,
        );
      }

      if (documentationScope === "tokens-json") {
        if (typeof tokenPath !== "string" || tokenPath.trim().length === 0) {
          errors.push(`tokenPath is required for documented tokens-json entry: ${runtimeCssVar}`);
        } else if (!hasTokenLeaf(tokens, tokenPath)) {
          errors.push(`tokenPath must resolve to a token leaf for ${runtimeCssVar}: ${tokenPath}`);
        }
      }

      if (documentationScope === "app-css-runtime") {
        if (tokenPath !== null) {
          errors.push(`tokenPath must be null for app-css-runtime entry: ${runtimeCssVar}`);
        }
      }

      if (canonicalCssVar !== null) {
        errors.push(`canonicalCssVar must be null for documented entry: ${runtimeCssVar}`);
      }
    }

    if (disposition === "aliased") {
      if (documentationScope !== "tokens-json") {
        errors.push(`documentationScope must be tokens-json for aliased entry: ${runtimeCssVar}`);
      }

      if (typeof tokenPath !== "string" || tokenPath.trim().length === 0) {
        errors.push(`tokenPath is required for aliased entry: ${runtimeCssVar}`);
      } else if (!hasTokenLeaf(tokens, tokenPath)) {
        errors.push(`tokenPath must resolve to a token leaf for ${runtimeCssVar}: ${tokenPath}`);
      }

      if (typeof canonicalCssVar !== "string" || !VAR_NAME.test(canonicalCssVar)) {
        errors.push(`canonicalCssVar is required for aliased entry: ${runtimeCssVar}`);
      }

      const mapRow = aliasByVar.get(runtimeCssVar);
      if (!mapRow) {
        errors.push(`Aliased entry must exist in docs/token-cssvar-naming-map.json: ${runtimeCssVar}`);
      } else {
        if (mapRow.status !== "aliased") {
          errors.push(`Alias mapping row must have status \"aliased\" for ${runtimeCssVar}`);
        }

        if (canonicalCssVar !== mapRow.canonicalCssVar) {
          errors.push(`canonicalCssVar mismatch for ${runtimeCssVar}: expected ${mapRow.canonicalCssVar}`);
        }

        if (tokenPath !== mapRow.tokenPath) {
          errors.push(`tokenPath mismatch for ${runtimeCssVar}: expected ${mapRow.tokenPath}`);
        }
      }

      if (!cssMap.has(runtimeCssVar)) {
        errors.push(`aliased runtimeCssVar not found in app.css: ${runtimeCssVar}`);
      } else {
        const aliasValues = cssMap.get(runtimeCssVar);
        const expected = `var(${canonicalCssVar})`;
        const effectiveAlias = normalizeVarRef(aliasValues[aliasValues.length - 1]);

        if (effectiveAlias !== expected) {
          errors.push(`${runtimeCssVar} must resolve to ${expected} as effective declaration.`);
        }
      }
    }

    if (disposition === "removed") {
      if (documentationScope !== "retired") {
        errors.push(`documentationScope must be retired for removed entry: ${runtimeCssVar}`);
      }

      if (tokenPath !== null) {
        errors.push(`tokenPath must be null for removed entry: ${runtimeCssVar}`);
      }

      if (canonicalCssVar !== null) {
        errors.push(`canonicalCssVar must be null for removed entry: ${runtimeCssVar}`);
      }

      if (runtimeVars.has(runtimeCssVar)) {
        errors.push(`removed entry still exists in app.css: ${runtimeCssVar}`);
      }
    }
  }

  for (const runtimeCssVar of runtimeVars) {
    const entry = entryByRuntimeVar.get(runtimeCssVar);
    if (!entry) {
      errors.push(`Runtime CSS var missing from reconciliation table: ${runtimeCssVar}`);
      continue;
    }

    if (entry.disposition === "removed") {
      errors.push(`Runtime CSS var present but marked removed: ${runtimeCssVar}`);
    }
  }

  for (const runtimeCssVar of entryByRuntimeVar.keys()) {
    const entry = entryByRuntimeVar.get(runtimeCssVar);
    if (entry.disposition !== "removed" && !runtimeVars.has(runtimeCssVar)) {
      errors.push(`Reconciliation entry is stale (var not found in app.css): ${runtimeCssVar}`);
    }
  }

  if (errors.length > 0) {
    errors.sort();
    console.error("[runtime-reconciliation] Validation failed:");
    for (const error of errors) {
      console.error(`[runtime-reconciliation] - ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `[runtime-reconciliation] OK: ${runtimeVars.size} runtime vars reconciled in docs/token-runtime-reconciliation.json`,
  );
}

main();
