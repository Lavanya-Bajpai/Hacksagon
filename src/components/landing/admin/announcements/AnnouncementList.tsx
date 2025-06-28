import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { announcementService } from '../../../services';
import { Announcement } from '../../../models/Announcement';
import AdminTable from '../common/AdminTable';

const AnnouncementList: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await announcementService.getAll(true);
      setAnnouncements(data);
    } catch (error) {
      alert('Failed to fetch announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (announcement: Announcement) => {
    if (!announcement.id) return;
    if (!window.confirm(`Delete announcement "${announcement.title}"?`)) return;
    try {
      await announcementService.delete(announcement.id);
      setAnnouncements(announcements.filter(a => a.id !== announcement.id));
    } catch (error) {
      alert('Failed to delete announcement');
    }
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' as keyof Announcement },
    { header: 'Content', accessor: (a: Announcement) => a.content.substring(0, 50) + (a.content.length > 50 ? '...' : '') },
    { header: 'Priority', accessor: (a: Announcement) => (
      <span className={`font-medium ${getPriorityColor(a.priority)}`}>
        {a.priority.charAt(0).toUpperCase() + a.priority.slice(1)}
      </span>
    ) },
    { header: 'Status', accessor: (a: Announcement) => a.isActive ? 'Active' : 'Inactive' },
    { header: 'Published', accessor: (a: Announcement) => new Date(a.publishDate).toLocaleDateString() },
    { header: 'Expires', accessor: (a: Announcement) => a.expiryDate ? new Date(a.expiryDate).toLocaleDateString() : 'Never' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Announcements</h2>
        <Link to="/admin/announcements/new" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
          Add New Announcement
        </Link>
      </div>
      <AdminTable<Announcement>
        data={announcements}
        columns={columns}
        keyField="id"
        loading={loading}
        baseEditUrl="/admin/announcements"
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AnnouncementList; 