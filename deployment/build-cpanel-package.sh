#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPLOYMENT_DIR="$ROOT/deployment"
STAGE="$DEPLOYMENT_DIR/.build"

command -v composer >/dev/null || { echo "Composer is required on this local machine."; exit 1; }
command -v npm >/dev/null || { echo "Node.js/npm is required on this local machine."; exit 1; }
command -v zip >/dev/null || { echo "zip is required on this local machine."; exit 1; }

rm -rf "$STAGE" "$DEPLOYMENT_DIR/vendor-production.zip" "$DEPLOYMENT_DIR/public-html.zip"
mkdir -p "$STAGE/vendor" "$STAGE/public_html/uploads"

echo "Building Vite assets locally…"
cd "$ROOT"
npm ci
npm run build

echo "Installing production Composer dependencies locally…"
COMPOSER_VENDOR_DIR="$STAGE/vendor" composer install \
  --no-dev --prefer-dist --optimize-autoloader --classmap-authoritative \
  --no-interaction --no-scripts

echo "Creating vendor-production.zip…"
(cd "$STAGE" && zip -qr "$DEPLOYMENT_DIR/vendor-production.zip" vendor)

echo "Preparing public_html package, including current CMS uploads…"
cp -a "$ROOT/public/." "$STAGE/public_html/"
rm -f "$STAGE/public_html/index.php"
rm -rf "$STAGE/public_html/storage"
cp -a "$ROOT/storage/app/public/." "$STAGE/public_html/uploads/"
(cd "$STAGE/public_html" && zip -qr "$DEPLOYMENT_DIR/public-html.zip" .)

rm -rf "$STAGE"

echo
echo "Deployment packages ready:"
du -h "$DEPLOYMENT_DIR/vendor-production.zip" "$DEPLOYMENT_DIR/public-html.zip"
echo "Upload both zip files to the server project deployment/ folder, then run deployment/cpanel-deploy.sh over SSH."
