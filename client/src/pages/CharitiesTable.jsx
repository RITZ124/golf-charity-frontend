// CharitiesTable.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaHeart } from 'react-icons/fa';

function CharitiesTable() {
  const [charities, setCharities] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    try {
      const res = await axios.get('https://golf-charity-frontend-r9tw.onrender.com/api/charities');
      setCharities(res.data);
    } catch (error) {
      toast.error('Failed to load charities');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCharity = async () => {
    try {
      await axios.post('https://golf-charity-frontend-r9tw.onrender.com/api/charities', formData);

      toast.success('Charity added successfully');

      setFormData({
        name: '',
        description: '',
        category: ''
      });

      fetchCharities();
    } catch (error) {
      toast.error('Failed to add charity');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://golf-charity-frontend-r9tw.onrender.com/api/charities/${id}`);
      toast.success('Charity deleted successfully');
      fetchCharities();
    } catch (error) {
      toast.error('Failed to delete charity');
    }
  };

  const handleEdit = (charity) => {
    setEditingId(charity.id);

    setFormData({
      name: charity.name,
      description: charity.description,
      category: charity.category
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://golf-charity-frontend-r9tw.onrender.com/api/charities/${editingId}`,
        formData
      );

      toast.success('Charity updated successfully');

      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        category: ''
      });

      fetchCharities();
    } catch (error) {
      toast.error('Failed to update charity');
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-pink-400 text-sm mb-4">
            Charity Management
          </p>
          <h1 className="text-5xl font-black mb-4">Charities Table</h1>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 mb-10">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="name"
              placeholder="Charity Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-cyan-400"
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-cyan-400"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4 outline-none focus:border-cyan-400"
            />
          </div>

          <button
            onClick={editingId ? handleUpdate : handleAddCharity}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-bold flex items-center gap-3"
          >
            <FaPlus />
            {editingId ? 'Update Charity' : 'Add Charity'}
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <div
              key={charity.id}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[28px] p-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mb-6">
                <FaHeart className="text-white text-2xl" />
              </div>

              <h2 className="text-2xl font-bold mb-4">{charity.name}</h2>
              <p className="text-gray-400 mb-4">{charity.description}</p>

              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm mb-6">
                {charity.category}
              </span>

              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(charity)}
                  className="flex-1 py-3 rounded-2xl bg-yellow-500"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => handleDelete(charity.id)}
                  className="flex-1 py-3 rounded-2xl bg-red-500"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CharitiesTable;