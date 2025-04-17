import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button } from "react-bootstrap";

function BooksPage() {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        title: "",
        author: "",
        publisher: "",
        publication_date: "",
        number_of_pages: "",
        category_id: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        date: null,
    });
    const [showModal, setShowModal] = useState(false);

    const fetchBooks = async () => {
        const res = await axios.get("http://localhost:8000/api/books");
        setBooks(res.data);
    };

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:8000/api/categories");
        setCategories(res.data);
    };

    useEffect(() => {
        fetchBooks();
        fetchCategories();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`http://localhost:8000/api/books/${editingId}`, form);
        } else {
            await axios.post("http://localhost:8000/api/books", form);
        }
        setForm({
            title: "",
            author: "",
            publisher: "",
            publication_date: "",
            number_of_pages: "",
            category_id: "",
        });
        setEditingId(null);
        setShowModal(false);
        fetchBooks();
    };

    const handleEdit = (book) => {
        setForm(book);
        setEditingId(book.id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/books/${id}`);
        fetchBooks();
    };

    const filteredBooks = books.filter((book) => {
        const matchCategory = filters.category
            ? book.category_id == filters.category
            : true;
        const matchSearch = filters.search
            ? [book.title, book.author, book.publisher]
                .join(" ")
                .toLowerCase()
                .includes(filters.search.toLowerCase())
            : true;
        const matchDate = filters.date?.start && filters.date?.end
            ? new Date(book.publication_date) >= new Date(filters.date.start) &&
            new Date(book.publication_date) <= new Date(filters.date.end)
            : true;

        return matchCategory && matchSearch && matchDate;
    });

    return (
        <div className="container py-5">

            {/* ADD BOOK BUTTON */}
            <div className="mb-4 text-end">
                <Button
                    variant="primary"
                    style={{ backgroundColor: "#8A0E19", borderColor: "#8A0E19" }}
                    onClick={() => {
                        setForm({
                            title: "",
                            author: "",
                            publisher: "",
                            publication_date: "",
                            number_of_pages: "",
                            category_id: "",
                        });
                        setEditingId(null);
                        setShowModal(true);
                    }}
                >
                    Add New Book
                </Button>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton style={{ backgroundColor: "#8A0E19", color: "white" }}>
                    <Modal.Title>{editingId ? "Edit Book" : "Add New Book"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Author"
                                value={form.author}
                                onChange={(e) => setForm({ ...form, author: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                className="form-control"
                                placeholder="Publisher"
                                value={form.publisher}
                                onChange={(e) => setForm({ ...form, publisher: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Pages"
                                value={form.number_of_pages}
                                onChange={(e) => setForm({ ...form, number_of_pages: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <DatePicker
                                selected={form.publication_date ? new Date(form.publication_date) : null}
                                onChange={(date) =>
                                    setForm({ ...form, publication_date: date.toISOString().slice(0, 10) })
                                }
                                className="form-control"
                                placeholderText="Publication Date"
                            />
                        </div>
                        <div className="mb-3">
                            <select
                                className="form-select"
                                value={form.category_id}
                                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-100"
                            style={{ backgroundColor: "#8A0E19", borderColor: "#8A0E19" }}
                        >
                            {editingId ? "Update Book" : "Add Book"}
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* FILTER AND TABLE */}
            <div className="card shadow-sm">
                <div className="card-header" style={{ backgroundColor: "#8A0E19", color: "white" }}>
                    <h5 className="mb-0">Books List</h5>
                </div>
                <div className="card-body">
                    {/* FILTER */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search title, author, publisher"
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            />
                        </div>
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <div className="d-flex gap-2">
                                <DatePicker
                                    selected={filters.date?.start ? new Date(filters.date.start) : null}
                                    onChange={(date) =>
                                        setFilters({
                                            ...filters,
                                            date: { ...filters.date, start: date?.toISOString().slice(0, 10) },
                                        })
                                    }
                                    placeholderText="Start Date"
                                    className="form-control"
                                />
                                <DatePicker
                                    selected={filters.date?.end ? new Date(filters.date.end) : null}
                                    onChange={(date) =>
                                        setFilters({
                                            ...filters,
                                            date: { ...filters.date, end: date?.toISOString().slice(0, 10) },
                                        })
                                    }
                                    placeholderText="End Date"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover mb-0">
                            <thead style={{ backgroundColor: "#8A0E19", color: "white" }}>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Publisher</th>
                                    <th>Date</th>
                                    <th>Pages</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center">
                                            No books found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBooks.map((book) => (
                                        <tr key={book.id}>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.publisher}</td>
                                            <td>{book.publication_date}</td>
                                            <td>{book.number_of_pages}</td>
                                            <td>
                                                {categories.find((cat) => cat.id === book.category_id)?.name ||
                                                    "Unknown"}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleEdit(book)}
                                                    className="btn btn-warning btn-sm me-2"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm("Are you sure you want to delete this book?")) {
                                                            handleDelete(book.id);
                                                        }
                                                    }}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BooksPage;