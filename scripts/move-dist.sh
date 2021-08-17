#!/usr/bin/env bash
set -euo pipefail

mkdir public
cp -r dist/client public
mkdir api/renderer
mv dist/client/ssr-manifest.json api/renderer/
cp dist/server/entry-server.js api/renderer/
cp dist/client/index.html api/renderer/
