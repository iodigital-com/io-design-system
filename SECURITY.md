# Security Policy

## Supported Versions

This repository is an actively maintained design-system monorepo. Security fixes are applied to the default branch (`main`) and included in the next release.

## Reporting a Vulnerability

Please report vulnerabilities through GitHub Security Advisories:
https://github.com/iodigital-com/io-design-system/security/advisories/new

Do not open public issues for unpatched vulnerabilities.

## Local Audit Workflow

Run dependency vulnerability checks locally from repository root:

```bash
npm audit --audit-level=high
```

## Resolving Audit Failures

Use the standard remediation flow:

```bash
npm audit fix
```

If a dependency cannot be upgraded immediately, document an explicit accepted-risk entry with:
- affected advisory/dependency
- rationale for temporary acceptance
- mitigation in place
- expiry date for re-evaluation

Accepted risk can be tracked via `.nsprc` or `pnpm audit --ignore` with a linked issue and expiry date.
