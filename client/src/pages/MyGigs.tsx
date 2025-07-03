import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import API from "../api";

const MyGigs = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: null,
  });

  const [gigs, setGigs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");
  const token = localStorage.getItem("token");

  // Fetch user's gigs on mount
  useEffect(() => {
    fetchGigs();
  }, []);

  const fetchGigs = async () => {
    try {
      const response = await API.get("/gigs/my-gigs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGigs(response.data.gigs || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch gigs", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price);
    if (form.image) {
      formData.append("image", form.image);
    }

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    try {
      if (editingId) {
        await API.put(`/gigs/${editingId}`, formData, { headers });
        Swal.fire("Updated!", "Gig updated successfully.", "success");
      } else {
        await API.post("/gigs", formData, { headers });
        Swal.fire("Created!", "Gig created successfully.", "success");
      }

      // Reset form
      setForm({
        title: "",
        description: "",
        category: "",
        price: "",
        image: null,
      });
      setPreview("");
      setEditingId(null);
      fetchGigs();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  const handleEdit = (gig) => {
    setForm({
      title: gig.title,
      description: gig.description,
      category: gig.category,
      price: gig.price,
      image: null,
    });
    setPreview(gig.image); // Show current image
    setEditingId(gig.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the gig.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await API.delete(`/gigs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGigs((prev) => prev.filter((gig) => gig.id !== id));
        Swal.fire("Deleted!", "Gig has been deleted.", "success");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete gig", "error");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Edit Gig" : "Create New Gig"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 mb-6 rounded-lg shadow space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Gig Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₦)"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2 rounded"
          />
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Gig" : "Create Gig"}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-4">Your Gigs</h3>
      <div className="space-y-4">
        {gigs.length === 0 && (
          <p className="text-gray-500">You haven't created any gigs yet.</p>
        )}
        {gigs.map((gig) => (
          <div
            key={gig.id}
            className="flex justify-between items-center border rounded-lg p-4 bg-gray-50 shadow-sm"
          >
            <div className="flex gap-4 items-center">
              {gig.image && (
                <img
                  src={gig.image}
                  alt="Gig"
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h4 className="text-lg font-semibold">{gig.title}</h4>
                <p className="text-sm text-gray-600">{gig.description}</p>
                <p className="text-xs text-gray-500">
                  {gig.category} • ₦{gig.price}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(gig)}
                className="text-blue-600 text-sm hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(gig.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGigs;
