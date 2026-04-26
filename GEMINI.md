# GEMINI.md

This file provides foundational mandates and behavioral guidance to Gemini CLI when working in this repository.

## Operational Mandates
1. **Single Source of Truth:** You MUST adhere to the architecture, standards, and workflow defined in **DEVELOPMENT.md**.
2. **Verify Toolchain:** Always check `package.json` before assuming the toolchain or build system. The project has migrated from a CDN-based static site to Next.js 15.
3. **Code Trumps Docs:** If any documentation (including this file or DEVELOPMENT.md) conflicts with the actual code or configuration files, the **code/config wins**.
4. **Security & Integrity:** Protect `.env` values and do not commit secrets.

## Behavioral Instructions
- Use `run_shell_command` to verify engine logic with `npm run test` after changes.
- Maintain the Tailwind CSS 4 utility patterns used in the project.
- Follow the surgical update pattern: read enough context to ensure `replace` is unambiguous.
