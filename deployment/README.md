# cPanel shared-hosting deployment

The server needs only PHP, Git, `unzip` and `sed`. Composer and Node.js run on your local development machine only.

## Local machine — prepare packages

```bash
chmod +x deployment/build-cpanel-package.sh
./deployment/build-cpanel-package.sh
```

This creates two ignored, upload-only files:

- `deployment/vendor-production.zip` — production Composer dependencies.
- `deployment/public-html.zip` — Vite build, public assets and current CMS uploads.

## cPanel/server — initial setup

1. Clone the Git repository outside `public_html`, for example `/home/CPANEL_USERNAME/easy-blue-divers-website`.
2. Copy `.env.production.example` to `.env` in that application folder. Enter the manually created MySQL details and real SMTP mailbox password. Leave `APP_KEY` blank: the deployment script generates it once, if needed.
3. Set `PUBLIC_UPLOADS_PATH` to `/home/CPANEL_USERNAME/public_html/uploads`.
4. Import the database through phpMyAdmin, then run migrations only if the imported database does not already contain the latest migrations.
5. Upload `vendor-production.zip` and `public-html.zip` into the application `deployment/` folder using cPanel File Manager.
6. Run:

```bash
chmod +x deployment/cpanel-deploy.sh
./deployment/cpanel-deploy.sh
```

The script copies public files to `public_html`, unpacks vendor outside the web root, points `public_html/index.php` at the application, generates a missing app key, and optimises Laravel. It never runs Composer or Node.js.

## Uploads

CMS uploads are stored in `public_html/uploads`. The public `/storage/...` URLs are internally mapped to this folder by `public/.htaccess`, so existing website code continues to work. In cPanel MultiPHP INI Editor, set `upload_max_filesize` and `post_max_size` to at least `110M` if you will upload hero videos.

## Later updates

1. Run `git pull` in the application folder.
2. Build packages locally again.
3. Upload the two new zip files.
4. Run `./deployment/cpanel-deploy.sh`.

Keep `.env`, database exports and the two zip files out of Git.
