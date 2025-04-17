# Book List API (Back End)

This is the backend API for the Book List App. It provides endpoints to manage books, including creating, reading, updating, and deleting book records.

## Features

- Add new books to the list.
- Retrieve a list of all books.
- Update book details.
- Delete books from the list.

## Requirements

- PHP >= 7.4
- Composer
- MySQL
- XAMPP or any compatible server environment
- Node Js

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/daffavirdianto/book-list-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd book-list-api
    ```
3. Install dependencies:
    ```bash
    composer install
    ```
4. Set up the database:
    - Create a MySQL database.
    - Configure the `.env` file with your database credentials.
    - Run migrations:
      ```bash
      php artisan migrate
      ```

5. Start the development server:
    ```bash
    php artisan serve
    ```

## API Endpoints

### Books

- **GET** `/api/books` - Retrieve all books.
- **POST** `/api/books` - Add a new book.
- **GET** `/api/books/{id}` - Retrieve a single book by ID.
- **PUT** `/api/books/{id}` - Update a book by ID.
- **DELETE** `/api/books/{id}` - Delete a book by ID.


# Book List App (Front End)

This project is a simple React application built with Vite. It allows users to manage a list of books, showcasing the power of React and Vite's fast development environment.

## Features

- Add, edit, and delete books from the list.
- Responsive design for better user experience on all devices.
- Built-in ESLint configuration for code quality and consistency.

## Getting Started

Follow these steps to set up and run the project locally:

1. Navigate to the project directory:
    ```bash
    cd ../book-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
