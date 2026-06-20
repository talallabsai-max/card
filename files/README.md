# Talal Labs — Digital Card App

## What's in this folder

- `public/index.html` — the public profile microsite (what people see after scanning QR / tapping NFC)
- `public/admin.html` — the login + profile editor dashboard
- `public/firebase-config.js` — your Firebase connection (already filled in with your "Card" project)
- `firestore.rules` — production security rules (deploy this BEFORE July 20, 2026, when test mode expires)

## How it works

1. Someone signs up at `admin.html` with email/password
2. Their Firebase Auth UID becomes their profile ID — automatically, no separate code needed
3. They fill in name, title, bio, photo URL, links, accent color → clicks Save
4. Their public profile lives at `index.html?id=THEIR_UID`
5. `admin.html` shows them a QR code of that exact link, ready to download and print
6. For NFC: write that same URL onto an NFC tag using a free app (NFC Tools — Android/iOS), one-time per physical card
7. Anyone scanning/tapping lands on the live profile — editing it later in admin.html updates it instantly, no reprint needed
8. The page is a PWA — visitors get an "add to home screen" prompt (automatic on Android, manual 2-tap instruction shown on iOS)

## How to actually put this online

You have two options. Recommended: Firebase Hosting, since you're already in the Firebase ecosystem.

### Option A — Firebase Hosting (recommended)

You'll need Node.js installed on your computer first (download from nodejs.org if you don't have it).

1. Open a terminal in this `card-app` folder
2. Run: `npm install -g firebase-tools`
3. Run: `firebase login` (opens browser, log in with the same Google account as your Firebase project)
4. Run: `firebase init hosting`
   - Select "Use an existing project" → choose `card-d8066`
   - Public directory: type `public`
   - Configure as single-page app: **No**
   - Set up automatic builds with GitHub: **No**
   - If it asks to overwrite index.html: **No**
5. Run: `firebase deploy --only hosting`
6. It'll give you a live URL like `https://card-d8066.web.app` — that's your real, working site

After that, admin dashboard is at:
`https://card-d8066.web.app/admin.html`

And profiles are at:
`https://card-d8066.web.app/index.html?id=THEIR_UID`

### Option B — Any static host (Netlify, Vercel, GitHub Pages)

Just upload the contents of the `public/` folder. No build step needed — it's plain HTML/JS.

## Before July 20, 2026 — lock down security

Your Firestore is currently in test mode (anyone can read/write anything). Before it expires:

1. Go to Firebase Console → Firestore Database → Rules tab
2. Replace the contents with what's in `firestore.rules` in this folder
3. Click Publish

This locks it down so each person can only edit their own profile, while anyone can still view any profile (required for the public scan/tap flow to work).

## Known limitations in this first build (by design, can extend later)

- Photo is a URL field, not a file upload — for now, users upload their photo to any image host (imgur, etc.) and paste the link. File upload via Firebase Storage is a clean next addition.
- No custom slugs yet (`yoursite.com/talal`) — only auto-generated UIDs. Custom slugs are a good "premium tier" feature to add later.
- QR codes are generated via a free third-party API (api.qrserver.com) — fine for now, but for production scale you may want to generate QR codes server-side instead.
