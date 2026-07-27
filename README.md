# AxleWay

Live Site: https://axleway.vercel.app

AxleWay is a full-stack car rental platform where users can explore cars, view details, book vehicles, manage bookings, and maintain owner listings.

## Features

- **Stripe Payment Checkout**: Secure card checkout using `@stripe/react-stripe-js` with security deposit hold.
- **Double-Booking Prevention**: Real-time date conflict warnings and disabled booking buttons when selected dates overlap with existing reservations.
- **Interactive Pickup Map**: Embedded Leaflet & OpenStreetMap location maps displaying vehicle pickup spots.
- **PDF Invoice Download**: 1-click branded PDF invoice generation using `jsPDF` for rental history.
- **Real-time Search & Filtering**: Explore available cars with live search and filter by type using MongoDB queries.
- **Firebase Auth & JWT Protection**: Secure Google OAuth & Email/Password signin with HTTPOnly cookie verification.
- **Self-Service Owner Garage**: Add, edit, and delete car listings with ImgBB cloud photo uploads.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **Stripe React SDK** (`@stripe/stripe-js`)
- **Leaflet & OpenStreetMap**
- **jsPDF Invoice Engine**
- **HeroUI & Framer Motion**
- **Firebase Authentication**

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.jsx        # Root layout (Navbar, Footer, Providers)
│   ├── page.jsx          # / (Home)
│   ├── not-found.jsx     # 404 page
│   ├── cars/
│   │   ├── page.jsx      # /cars
│   │   └── [id]/page.jsx # /cars/:id
│   ├── login/page.jsx
│   ├── register/page.jsx
│   ├── add-car/page.jsx
│   ├── my-bookings/page.jsx
│   ├── my-added-cars/page.jsx
│   └── my-profile/page.jsx
├── pages/                # Page components (logic lives here)
├── components/           # Shared UI components
├── providers/            # Auth & app providers
└── lib/                  # API helpers, Firebase config
```

## Environment Variables

Create `.env.local` from `.env.example` and fill in real values.

```
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
```

**On Vercel:** Add these same variables in your Vercel project settings under Environment Variables.
Set `NEXT_PUBLIC_API_URL` to `/api` so Next.js rewrites the request to the backend server (configured in `next.config.mjs`).

## Local Development

```bash
npm install
npm run dev
```

The client runs on `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

## About

AxleWay connects trusted car owners with verified renters.
