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

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **HeroUI**
- **Framer Motion**
- **React Toastify**
- **Firebase Authentication**
- **Express.js API**
- **MongoDB**

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
