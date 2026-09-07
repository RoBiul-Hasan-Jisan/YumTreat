# YumTreat Backend

Express + MongoDB (Mongoose) API built to match the YumTreat frontend's
existing API calls exactly — same routes, same request/response shapes,
same field names (`user_id`, `payed`, `isComplete`, etc.) — so the
frontend works against it with no code changes beyond setting the
frontend's `.env`.

## Requirements
- Node.js 18+
- A MongoDB database (local `mongod`, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

## Setup

```bash
cd backend
npm install
cp .env.example .env
# then edit .env — at minimum set MONGO_URI and JWT_SECRET
```

Seed the database with categories, ~50 food items (using the image
filenames already in `frontend/src/assets/`), and two demo accounts:

```bash
npm run seed
```

This creates:
- `admin@yumtreat.com` / `Admin@123` (role: admin)
- `customer@yumtreat.com` / `Customer@123` (role: user)

Run the server:

```bash
npm run dev      # with nodemon, auto-restarts on changes
# or
npm start
```

The API listens on `http://localhost:5000` by default — the same URL
the frontend's dashboard code has hardcoded, and the same URL you
should put in the frontend's `VITE_API_DEV_URL`.

## API overview

| Method | Route                              | Auth      | Notes |
|--------|-------------------------------------|-----------|-------|
| POST   | `/api/auth/sign_up`                 | –         | `{ email, password, cPassword }` |
| POST   | `/api/auth/sign_in`                 | –         | `{ email, password }` |
| GET    | `/api/auth/account`                 | Bearer    | current user profile |
| GET    | `/api/foods`                        | –         | list all foods |
| GET    | `/api/foods/:id`                    | –         | single food |
| POST   | `/api/foods/add`                    | –*        | admin dashboard |
| PUT    | `/api/foods/update/:id`             | –*        | admin dashboard |
| DELETE | `/api/foods/delete/:id`             | –*        | admin dashboard |
| GET    | `/api/categories`                   | –         | list categories |
| POST   | `/api/orders/place`                 | Bearer    | places an order for the current user |
| GET    | `/api/orders/my-orders`             | Bearer    | current user's orders |
| GET    | `/api/orders/admin`                 | –*        | all orders, admin dashboard |
| PATCH  | `/api/orders/update-status/:id`     | –*        | `{ status }`, admin dashboard |
| PATCH  | `/api/orders/cancel/:id`            | Bearer    | customer cancels their own order |
| PATCH  | `/api/orders/complete/:id`          | Bearer    | customer confirms receipt |
| GET    | `/api/reviews/`                     | Bearer    | all reviews |
| GET    | `/api/reviews/user/:userID`         | Bearer    | reviews by a user |
| GET    | `/api/reviews/product/:productID`   | Bearer    | reviews for a food item |
| POST   | `/api/reviews/` or `/add-review`    | Bearer    | add a review |

`Bearer` = send `Authorization: Bearer <token>` from `sign_in`/`sign_up`.

\* These routes are left open (no auth) because that's how the
reference frontend's Admin Dashboard actually calls them — it never
sends a token on these requests. **For a real deployment, protect them**
with the `requireAuth` + `requireAdmin` middleware already included in
`src/middleware/auth.js` (see the `NOTE` comments in `foodRoutes.js`
and `orderRoutes.js` for exactly where to add them), and add real
admin-only access control to the dashboard itself.

## Data model notes

- `Food.category` stores the **category name** (e.g. `"Pizza"`), not an
  id — this matches how the frontend's menu filtering works
  (`food.category.toLowerCase() === selectedCategory.toLowerCase()`).
  If you add foods manually, use the same category names returned by
  `GET /api/categories`.
- `Food.imageUrl` / `Category.img` are filenames (no extension) that
  must exist under `frontend/src/assets/foods/` and
  `frontend/src/assets/image/` respectively — the seed data uses the
  filenames that are already bundled with the frontend.
- `Order.status` is one of `preparing | ready | delivered | cancel`.
  `Order.isComplete` only becomes `true` when the customer confirms
  receipt via `/api/orders/complete/:id` after the order is `delivered`.

## Project structure

```
backend/
  server.js                 entrypoint
  src/
    config/db.js             MongoDB connection
    middleware/auth.js        JWT auth + admin guard
    middleware/errorHandler.js
    models/                   Mongoose schemas
    controllers/               route handlers
    routes/                   route -> controller wiring
    seed/seed.js              demo data
```
