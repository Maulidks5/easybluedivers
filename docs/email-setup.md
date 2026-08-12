# Booking email setup

The website is already connected to send a **new booking request** to the email address in `MAIL_ADMIN_ADDRESS`.
Use the two mailboxes with these roles:

- `booking@easybluedivers.com`: sends website emails and receives new booking notifications.
- `info@easybluedivers.com`: public contact address shown to customers in Website Manager / Settings.

On the production server, add these values to `.env`. Use the password for the **booking mailbox**, not the cPanel login password.

```env
MAIL_MAILER=smtp
MAIL_SCHEME=smtps
MAIL_HOST=mail.easybluedivers.com
MAIL_PORT=465
MAIL_USERNAME=booking@easybluedivers.com
MAIL_PASSWORD=PASTE_THE_BOOKING_MAILBOX_PASSWORD_HERE
MAIL_FROM_ADDRESS=booking@easybluedivers.com
MAIL_FROM_NAME="Easy Blue Divers"
MAIL_ADMIN_ADDRESS=booking@easybluedivers.com
MAIL_CONTACT_ADDRESS=info@easybluedivers.com
```

Then run:

```bash
php artisan optimize:clear
```

Do not commit the real `.env` file or send the mailbox password in chat. If a booking is submitted while mail is temporarily unavailable, the booking is still saved in the CMS and the delivery error is recorded in Laravel's log.
