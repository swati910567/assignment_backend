Introduction

This document provides a comprehensive overview of the Event Management System, including setup instructions, API usage, design decisions, and testing strategies. 
This system supports user registration, event management, notifications, and analytics, designed to demonstrate robust backend development practices.

Setup Instructions

1. Clone the repository from GitHub:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the root directory with the following keys:
   ```
   PORT=5000
   DATABASE_URL=<your-mongo-db-connection-string>
   JWT_SECRET=<your-jwt-secret>
   EMAIL=<your-email>
   EMAIL_PASSWORD=<your-email-password>
   ```
4. Start the server:
   ```
   npm start
   ```
   or for development:
   ```
   npm run dev
   ```

API Usage Documentation

This project includes APIs for user management, event management, notifications, and analytics. Below is an overview of the key endpoints:


1. **User Management**
   - POST `/users/register`: Register a new user.
   - POST `/users/login`: Authenticate and generate a JWT.
   - GET `/users/:id`: Retrieve user details (accessible by user or admin).
   - PUT `/users/:id`: Update user details.
2. **Event Management**
   - POST `/events`: Create a new event (authenticated users only).
   - GET `/events`: Retrieve all events.
   - GET `/events/:id`: Retrieve event details including attendees.
   - PUT `/events/:id`: Update event details (organizer only).
   - DELETE `/events/:id`: Delete an event (organizer only).
3. **Event Registration**
   - POST `/events/:id/register`: Register for an event.
   - DELETE `/events/:id/register`: Cancel event registration.
   - GET `/events/:id/attendees`: Get event attendees.
4. **Notifications**
   - POST `/notifications/send`: Send notifications to event attendees.
5. **Analytics**
   - GET `/analytics/events/popular`: Top 5 most registered events.
   - GET `/analytics/users/active`: Top 5 most active users.
   - GET `/analytics/events/:id/stats`: Event registration statistics.

Design Decisions

1. **Authentication & Authorization**
   - JWT-based token authentication is implemented for security.
   - Role-based access control ensures proper permissions for users, organizers, and admins.

2. **Database Design**
   - MongoDB is used as the database.


3. **Validation & Error Handling**
   - Input validation is performed using middleware.
   - HTTP status codes and detailed error messages ensure better debugging.

4. **Testing**
   - Jest and Supertest are used for testing key endpoints.
   - Unit and integration tests ensure functionality across components.

Testing Strategy

Unit and integration tests are written for five key endpoints:
1. User Registration (`POST /users/register`)
2. User Login (`POST /users/login`)
3. Create Event (`POST /events`)
4. Retrieve Event Attendees (`GET /events/:id/attendees`)
5. Send Notifications (`POST /notifications/send`)

### Example Test: User Registration
```javascript
const request = require('supertest');
const app = require('../app'); // Your Express app instance

describe('User API Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users/register')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'johndoe@example.com');
  });
});
```

Run the tests using:
```bash
npm test
```

