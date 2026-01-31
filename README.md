# Library System with Geolocation (UCP 1)

Backend for a library management system with book usage tracking and geolocation features.

## Technologies
- Node.js & Express.js
- Sequelize ORM
- MySQL Database

## Setup
1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Configure Database**:
    - Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Update `.env` with your MySQL credentials.
3.  **Database Setup**:
    ```bash
    npx sequelize-cli db:create
    npx sequelize-cli db:migrate
    ```
4.  **Run Application**:
    ```bash
    npm run start
    # or for development
    npm run dev
    ```


## Web Frontend
A simple web interface is included to demonstrate the features.
1.  Start the server: `npm start`
2.  Open **http://localhost:3000** in your browser.
3.  **Features**:
    - **Admin Mode**: Add new books.
    - **User Mode**: Borrow books (automatically sends your Geolocation).
    - **Live Stock**: Updates in real-time after actions.

## API Endpoints

| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| GET | `/api/books` | Get all books | Public |
| GET | `/api/books/:id` | Get book detail | Public |
| POST | `/api/books` | Create book | Admin |
| PUT | `/api/books/:id` | Update book | Admin |
| DELETE | `/api/books/:id` | Delete book | Admin |
| POST | `/api/borrow` | Borrow book | User |

### Authentication Simulation
Authentication is simulated using headers:
- **Admin**: `x-user-role: admin`
- **User**: `x-user-role: user` and `x-user-id: [any_integer]`

### Geolocation Feature
When borrowing a book, the `BorrowLog` table records the user's `latitude` and `longitude`.

## Project Structure
- `controllers/`: Request logic.
- `models/`: Database schema (Book, BorrowLog).
- `routes/`: API route definitions.
- `middleware/`: Auth simulation.
