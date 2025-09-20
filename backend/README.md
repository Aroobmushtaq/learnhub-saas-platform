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

## Folder Structure
backend/
│── src/
│   ├── models/          # MongoDB Models
│   ├── routes/          # Express Routes
│   ├── controllers/     # Business Logic
│   ├── middleware/      # Auth & Custom Middleware
│── .env                 # Environment Variables
│── index.js             # Entry Point
│── package.json         

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
Returns JWT Token.
```
## Course APIs
Create Course (Instructor only)
```bash
POST /api/courses
```
Get All Courses (Public)
```bash
GET /api/courses
```
Get Single Course
```bash
GET /api/courses/:id
```
Publish/Unpublish
```bash
PATCH /api/courses/:id/publish
```
## Lesson APIs
Add Lesson (Instructor only)
```bash
POST /api/lessons/:courseId
```
Get Lessons (Enrolled Students only)
```bash
GET /api/lessons/:courseId
```
Update Lesson
```bash
PUT /api/lessons/:lessonId
```
Delete Lesson
```bash
DELETE /api/lessons/:lessonId
```
## Enrollment APIs
Enroll after Payment
Handled via Stripe Webhook → Creates enrollment record.

My Courses (Student)
```bash
GET /api/my-courses
```
Instructor Courses
```bash
GET /api/instructor/courses
```
## Payment APIs
Create Checkout Session
```bash
POST /api/payments/create-checkout-session/:courseId
```
Webhook
```bash
POST /api/payments/webhook
```
(Stripe CLI required for local testing)

## Instructor APIs

Profile
```bash
GET /api/instructor/profile
```
Course + Students 
```bash
GET /api/instructor/course/:id
```
## Admin APIs

Get All Users 
```bash
GET /api/admin/users
```
Block/Unblock User
```bash
PATCH /api/admin/users/:id/block
```
Delete User 
```bash
DELETE /api/admin/users/:id
```


