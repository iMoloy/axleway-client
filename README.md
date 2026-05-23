# AxleWay

Live Site: https://axleway.vercel.app

AxleWay is a full-stack car rental platform where users can explore cars, view details, book vehicles, manage bookings, and maintain owner listings.

## Features

- Browse available and unavailable cars with real-time search by name and filter by car type using MongoDB `$regex`.
- View full car details with daily rent, seats, pickup location, availability status, and booking count.
- Register and login with Firebase email/password or Google authentication, with inline password validation.
- Add new car listings with image upload (imgbb), price, type, location, seats, description, and availability.
- Manage your own listings from My Added Cars — update price, type, location, availability, image, and description via modal; delete with a confirmation modal.
- Track all your bookings with start/end dates, total price, driver request, and status from My Bookings; cancel any booking with a confirmation step.
- Protected private routes using JWT stored in HTTPOnly cookies, verified on every private API call.
- Fully responsive design for mobile, tablet, and desktop screens with dark/light theme toggle.

## Tech Stack

- Vite + React
- React Router DOM
- Tailwind CSS v4
- HeroUI
- Framer Motion
- React Toastify
- Firebase Authentication
- Express.js API
- MongoDB

## Environment Variables

Create `.env.local` from `.env.example` and fill in real values.

```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_IMGBB_KEY=your_imgbb_api_key
```

**On Vercel:** Add these same variables in your Vercel project settings under Environment Variables.
After deploying the server (e.g. on Render), set `VITE_API_URL` to the live server URL.

## Local Development

```
npm install
npm run dev
```

The local client runs on `http://localhost:3000`.

## Build

```
npm run build
```

## About

AxleWay connects trusted car owners with verified renters.
