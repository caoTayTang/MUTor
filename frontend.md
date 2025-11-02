# Frontend Folder Structure

This document explains the frontend folder structure of the MuTor project. The frontend is built using **React** and **Tailwind CSS**.

```

./frontend

```
Contains the entire frontend project.

---

## **Main Folders and Files**

### 1. `src/`
This is where most of the source code lives.

- `App.js` – The root React component that sets up routes, navigation, and high-level state.
- `index.js` – Entry point of the app; renders `App.js` into the DOM.
- `index.css` & `App.css` – Global and app-specific styles.
- `reportWebVitals.js` – Optional performance monitoring for React apps.
- `setupTests.js` & `App.test.js` – For unit testing components using Jest.

#### **Subfolders**
- `api/`
  - `api.js` – Handles API calls to the backend (FastAPI).
- `assets/`
  - Contains images, logos, and static files used in the frontend.
  - Example: `slbk.jpg`, `logoBK.png`.
- `models/`
  - `Course.js` – Defines frontend data structures for courses (for example, to use with state management or ViewModels).
- `viewmodels/`
  - `CourseViewModel.js`, `NotificationViewModel.js` – Implements the **MVVM pattern**, bridging backend API data with React views.
- `views/`
  - Contains **pages** and **components**.
  - `components/` – Reusable UI components like `CourseCard.js` or `Header.js`.
  - `pages/` – Full pages/screens like `LoginPage.js`, `Dashboard.js`, `CourseDetail.js`, `CreateCourse.js`.

---

### 2. `public/`
Contains static files served as-is, without processing by Webpack:

- `index.html` – The main HTML file React injects components into.
- `logo192.png`, `logo512.png` – App icons.
- `favicon.ico` – Browser tab icon.
- `manifest.json` – Defines metadata for Progressive Web App (PWA) support.
- `robots.txt` – Search engine instructions.

---

### 3. Config and Dependencies
- `.gitignore` – Lists files/folders Git should ignore.
- `package.json` – Project dependencies, scripts, and metadata.
- `package-lock.json` – Exact dependency versions used.
- `tailwind.config.js` – Tailwind CSS configuration.
- `postcss.config.js` – PostCSS setup for Tailwind.

---

### **Summary**
- `views` → UI components and pages.
- `viewmodels` → Handles data and logic for views (MVVM pattern).
- `models` → Defines frontend data structures.
- `api` → Handles backend communication.
- `assets` → Images and static assets.
- `public` → Static files served directly.
```

# Backend Folder Structure

This document explains the backend folder structure of the MuTor project. The backend is built using **FastAPI** and **SQLAlchemy**.

```

./backend

```
Contains the entire backend project.

---

## **Main Folders and Files**

### 1. `app/`
Contains the core backend logic.

#### **Subfolders**
- `api/` – Defines API endpoints (routers):
  - `courses.py` – Handles `/courses` related routes (list, enroll, create, etc.).
  - `notifications.py` – Handles `/notifications` routes.
  - `__init__.py` – Initializes the API package.
- `services/` – Business logic and interaction with models:
  - `course_service.py` – Core logic for course operations.
  - `__init__.py` – Initializes the services package.
- `models/` – Database models (tables) using SQLAlchemy:
  - `course.py` – Course table definition.
  - `notification.py` – Notification table definition.
- `database/` – Database connection and session management:
  - `session.py` – Creates SQLAlchemy session objects for querying.
  - `__init__.py` – Initializes the database package.
- `core/` – Core configuration:
  - `config.py` – App settings (e.g., database URL).
  - `__init__.py` – Initializes the core package.
- `tests/` – Unit tests for backend:
  - `__init__.py` – Test package initialization.

---

### 2. Root Files
- `main.py` – Entry point; initializes FastAPI app and includes routers.
- `__pycache__/` – Python cache files (auto-generated).

---

### **Summary**
- `api` → Route definitions, exposed to frontend.
- `services` → Business logic, communicates with models and database.
- `models` → Database table definitions.
- `database` → Session and connection management.
- `core` → Configuration and app settings.
- `tests` → Unit tests.

---

### **CORS Setup**
Frontend React app runs on `localhost:3000`, backend FastAPI on `localhost:8000`. CORS middleware is configured to allow frontend requests.
```

---

If you want, I can **also draw a small visual tree diagram** for both frontend and backend so the team can quickly see the hierarchy at a glance. This often makes it **much easier for non-SE teammates to understand**.

Do you want me to do that too?
