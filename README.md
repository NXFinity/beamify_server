# Beamify Server

Beamify Server is a robust, extensible backend API designed to power the Beamify web application platform. Built with Node.js and Express, it provides secure, scalable, and modular services for user management, authentication, gamification, real-time features, and third-party integrations.

## Features

- Comprehensive user and role management (RBAC)
- Secure authentication (JWT, Passport.js, PKCE)
- Gamification system (points, levels, crystals, rewards, badges, activities)
- Real-time notifications and events (Socket.IO)
- Admin system with role/permission seeding and management
- Social networking APIs (posts, comments, likes, etc.)
- Media streaming and file handling
- Stripe integration for payments
- Modular, service-oriented architecture
- Swagger/OpenAPI documentation for all endpoints

## Directory Structure

- `src/`
  - `api/` — Main API modules (user, gamify, social, media, etc.)
    - `gamify/` — Gamification controllers, routes, services, gateways
    - `user/` — User controllers, routes, services
  - `admin/` — Admin controllers, routes, services (roles, permissions, gamify, etc.)
  - `security/` — Auth, JWT, PKCE, RBAC middleware
  - `swagger/` — Swagger/OpenAPI setup
  - `db/` — Database connection and models
  - `utils/` — Utility functions
- `bin/`, `www/` — Server entry points

## Setup & Configuration

1. **Clone the repo:**
   ```bash
   git clone <repo-url>
   cd beamify_server
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment:**
   - Copy `.env.development` to `.env` and update values as needed (JWT secret, DB URI, etc.)
4. **Run the server:**
   ```bash
   npm start
   ```
5. **Seed roles/permissions:**
   - On first run, the system seeds roles and permissions from `src/admin/role/assets/`.

## Authentication & Security

- JWT-based authentication (with Passport.js)
- PKCE utilities for secure OAuth flows
- Role-based access control (RBAC) with middleware
- Admin lockdown: All endpoints except `/auth/init-admin` are locked until an admin is created

## API Documentation

- **Swagger/OpenAPI:**
  - All endpoints are documented and accessible at `/api-docs` when the server is running.
  - Swagger JSONs are in `src/api/*/*Swagger.json` and `src/admin/*Swagger.json`.

## Gamification System

- **Entities:** Points, levels, exp, crystals, rewards, badges, activities
- **Endpoints:**
  - Public and private endpoints for viewing gamify profiles, activities, badges, and rewards
  - Admin endpoints for managing gamification data
- **Real-time Gateway:**
  - Socket.IO gateway (`gamifyGateway.js`) for real-time notifications (points, levels, rewards, etc.)
  - Relay gateways for activities, badges, and rewards

## Admin System

- Role and permission seeding from JSON assets
- Full CRUD for roles, permissions, users, and gamification entities
- Admin-only endpoints protected by RBAC
- Audit and error logging

## Contributing & Testing

- PRs and issues welcome!
- Automated tests recommended (not included by default)
- See Swagger docs for endpoint testing

## License

MIT
