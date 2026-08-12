# Production deployment — Easy Blue Divers

This project runs on Laravel 13, React/Inertia and MySQL. Use PHP **8.3 or newer** and ensure these extensions are enabled: `mbstring`, `openssl`, `pdo_mysql`, `xml`, `ctype`, `fileinfo`, `tokenizer`, `curl` and `zip`.

## 1. Prepare cPanel

1. Create a MySQL database and a database user in cPanel, then grant that user **ALL PRIVILEGES** on the database.
2. In cPanel Domains, set `easybluedivers.com` and `www.easybluedivers.com` document root to this project's `public` folder. Do not point the domain to the project root.
3. Enable a valid SSL certificate and force HTTPS in cPanel.
4. Set PHP to 8.3+.

## 2. Upload the application

Upload the project outside `public_html` when your host permits it, for example:

```text
/home/CPANEL_USER/easy-blue-divers-website
```

Then point the domain document root to:

```text
/home/CPANEL_USER/easy-blue-divers-website/public
```

Do not upload `.env`, `storage`, `.git`, `node_modules` or local database files from your computer. Upload the source code, `vendor` from Composer or install it using SSH, and the built `public/build` folder.

## 3. Create the production environment file

Copy `.env.production.example` to `.env` on the server. Fill in the database values, generate `APP_KEY` with the command below, and enter the real password for `booking@easybluedivers.com` only on the server.

```bash
php artisan key:generate --force
```

Never commit or share the `.env` file.

## 4. Install and optimise

From the project folder over SSH:

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan storage:link
php artisan optimize
```

If Node is available on the hosting account, run this before `php artisan optimize`:

```bash
npm ci
npm run build
```

If Node is not available, run `npm run build` locally and upload the resulting `public/build` folder.

Ensure `storage` and `bootstrap/cache` are writable by the web-server user. Typical permissions are directories `775` and files `664`; use your host's recommended owner/group rather than permissive `777`.

## 5. Verify before launch

- Open `https://easybluedivers.com` and every public menu link.
- Log in to `/admin/login`, then log out and confirm Back does not restore admin content.
- Submit a test booking: it must appear in Admin and be delivered to `booking@easybluedivers.com`.
- Submit a test Contact enquiry: it must appear in Admin → Enquiries and be delivered to `info@easybluedivers.com`.
- Upload a test CMS image and confirm it displays from `/storage` over HTTPS.
- Confirm Google Maps, WhatsApp, public contact email, privacy policy and booking terms.

## Updating later

Put the site in maintenance mode only when a database migration is needed:

```bash
php artisan down
php artisan migrate --force
php artisan optimize
php artisan up
```

For content-only changes, use the CMS; no deployment is required.
