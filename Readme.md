# Backend Template

This repository contains a structured, production-ready backend project template for a Node.js/Express application. It is designed to save time by providing an organized folder structure so you don't have to create it from scratch every time you start a new backend project.

## Directory Structure

Here is a breakdown of the `src/` folder and why each directory/file is needed:

```text
src/
├── controllers/
├── db/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
├── constants.js
└── index.js
```

### Folders and Their Purpose

*   **`controllers/`**: 
    Contains the core business logic of the application. The controller functions take the incoming request (`req`), process it, interact with the necessary models, and send back a response (`res`). Separating this from routes ensures clean and manageable code.
    
*   **`db/`**: 
    Handles the database connection logic. This is where you configure how your application connects to the database (e.g., MongoDB, PostgreSQL) so that `index.js` can simply import and call the connection function.
    
*   **`middlewares/`**: 
    Functions that run between receiving a route request and calling the actual controller. Used for operations like authentication, route protection, parsing data, logging, or handling file uploads (e.g., `multer`).

*   **`models/`**: 
    Contains database schemas, model definitions, and schema methods/plugins. This is where you define the structure of the data that will be stored in your database (e.g., using Mongoose for MongoDB or Sequelize for SQL).

*   **`routes/`**: 
    Defines the API endpoints and maps them to their respective functions in the `controllers`. It acts as an entry point for specific HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).

*   **`utils/`**: 
    Stores reusable utility methods, custom error handling classes (like `ApiError`), custom response formatters (like `ApiResponse`), wrappers (like `asyncHandler`), and other repeated helper functions.

### Core Files

*   **`app.js`**: 
    Configuration file for the Express application. This is where you define app-level settings, configure CORS, and apply global middlewares (JSON parsing, URL encoding, static folders) before importing and using routes.

*   **`constants.js`**: 
    Stores configuration constants (like the Database Name, Enums or standard default configurations). This helps avoid hardcoding magic strings and numbers throughout the codebase.

*   **`index.js`**: 
    The main entry point of the application. It imports the configured `app`, connects to the database using the function from `db/`, and starts the server listening on a port.

---

**Note**: To ensure that Git tracks these initially empty configuration directories (e.g., `controllers`, `middlewares`, `models`, `routes`), `.gitkeep` files have been added to them. When you start adding your actual files to these directories, the `.gitkeep` files can be safely ignored or removed.
**Note**: credit goes to chai aur code