import { useState } from "react";
import Swal from "sweetalert2";

const MyGigs = () => {
  const [gigs, setGigs] = useState([
    { id: 1, title: "Plumbing Fix", price: "₦40,000" },
    { id: 2, title: "Electrical Setup", price: "₦75,000" },
  ]);

  const [form, setForm] = useState({ title: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Editing existing gig
      setGigs(
        gigs.map((gig) =>
          gig.id === editingId ? { ...gig, ...form } : gig
        )
      );
      Swal.fire("Updated!", "Gig updated successfully.", "success");
    } else {
      // Adding new gig
      const newGig = {
        id: gigs.length + 1,
        ...form,
      };
      setGigs([...gigs, newGig]);
      Swal.fire("Added!", "Gig added successfully.", "success");
    }

    setForm({ title: "", price: "" });
    setEditingId(null);
  };

  const handleEdit = (gig) => {
    setForm({ title: gig.title, price: gig.price });
    setEditingId(gig.id);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Gigs</h2>

      {/* Gig Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 mb-6 rounded shadow space-y-4">
        <h3 className="font-semibold text-lg">{editingId ? "Edit Gig" : "Add New Gig"}</h3>
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Gig" : "Add Gig"}
        </button>
      </form>

      {/* Gig List */}
      <div className="grid gap-4">
        {gigs.map((gig) => (
          <div key={gig.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{gig.title}</h3>
              <p className="text-gray-600">{gig.price}</p>
            </div>
            <button
              onClick={() => handleEdit(gig)}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGigs;
