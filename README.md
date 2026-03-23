# 🏠 SmartStay Booking Platform

A production-grade accommodation booking platform inspired by Airbnb, built with React + Vite.

## 🚀 Live Demo
[View Live App](#) <!-- Add your Vercel URL here after deployment -->

## 🛠️ Tech Stack
- **React + Vite** — Frontend framework
- **Tailwind CSS** — Styling
- **React Router** — Client-side routing
- **TanStack Query** — Server state & caching
- **Axios** — API requests
- **Zustand** — Booking state management
- **Context API** — Favorites & Filters

## 📁 Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── context/        # Context API providers
├── store/          # Zustand store
├── services/       # Axios API service
└── utils/          # Utility functions
```

## 🔌 API Integration
Uses the Airbnb API via RapidAPI:
- Base URL: `https://airbnb19.p.rapidapi.com`
- Endpoint: `/api/v2/searchPropertyByPlaceId`
- TanStack Query handles caching with 5min staleTime

## ⚙️ Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
   npm install
```
3. Create a `.env` file in the root:
```
   VITE_RAPID_API_KEY=your_api_key_here
```
4. Run the development server:
```bash
   npm run dev
```

## ✨ Features
- 🔍 Search and filter properties
- ❤️ Save favorites (persisted in localStorage)
- 📋 Book properties and manage bookings
- 🔐 Protected routes with authentication
- 📱 Fully responsive design
- ⚡ Cached API calls with TanStack Query