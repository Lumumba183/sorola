# Sorola Africa Safaris Ltd — Website

Static HTML/CSS/JS website for Sorola Africa Safaris Ltd (Nairobi, Kenya).

## Netlify Deployment

This site deploys on Netlify using the checked-in `netlify.toml`:

- **Build command:** `mkdir -p dist && cp *.html dist/ && cp -r assets dist/ && cp robots.txt sitemap.xml dist/`
- **Publish directory:** `dist`
- `dist/` is git-ignored — Netlify creates it during the build.

### Important
1. Leave the Netlify dashboard build settings **blank** (Build command / Publish directory / Base directory) so `netlify.toml` is used (`commandOrigin: config`).
2. The site is plain HTML — no npm, no framework needed.

## Contact Form (Netlify Forms)

The quotation form on `contact.html` uses Netlify Forms (`data-netlify="true"`, honeypot enabled). After the first deploy:

1. In the Netlify dashboard go to **Forms → safari-quote**.
2. Add a notification: **Forms → Form notifications → Add notification → Email notification** → send to **soloraafrica@gmail.com**.
3. Every quotation request will then be emailed to that address automatically. Submissions are also stored in the Netlify dashboard.

## Domain

Placeholder URLs in `robots.txt` and `sitemap.xml` use `https://sorolaafricasafaris.netlify.app`. Update both files once the final domain is known.

## Contact details used on the site

- Phone / WhatsApp: +254 725 713 411 (`wa.me/254725713411`)
- Email: soloraafrica@gmail.com
- Address: P.O. Box 630-00520, Nairobi, Kenya
