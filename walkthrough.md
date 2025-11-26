# KisanMitra Walkthrough

## Overview
KisanMitra is a web application designed to help farmers dispose of crop residue eco-friendlily by connecting them with machine owners.

## Features
- **Public Landing Page**: Mission statement, impact stats, and role-based login.
- **Farmer Portal**: Manage farms, book stubble collection.
- **Machine Owner Portal**: List machinery, view assigned tasks.
- **Admin Panel**: View all bookings, assign machines to requests.

## How to Run
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Database Setup**:
   ```bash
   npx prisma migrate dev --name init
   ```
3. **Run Development Server**:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

## User Flows

### 1. Farmer Flow
- **Signup**: Go to `/auth/signup?role=farmer`.
- **Dashboard**: View stats.
- **Add Farm**: Click "Add Farm", enter details (e.g., "Village A", "Rice", "5 Acres").
- **Book Collection**: Click "Book Collection", select farm, date, and slot.
- **Status**: View booking status (initially "REQUESTED").

### 2. Machine Owner Flow
- **Signup**: Go to `/auth/signup?role=owner`.
- **Dashboard**: View stats.
- **Add Machine**: Click "Add Machine", enter details (e.g., "Happy Seeder", "Available weekends").
- **View Tasks**: See bookings assigned to your machines.

### 3. Admin Flow
- **Login**: Use an admin account (create one via signup with role ADMIN manually or seed script, or just signup as farmer and manually change role in DB for testing).
  - *Tip*: For testing, you can signup as a user, then use `npx prisma studio` to change their role to `ADMIN`.
- **Dashboard**: View all bookings.
- **Assign Machine**: Select a machine for a "REQUESTED" booking.
- **Verify**: Check Farmer and Owner dashboards to see the status update to "ASSIGNED".

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Database**: SQLite with Prisma
- **Auth**: Custom JWT (Cookies)
