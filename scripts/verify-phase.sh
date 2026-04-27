#!/bin/sh
# verify-phase.sh — scope and hygiene gate for Gemini data/content phases.
#
# Usage:
#   ALLOWED_FILES="src/lib/data/countries.ts,src/lib/__tests__/data.test.ts" \
#   FORBIDDEN_FIELDS="costBreakdown,dimensions,visaPathways" \
#   npm run verify:phase
#
# ALLOWED_FILES  — comma-separated list of files permitted to change.
#                  If unset, only the whitespace and forbidden-field checks run.
# FORBIDDEN_FIELDS — comma-separated list of field names that must not appear
#                    as new additions (+) in the countries.ts diff.
#                    If unset, field check is skipped.
#
# NOTE: All phase work must be committed before running this script.
# Uncommitted changes are not inspected by the main...HEAD checks and will
# cause this script to abort.

set -e

FAIL=0

ok()   { echo "  ✓ $1"; }
fail() { echo "  ✗ $1"; FAIL=$((FAIL + 1)); }

echo ""
echo "=== verify:phase ==="
echo ""

# ── 0. Uncommitted-changes guard ──────────────────────────────────────────────
echo "0. Working tree clean"
UNSTAGED=$(git diff --name-only 2>/dev/null)
STAGED=$(git diff --cached --name-only 2>/dev/null)
if [ -n "$UNSTAGED" ] || [ -n "$STAGED" ]; then
  fail "Uncommitted changes detected — commit everything before running verify:phase"
  if [ -n "$STAGED" ];   then echo "   Staged:   $STAGED";   fi
  if [ -n "$UNSTAGED" ]; then echo "   Unstaged: $UNSTAGED"; fi
  echo ""
  echo "=== Summary ==="
  echo "1 check(s) failed. Commit all changes first."
  echo ""
  exit 1
else
  ok "Working tree is clean — all changes committed"
fi

# ── 1. Whitespace gate ────────────────────────────────────────────────────────
echo ""
echo "1. Whitespace (git diff --check main...HEAD)"
if git diff --check main...HEAD > /tmp/vp_whitespace.txt 2>&1; then
  ok "No whitespace violations"
else
  fail "Whitespace violations found:"
  cat /tmp/vp_whitespace.txt | sed 's/^/     /'
fi

# ── 2. Scope gate ─────────────────────────────────────────────────────────────
echo ""
echo "2. Scope (changed files vs ALLOWED_FILES)"

if [ -z "$ALLOWED_FILES" ]; then
  echo "   ALLOWED_FILES not set — skipping scope check"
else
  CHANGED=$(git diff --name-only main...HEAD)

  if [ -z "$CHANGED" ]; then
    ok "No changed files (branch is identical to main)"
  else
    VIOLATIONS=""
    for f in $CHANGED; do
      MATCH=0
      OLD_IFS="$IFS"
      IFS=','
      for allowed in $ALLOWED_FILES; do
        if [ "$f" = "$allowed" ]; then
          MATCH=1
          break
        fi
      done
      IFS="$OLD_IFS"
      if [ "$MATCH" = "0" ]; then
        VIOLATIONS="$VIOLATIONS\n     OUT OF SCOPE: $f"
      fi
    done

    if [ -z "$VIOLATIONS" ]; then
      ok "All changed files are in ALLOWED_FILES"
      echo "   Changed:"
      for f in $CHANGED; do echo "     $f"; done
    else
      fail "Files changed outside the allowed list:"
      printf "%b\n" "$VIOLATIONS"
      echo "   ALLOWED_FILES = $ALLOWED_FILES"
    fi
  fi
fi

# ── 3. Forbidden-field gate ───────────────────────────────────────────────────
echo ""
echo "3. Forbidden fields in countries.ts diff (FORBIDDEN_FIELDS)"

if [ -z "$FORBIDDEN_FIELDS" ]; then
  echo "   FORBIDDEN_FIELDS not set — skipping field check"
else
  if ! git diff --name-only main...HEAD | grep -q "countries.ts"; then
    ok "countries.ts not changed — field check not applicable"
  else
    PATTERN=$(echo "$FORBIDDEN_FIELDS" | tr ',' '|')
    FIELD_VIOLATIONS=$(git diff main...HEAD -- src/lib/data/countries.ts \
      | grep "^+" | grep -v "^+++" \
      | grep -E "$PATTERN" || true)

    if [ -z "$FIELD_VIOLATIONS" ]; then
      ok "No forbidden fields added (checked: $FORBIDDEN_FIELDS)"
    else
      fail "Forbidden field additions detected in countries.ts:"
      echo "$FIELD_VIOLATIONS" | head -20 | sed 's/^/     /'
      if [ "$(echo "$FIELD_VIOLATIONS" | wc -l)" -gt 20 ]; then
        echo "     ... (truncated, more violations exist)"
      fi
    fi
  fi
fi

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "=== Summary ==="
if [ "$FAIL" -eq 0 ]; then
  echo "All checks passed."
  echo ""
  exit 0
else
  echo "$FAIL check(s) failed. Fix before handing off to reviewer."
  echo ""
  exit 1
fi
