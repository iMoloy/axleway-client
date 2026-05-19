# AxleWay

Live Site: https://axleway.vercel.app

AxleWay is a full-stack car rental platform where users can explore cars, view details, book vehicles, manage bookings, and maintain owner listings.

## Features

- Browse available and unavailable cars with search and type filtering.
- View full car details with rent, seats, pickup location, availability, and booking action.
- Register and login with Firebase email/password or Google authentication.
- Add new car listings with image, price, type, location, seats, description, and availability.
- Manage owner listings from My Added Cars with update and delete flows.
- Track personal bookings with booking date, total price, driver request, and details link.
- Protected private routes with JWT cookie-ready server integration.
- Responsive design for mobile, tablet, and desktop screens.

## Tech Stack

- Next.js
- React
- Tailwind CSS
- HeroUI
- React Toastify
- Firebase Authentication
- Express.js API
- MongoDB

## Environment Variables

Create `.env.local` from `.env.example` and fill in real values.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Local Development

```bash
npm install
npm run dev
```

The local client runs on `http://localhost:3000`.

## Build

```bash
npm run build
```
