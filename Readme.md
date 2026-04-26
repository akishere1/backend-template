# Production-Ready Backend Template

This repository provides a strongly structured, production-ready backend boilerplate for Node.js/Express applications. It goes beyond simple CRUD functionality by integrating core production concerns such as logging, security, graceful shutdown, environment validation, and Docker support right out of the box.

## Core Features Included

- **Robust Architecture**: Separation of concerns utilizing Controllers, Services, Repositories, Models, and Routes.
- **Environment Management**: Strict environment variable validation using `Zod` (`src/config/env.js`), so your app fails fast if configured incorrectly.
- **Logging System**: Centralized logging using `Winston` with console formatting and file transports (`error.log`, `combined.log`). Request logging powered by `Morgan`.
- **Security Middlewares**: Secure HTTP headers via `Helmet`, NoSQL injection prevention via `express-mongo-sanitize`, and API rate limiting via `express-rate-limit`.
- **Centralized Error Handling**: Global error catching middleware that translates errors into standard `ApiError` format and returns a predictable `ApiResponse`.
- **Health Check API**: Dedicated `/api/v1/healthcheck` endpoint to verify database connectivity and server uptime.
- **Graceful Shutdown**: Properly handles `SIGINT` and `SIGTERM` signals, closing the HTTP server and database connections safely before exiting.
- **Docker Support**: Built-in multi-stage `Dockerfile`, `.dockerignore`, and a `docker-compose.yml` for local development.

## Directory Structure

Here is a breakdown of the `src/` folder:

```text
src/
├── config/        # Environment and configuration loaders (env.js)
├── controllers/   # Request/Response handling logic
├── db/            # Database connection initialization
├── middlewares/   # Custom Express middlewares (error handling, file upload)
├── models/        # Database schemas (Mongoose)
├── repositories/  # Data access layer abstraction (optional but recommended)
├── routes/        # API endpoint definitions mapping to controllers
├── services/      # Core business logic abstracted from controllers
├── utils/         # Reusable utilities (logger, API response/error classes)
├── validations/   # Request payload validation schemas (Zod/Joi)
├── app.js         # Express app setup and middleware integration
├── constants.js   # Project-wide constants (DB name, etc.)
└── index.js       # Main entry point, DB connection, server start
```

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Standard API Response

All API endpoints return data in a standardized format:

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Success message",
  "success": true
}
```

## How to Use & Refactor This Template

This template is designed to scale. When building a new feature (e.g., a `User` module), follow this flow to keep the code clean and maintainable:

1. **Define the Model (`src/models/`)**
   Create a Mongoose schema for your entity (e.g., `user.model.js`).
2. **Create Validations (`src/validations/`)**
   Use `Zod` or `Joi` to define exactly what the request body/params should look like (e.g., `user.validation.js`).
3. **Write the Business Logic (`src/services/` & `src/repositories/`)**
   *(Optional but recommended for large apps)*: Keep controllers thin. Write your database queries in the repository and your business rules in the service layer.
4. **Build the Controller (`src/controllers/`)**
   Create `user.controller.js`. Use the `asyncHandler` utility to wrap your functions so you don't have to write `try-catch` blocks everywhere. Use `ApiError` for throwing errors and `ApiResponse` for sending success responses.
5. **Define the Routes (`src/routes/`)**
   Create `user.routes.js`. Import your controller functions and apply any necessary middlewares (like authentication or file uploads).
6. **Register the Routes (`src/app.js`)**
   Finally, import your new route in `app.js` and mount it (e.g., `app.use("/api/v1/users", userRouter);`).

By adhering to this structure, your codebase will remain predictable, making it incredibly easy for any developer to jump in and refactor code without hunting down scattered logic.

## Docker

To run the application using Docker Compose (includes MongoDB):

```bash
docker-compose up --build
```

---

**Note**: To ensure that Git tracks these initially empty configuration directories (e.g., `controllers`, `services`, `repositories`), `.gitkeep` files have been added to them. When you start adding your actual files to these directories, the `.gitkeep` files can be safely ignored or removed.

**Credits**: Originally inspired by Chai aur Code, hardened with production-grade practices.