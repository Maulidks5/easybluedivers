#!/usr/bin/env bash
set -euo pipefail

APP_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_PATH="${PUBLIC_PATH:-$HOME/public_html}"
PHP_BIN="${PHP_BIN:-php}"

for command in unzip sed "$PHP_BIN"; do
  command -v "$command" >/dev/null || { echo "Missing required command: $command"; exit 1; }
done

test -f "$APP_PATH/artisan" || { echo "Run this script from the Laravel application deployment folder."; exit 1; }
test -f "$APP_PATH/deployment/vendor-production.zip" || { echo "Missing deployment/vendor-production.zip"; exit 1; }
test -f "$APP_PATH/deployment/public-html.zip" || { echo "Missing deployment/public-html.zip"; exit 1; }
test -f "$APP_PATH/.env" || { echo "Create the production .env file before running this script."; exit 1; }

mkdir -p "$PUBLIC_PATH" "$PUBLIC_PATH/uploads"

# Keep Laravel's public disk pointed at the actual cPanel uploads directory.
# The production env template intentionally contains a placeholder, which must
# never reach Flysystem because it would try to create /home/CPANEL_USERNAME.
if grep -q '^PUBLIC_UPLOADS_PATH=' "$APP_PATH/.env"; then
  sed -i "s|^PUBLIC_UPLOADS_PATH=.*$|PUBLIC_UPLOADS_PATH=$PUBLIC_PATH/uploads|" "$APP_PATH/.env"
else
  echo "PUBLIC_UPLOADS_PATH=$PUBLIC_PATH/uploads" >> "$APP_PATH/.env"
fi

echo "Installing prebuilt public files…"
unzip -oq "$APP_PATH/deployment/public-html.zip" -d "$PUBLIC_PATH"

echo "Installing prebuilt Composer dependencies…"
unzip -oq "$APP_PATH/deployment/vendor-production.zip" -d "$APP_PATH"

echo "Writing cPanel public index.php…"
sed "s|__LARAVEL_APP_PATH__|$APP_PATH|g" "$APP_PATH/deployment/cpanel/index.php.template" > "$PUBLIC_PATH/index.php"

cd "$APP_PATH"

if ! grep -q '^APP_KEY=base64:' .env; then
  echo "Generating the Laravel application key…"
  "$PHP_BIN" artisan key:generate --force
fi

echo "Clearing and rebuilding Laravel file caches…"
"$PHP_BIN" artisan config:clear
"$PHP_BIN" artisan route:clear
"$PHP_BIN" artisan view:clear
"$PHP_BIN" artisan optimize

echo
echo "Deployment complete. Verify https://your-domain/ and /admin/login."
