# Moise Katemba portfolio

React + TypeScript portfolio with a Firebase-backed, bilingual publishing workspace. Public content is read from Firestore in real time. The admin area is at `/admin`; sign-in is at `/admin/login`.

## Run and verify

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
```

The production Firebase project is `moise-portefolio` (the spelling is intentional). The Firebase web configuration identifies this project; it is not an administrator credential. Never add service-account keys or CLI tokens to this repository.

## Publish to the existing Firebase site

From this repository on a computer already signed in to Firebase:

```sh
npm ci
npm test
npm run build
firebase deploy --only "hosting,firestore:rules" --project moise-portefolio
```

If `firebase` is not installed, use `npx firebase-tools` in its place. If the CLI requests authentication, run `firebase login` locally. Hosting serves `dist`; all routes rewrite to the application, including admin and project detail URLs.

After deployment, open `https://moise-portefolio.web.app/admin/login`. Use the existing owner Firebase Authentication account. The allowlist requires the verified email `mozartkats01@gmail.com`, or an existing Firebase custom claim `admin: true`. Signing in with any other account does not grant editing access. If the owner email is unverified, complete its verification through Firebase Authentication before using the workspace. Account provisioning and custom claims belong in trusted administrator tooling, never the browser application.

In **Overview**, review and select **Publish prepared profile**. This publishes the authored English and French portfolio content in one transaction, and saves a private, immutable copy of any previous documents in `cmsBackups`. Deployment alone does not populate Firestore. The public pages explicitly show unpublished content until all sections exist. Publishing replaces all eight portfolio documents, so use it for initial setup; edit individual sections afterward to retain your later changes.

## Content and editing

The sections use the existing collections and `main` document IDs: `profile`, `biography`, `career`, `education`, `projects`, `skills`, `media`, plus `settings`. English fields are at the document root; French equivalents are under `fr`.

The workspace contains authored content in `src/data/preparedContent.json`, including eight actual projects with their current development stages. Unknown phone numbers and unavailable live links remain empty and are hidden publicly. Decorative numbering and subjective skill percentages are not displayed. The bundled portraits are real existing repository images.

Review both language tabs, edit and save a section to publish it. Collection entries can be added, removed, featured and reordered. The editor synchronizes translated entry IDs and order. Concurrent edits are rejected using document revisions so one session cannot silently overwrite another. Navigating away from unsaved changes requests confirmation.

Website settings control the home headline, guiding statement, portrait, search description and default language. The default language applies until a visitor explicitly chooses a language.

## Image uploads

The supplied images work directly from Hosting without Storage. Uploading additional images requires Firebase Storage to be enabled for this project and its rules to be deployed:

```sh
firebase deploy --only storage --project moise-portefolio
```

Only verified administrators may upload JPEG, PNG or WebP files smaller than 8 MB, under their own UID. Images are public portfolio assets. Uploading prepares a URL; save the edited section to publish it. Existing HTTPS image URLs and bundled `/images/` paths are also supported.

## Security and tests

Public visitors can read only the eight portfolio documents. Writes require the verified owner or an administrator claim. Backups are administrator-only and immutable. Firebase rules are the authorization boundary; the protected React routes are additional user-interface checks.

Content validation tests cover both languages, required text, unique IDs and safe URLs. Firestore rule tests cover public reads, denied anonymous writes, unrelated accounts, unverified owner access, verified administrator writes and private backups.

Run the rules suite with Java available:

```sh
npx firebase-tools emulators:exec --only firestore --project demo-moises-portfolio "npm run test:rules"
```

For local application development with emulators, start Auth, Firestore and Storage using the `demo-moises-portfolio` project and set `VITE_FIREBASE_EMULATORS=true` in a local `.env.local` file. Run the app with Vite. Its development-only proxy routes SDK emulator requests to the configured local ports. Production builds always use the real Firebase project, regardless of this flag.

Validated: production build, ESLint, six content tests, four Firestore emulator rule tests, and browser review of English/French layout and project navigation with prepared content. The authenticated browser save flow and production deployment still require a reachable Firebase session; do not equate the preview with a deployed or seeded site.
