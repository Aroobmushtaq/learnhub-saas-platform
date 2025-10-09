# Backend Documentation (LMS Project)
## Overview

This is the backend for the Learning Management System (LMS).
It provides RESTful APIs for:

- Authentication (Student/Instructor/Admin)

- Course Management

- Lessons & Enrollment

- Secure Payments (Stripe Integration)

- Role-based Access Control (RBAC)

- Instructor Profiles

- Admin Management

## Tech Stack

- Node.js

- Express.js

- MongoDB (Mongoose)

- JWT Authentication

- Stripe Payment Integration

## Setup Instructions

### Clone the repo:
```bash
git clone <https://github.com/Aroobmushtaq/learnhub-saas-platform>
cd backend
```

## Install dependencies:

npm install

Create .env file:
```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/lms
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## Run server:
```bash
npm run dev
```
## Authentication APIs
### Register
```bash
POST /api/auth/register
Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "student"
}
```

## Login

```bash
POST /api/auth/login
```
Returns JWT Token.

## Course APIs
### Instructor

Create Course → ```bash POST /api/courses```

Update Course → ```bash PUT /api/courses/:id```

Delete Course → ```bash DELETE /api/courses/:id```

Get Own Courses → ```bash GET /api/instructor/courses```

Publish/Unpublish Course → ```bash PATCH /api/courses/:id/publish```

### Public

Get All Courses → ```bash GET /api/courses ```

Get Single Course → ```bash GET /api/courses/:id ```

Search & Filter Courses →
```bash GET /api/courses/search?keyword=html&category=programming ```

**Query params:**

- keyword → search by course title/description

- category → filter by category

- sort → sort by createdAt or price

### Admin

Update Any Course → ```bash PUT /api/admin/courses/:id```

Delete Any Course → ```bash DELETE /api/admin/courses/:id```

## Lesson APIs

Add Lesson (Instructor only) → ```bash POST /api/lessons/:courseId```

Get Lessons (Enrolled Students only) → ```bash GET /api/lessons/:courseId```

Update Lesson → ```bash PUT /api/lessons/:lessonId ```

Delete Lesson → ```bash DELETE /api/lessons/:lessonId```

## Enrollment APIs

Enroll after Payment → ```bash Handled via Stripe Webhook ```

My Courses (Student) → ```bash GET /api/my-courses```

Instructor Courses → ```bash GET /api/instructor/courses```

## Payment APIs

Create Checkout Session → ```bash POST /api/payments/create-checkout-session/:courseId```

Webhook (Stripe CLI required for local testing) → ```bash POST /api/payments/webhook```

## Instructor APIs

Profile → ```bash GET /api/instructor/profile```

Course + Students → ```bash GET /api/instructor/course/:id```

## Admin APIs

Get All Users → ```bash GET /api/admin/users ```

Delete User → ```bash DELETE /api/admin/users/:id```

Manage Courses → ```bash Can update/delete/publish any course```



### For Start
```bash
cd backend 
C:\stripe-cli\stripe.exe listen --forward-to "http://localhost:5000/api/payments/webhook"

cd backend
npx nodemon index.js
```
