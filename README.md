# Car Shop Management System

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Python** (version 3.8 or above)
- **Node.js** (version 14 or above)
- **npm** (comes with Node.js)

---

## Running the Backend (Django)

1. **Navigate to the Project Directory**:
   ```bash
   cd car_shop_management
   ```

2. **Create and Activate a Virtual Environment**:
   - On Windows:
     ```bash
     python -m venv env
     env\Scripts\activate
     ```
   - On Mac/Linux:
     ```bash
     python3 -m venv env
     source env/bin/activate
     ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run the Backend Server**:
   ```bash
   python manage.py runserver
   ```
   The backend will be running at `http://127.0.0.1:8000`.

---

## Running the Frontend (React)

1. **Navigate to the `src` Directory**:
   ```bash
   cd src
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Frontend Server**:
   ```bash
   npm start
   ```
   The frontend will be running at `http://localhost:3000`.

---

## Accessing the Application

- Frontend: `http://localhost:3000`
- Backend: `http://127.0.0.1:8000`
