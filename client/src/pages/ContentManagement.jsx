// ContentManagement.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaImage, FaSave, FaTrash, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import supabase from '../supabaseClient';

function ContentManagement() {
  const token = localStorage.getItem('token');

  const [loading, setLoading] = useState(false);
  const [bannerFile, setBannerFile] = useState(null);

  const [content, setContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
    aboutText: '',
    contactEmail: '',
    bannerImage: ''
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/admin/content',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data.content) {
        setContent(res.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value
    });
  };

  const handleBannerUpload = async () => {
    try {
      if (!bannerFile) {
        toast.error('Please select a banner image');
        return;
      }

      setLoading(true);

      const fileName = `${Date.now()}-${bannerFile.name}`;

      const { error } = await supabase.storage
        .from('content-media')
        .upload(fileName, bannerFile);

      if (error) {
        throw error;
      }

      const { data } = supabase.storage
        .from('content-media')
        .getPublicUrl(fileName);

      setContent({
        ...content,
        bannerImage: data.publicUrl
      });

      toast.success('Banner uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload banner');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.post(
        'http://localhost:5000/api/admin/content',
        content,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success('Content updated successfully');
    } catch (error) {
      toast.error('Failed to save content');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(
        'http://localhost:5000/api/admin/content',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setContent({
        heroTitle: '',
        heroSubtitle: '',
        aboutText: '',
        contactEmail: '',
        bannerImage: ''
      });

      toast.success('Content deleted successfully');
    } catch (error) {
      toast.error('Failed to delete content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="uppercase tracking-[0.4em] text-pink-400 text-sm mb-4">
            CMS Panel
          </p>
          <h1 className="text-5xl font-black mb-4">
            Content Management
          </h1>
        </div>

        <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[32px] p-8 space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">
              Hero Title
            </label>
            <input
              type="text"
              name="heroTitle"
              value={content.heroTitle}
              onChange={handleChange}
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Hero Subtitle
            </label>
            <textarea
              rows="4"
              name="heroSubtitle"
              value={content.heroSubtitle}
              onChange={handleChange}
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              About Section Text
            </label>
            <textarea
              rows="4"
              name="aboutText"
              value={content.aboutText}
              onChange={handleChange}
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={content.contactEmail}
              onChange={handleChange}
              className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              Upload Banner Image
            </label>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="file"
                onChange={(e) => setBannerFile(e.target.files[0])}
                className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl py-4 px-4"
              />

              <button
                onClick={handleBannerUpload}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold flex items-center justify-center gap-2"
              >
                <FaUpload />
                Upload
              </button>
            </div>
          </div>

          {content.bannerImage && (
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <img
                src={content.bannerImage}
                alt="Banner"
                className="w-full h-[250px] object-cover"
              />
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 font-bold flex items-center justify-center gap-2"
            >
              <FaSave />
              Save Changes
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 font-bold flex items-center justify-center gap-2"
            >
              <FaTrash />
              Delete Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentManagement;