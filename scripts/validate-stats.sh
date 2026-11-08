#!/usr/bin/env bash
# Fail-closed validation of API-derived stats. Usage: validate-stats.sh [stats.json]
# downloads/stars/forks must be JSON non-negative integers; version must be SemVer 2.0.0.
set -euo pipefail

file="${1:-data/stats.json}"

# Official SemVer 2.0.0 regex (https://semver.org), anchored; matched against the whole string.
SEMVER_RE='^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(-((0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9][0-9]*|[0-9]*[a-zA-Z-][0-9a-zA-Z-]*))*))?(\+([0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*))?$'

for key in downloads stars forks; do
  val=$(jq -r --arg k "$key" '.[$k] | if type == "number" then tostring else "invalid" end' "$file")
  if [[ ! "$val" =~ ^[0-9]+$ ]]; then
    echo "ERROR: $file $key is not ^[0-9]+$: refusing to continue" >&2
    exit 1
  fi
done

ver=$(jq -r '.version | if type == "string" then . else "invalid" end' "$file")
if [[ ! "$ver" =~ $SEMVER_RE ]]; then
  echo "ERROR: $file version is not a SemVer 2.0.0 string: refusing to continue" >&2
  exit 1
fi
