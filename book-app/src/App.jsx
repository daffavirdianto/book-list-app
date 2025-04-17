import { Routes, Route, Navigate } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import CategoriesPage from "./pages/CategoriesPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow px-5">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold me-auto" to="/">
            ListBook
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/books"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-white fw-bold" : "nav-link text-white"
                  }
                >
                  Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? "nav-link text-white fw-bold" : "nav-link text-white"
                  }
                >
                  Categories
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-4 px-3">
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;