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

exit $fail
