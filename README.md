# CV-EDIT (_client_)

[Live](https://cv-edit-server.onrender.com)
_May take some time to "awake" server_

---

_This repo is client-side code for [this app](https://github.com/petalser/cv-edit-server). This README is basically a copy_

## Summary

How frontend dev's CV should look like? Of course, like it is been styled with Bootstrap!
So, here we are!
Please, note that responsibility and accessibility - for obvious reasons - are ignored in this app.
Please, let me now if you find some issues, especially if exported PDF does not interract with some particular Applicant Tracking System or CV parser your company uses.

---

## Features

### For Users

- **Edit any field.** Just click and edit;
- **Save as PDF.** Saves PDF file to your device;
- **Edit entire document or paste your own.** With "Edit JSON" button you can edit more quick (designed mostly for copy/paste). Changing structure of JSON will cause issues;
- **Clipboard JSON.** Copies entire JSON to your clipboard. **Recommended**;
- **Login/Register.** Create account to be able to save different verions of your CV;
- **Save (with oprions):**
  - "Save" button saves current version as LastName (e.g. "Denis Pauna" > "Pauna", "Khalil ibn Khabibi al Mohammad" > "Mohammad").
  - Arrow button opens options. You can save current CV with custom name or overwrite existing record.
- **Access your data.** If you saved something before, you can find it below main part of side panel;
- **Delete records you don't need anymore.** Trash can icon removes record.

---

### For Devs

- **React.js** with dynamic imports and lazy loading;
- **Redux Toolkit** for state management;
- **Bootstrap** for styling;
- Custom hooks, axios-interceptors, etc.

---

## How to run locally

1. Run this command:

```
git clone https://github.com/petalser/cv-edit-mern-client.git
```

2. Navigate to cv-edit-mern-client

```
cd cv-edit-mern-client
```

3. Run

```
npm install
```

4. In order to use client-server interactions, you need to setup server from [this repo](https://github.com/petalser/cv-edit-server) ([branch "server only"](https://github.com/petalser/cv-edit-server/tree/server-only)) and to setup your .env. In project folder you'll find .example. You must create your own .env file and set it up to match .example pattern. For using with SSR use "/" as server url. _And finally_
5. Run

```
npm run start
```
