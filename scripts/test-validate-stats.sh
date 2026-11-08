#!/usr/bin/env bash
# Fixture tests for scripts/validate-stats.sh. Exits non-zero on any mismatch.
set -uo pipefail
here=$(cd "$(dirname "$0")" && pwd)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
fail=0

run() { # name expected_exit json
  printf '%s' "$3" > "$tmp/s.json"
  "$here/validate-stats.sh" "$tmp/s.json" >/dev/null 2>&1
  got=$?
  if [ "$got" -eq "$2" ]; then echo "ok   exit=$got $1"; else echo "FAIL exit=$got (want $2) $1"; fail=1; fi
}

ver() { # expected_exit version(json-encoded via jq)
  run "version $(printf '%s' "$2" | jq -Rr '@json')" "$1" \
    "$(jq -n --arg v "$2" '{version:$v,downloads:1,stars:2,forks:3}')"
}

for v in 1.2.3 1.2.3-rc.1 1.2.3+build.5 0.0.0 1.2.3-0.a-b+x.1; do ver 0 "$v"; done
for v in '1.2.3-+' '1.2.3-' '1.2.3+' '01.2.3' '1.2' '1.2.3-a..b' '1.2.3-01' '' 'v1.2.3' \
         '1"));x(' '1.2.3; rm -rf /' '$(id)' '1.2.3
evil'; do ver 1 "$v"; done

run 'valid stats' 0 '{"version":"1.2.3","downloads":10,"stars":2,"forks":3}'
run 'downloads string injection' 1 '{"version":"1.2.3","downloads":"1;rm -rf /","stars":2,"forks":3}'
run 'downloads 1.5' 1 '{"version":"1.2.3","downloads":1.5,"stars":2,"forks":3}'
run 'stars -2' 1 '{"version":"1.2.3","downloads":1,"stars":-2,"forks":3}'
run 'missing forks' 1 '{"version":"1.2.3","downloads":1,"stars":2}'
run 'version not string' 1 '{"version":123,"downloads":1,"stars":2,"forks":3}'

# Pre-checkout workspace-empty step: run its exact shell body from the workflow.
wf="$here/../.github/workflows/runner-check.yml"
body=$(awk '/- name: Workspace must be empty at job start/{f=1;next} f&&/^        run: \|/{r=1;next} r&&/^          /{sub(/^          /,"");print;next} r{exit}' "$wf")
[ -n "$body" ] || { echo "FAIL: could not extract workspace step"; fail=1; }
ws() { # name expected_exit setup-cmd-run-inside-dir
  local d out rc; d=$(mktemp -d)
  (cd "$d" && eval "$3")
  out=$(GITHUB_WORKSPACE="$d" bash -c "$body" 2>&1); rc=$?
  rm -rf "$d"
  if [ "$rc" -ne "$2" ]; then echo "FAIL: $1 (exit $rc, want $2)"; fail=1; return; fi
  if [ "$rc" -ne 0 ] && printf '%s' "$out" | grep -Eq 'secret|visible|\.hidden|/tmp/'; then echo "FAIL: $1 leaked name/path"; fail=1; return; fi
  echo "ok: $1 (exit $rc): $(printf '%s' "$out" | tr '\n' ' ')"
}
ws 'empty workspace' 0 ':'
ws 'file and dotfile' 1 'touch secret-visible.txt .hidden'
ws 'dotfile only' 1 'touch .hidden'
ws 'dot directory only' 1 'mkdir .hidden'

exit $fail
