#!/bin/bash
set -e

corepack install

# Cannot find module @rollup/rollup-linux-arm64-gnu.
# npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828).
# Please try `npm i` again after removing both package-lock.json and node_modules directory.
# pnpm add -O @rollup/rollup-linux-x64-gnu

# pnpm run generate

# Then exec the container's main process (what's set as CMD in the Dockerfile).
exec "$@"
