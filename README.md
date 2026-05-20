# AxleWay 🚗

**Live Site:** [https://axleway.vercel.app](https://axleway.vercel.app)

AxleWay is a premium, full-stack peer-to-peer car sharing marketplace. Built with Next.js, Express, and MongoDB, it connects car owners (hosts) directly with verified renters. The application is styled with a sleek modern design system utilizing a black-accented dark theme, sharp card/button borders, and responsive micro-interactions.

---

## 🌟 Key Features

### 1. User Authentication & Authorization
* **Secure JWT Login:** Cookie-based session validation using secure HTTP-only cookies.
* **Social Login:** Firebase Google Sign-In integration.
* **Security Validation:** Front-end and back-end password complexity validation (min 6 characters, at least one uppercase letter, and one lowercase letter).

### 2. Interactive Fleet Catalog
* **Search & Filters:** Search cars by keyword (triggered on button submit or Enter) and filter by vehicle type (SUV, Sedan, Hatchback, etc.) or availability status.
* **Pagination:** Seamless client-side pagination for browsing large fleets.
* **Real-time Availability:** Shows active status badges (Available / Unavailable) fetched directly from the database.

### 3. Booking & Booking Management
* **Flexible Bookings:** Renters can select booking dates, toggle driver requests, and send custom instructions/notes to owners.
* **My Bookings Dashboard:** Track booking dates, pricing breakdown, driver status, and cancel bookings through confirmation modals.

### 4. Owner Dashboard & Listing Tool (Host Mode)
* **Add a Vehicle:** Owners can list cars by providing vehicle specifications, pickup location, rent price, and descriptions.
* **Cloud File Uploads:** Upload car images directly to the cloud via integrated ImgBB file upload API.
* **My Added Cars:** A complete CRUD interface for managing owned fleet listings, supporting full details updates and listings deletion.

### 5. Premium UI/UX Polish
* **Black Theme Navbar:** A dark-styled navigation bar optimized for visual hierarchy.
* **Sharp Modern Accents:** Border-radiuses set to `rounded-md` / `radius="sm"` to project a premium, state-of-the-art dashboard look.
* **Smooth Footer & Transitions:** Useful Links feature hover-offset transitions with fading direction arrows at the end of the text.
* **Interactive FAQ Accordion:** Interactive React-state Accordion FAQ blocks on the homepage.
* **Trust & Safety Row:** Key indicators row displaying Trust badges (Verified Listings, Secure Renting, Direct Notes, Support).

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React, Tailwind CSS, HeroUI, React Toastify, Firebase Client SDK
* **Backend:** Express.js, JSON Web Tokens (JWT), Cookie Parser, CORS
* **Database:** MongoDB Atlas

---

## 🔑 Environment Variables

Create a `.env.local` file inside the `client` directory and populate it with your Firebase and API configurations:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_IMGBB_KEY=your_imgbb_api_key
```

---

## 🚀 Local Development Setup

To run the client application locally, ensure your backend server is running, and then execute:

```bash
# 1. Install dependencies
npm install

# 2. Run the Next.js development server
npm run dev
```

The Next.js client will start on `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

---

## 📦 Build for Production

To compile the application bundle for production deployment:

```bash
npm run build
npm start
```
