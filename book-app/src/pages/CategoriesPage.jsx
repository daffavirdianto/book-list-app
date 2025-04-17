import { useEffect, useState } from "react";
import axios from "axios";

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/categories");
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:8000/api/categories/${editingId}`, { name });
            } else {
                await axios.post("http://localhost:8000/api/categories", { name });
            }
            setName("");
            setEditingId(null);
            fetchCategories();
        } catch (error) {
            console.error("Error submitting category:", error);
        }
    };

    const handleEdit = (cat) => {
        setName(cat.name);
        setEditingId(cat.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Book Categories</h2>

                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Category name"
                            />
                            <button className="btn btn-primary" type="submit">
                                {editingId ? "Update" : "Add"}
                            </button>
                        </div>
                    </form>

                    <ul className="list-group">
                        {categories.map((cat) => (
                            <li
                                key={cat.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <span>{cat.name}</span>
                                <div>
                                    <button
                                        onClick={() => handleEdit(cat)}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this category?")) {
                                                handleDelete(cat.id);
                                            }
                                        }}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CategoriesPage;