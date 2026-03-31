// UsersTable.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUsers, FaUserShield, FaUser } from 'react-icons/fa';

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://golf-charity-frontend-r9tw.onrender.com/api/admin/users');
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axios.put(`https://golf-charity-frontend-r9tw.onrender.com/api/admin/users/${id}`, {
        role
      });

      toast.success(`User role updated to ${role}`);
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-cyan-400 text-sm mb-4">
            User Management
          </p>
          <h1 className="text-5xl font-black mb-4">Users Table</h1>
        </div>

        <div className="overflow-x-auto backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="py-4">User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5">
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                        <FaUsers />
                      </div>
                      <div>
                        <h3 className="font-bold">{user.full_name}</h3>
                      </div>
                    </div>
                  </td>

                  <td>{user.email}</td>

                  <td>
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${
                        user.role === 'admin'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-cyan-500/20 text-cyan-300'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleRoleChange(user.id, 'admin')}
                        className="px-4 py-2 rounded-xl bg-purple-600"
                      >
                        <FaUserShield />
                      </button>

                      <button
                        onClick={() => handleRoleChange(user.id, 'user')}
                        className="px-4 py-2 rounded-xl bg-cyan-600"
                      >
                        <FaUser />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;