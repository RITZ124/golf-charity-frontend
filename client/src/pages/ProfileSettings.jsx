import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfileSettings() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.put(
        `https://golf-charity-frontend-r9tw.onrender.com/api/auth/update-profile/${user.id}`,
        formData
      );

      localStorage.setItem(
        'user',
        JSON.stringify({
          ...user,
          ...formData
        })
      );

      toast.success('Profile updated successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Profile Settings</h1>

        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <button onClick={handleUpdateProfile}>
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileSettings;