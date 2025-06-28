import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { announcementService } from '../../../services';
import { Announcement } from '../../../models/Announcement';

const AnnouncementForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    priority: 'medium',
    isActive: true,
    publishDate: Date.now()
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchAnnouncement();
    }
  }, [id]);

  const fetchAnnouncement = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await announcementService.getById(id);
      if (data) {
        setAnnouncement(data);
      }
    } catch (error) {
      alert('Failed to fetch announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (id && id !== 'new') {
        await announcementService.update(id, announcement);
      } else {
        // Ensure all required fields are present for add operation
        const announcementData: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'> = {
          title: announcement.title || '',
          content: announcement.content || '',
          priority: announcement.priority || 'medium',
          isActive: announcement.isActive ?? true,
          publishDate: announcement.publishDate || Date.now()
        };
        await announcementService.add(announcementData);
      }
      navigate('/admin/announcements');
    } catch (error) {
      alert('Failed to save announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Announcement, value: any) => {
    setAnnouncement(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: 'publishDate' | 'expiryDate', value: string) => {
    const timestamp = value ? new Date(value).getTime() : undefined;
    setAnnouncement(prev => ({ ...prev, [field]: timestamp }));
  };

  if (loading && id !== 'new') {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">
        {id === 'new' ? 'Add New Announcement' : 'Edit Announcement'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={announcement.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            value={announcement.content || ''}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Priority *
          </label>
          <select
            value={announcement.priority || 'medium'}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publish Date *
          </label>
          <input
            type="datetime-local"
            value={announcement.publishDate ? new Date(announcement.publishDate).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleDateChange('publishDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date (Optional)
          </label>
          <input
            type="datetime-local"
            value={announcement.expiryDate ? new Date(announcement.expiryDate).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleDateChange('expiryDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={announcement.isActive || false}
            onChange={(e) => handleChange('isActive', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
            Active
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/announcements')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementForm; 