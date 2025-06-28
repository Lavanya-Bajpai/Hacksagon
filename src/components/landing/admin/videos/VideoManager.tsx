import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Clock, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import { Chapter } from '../../../models/Chapter';
import { chapterService } from '../../../services';

const VideoManager: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'with-video' | 'without-video'>('all');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    setLoading(true);
    try {
      const data = await chapterService.getAll(true);
      setChapters(data);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredChapters = chapters.filter(chapter => {
    const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (chapter.videoTitle && chapter.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'with-video' && chapter.hasVideo) ||
                         (filter === 'without-video' && !chapter.hasVideo);
    
    return matchesSearch && matchesFilter;
  });

  const formatDuration = (seconds: number) => {
    if (!seconds) return '-';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleEditVideo = (chapter: Chapter) => {
    // Navigate to chapter edit page
    window.location.href = `/admin/chapters/edit/${chapter.id}`;
  };

  const handleDeleteVideo = async (chapter: Chapter) => {
    if (!chapter.id) return;
    if (!window.confirm(`Remove video from chapter "${chapter.title}"?`)) return;
    
    try {
      const updatedChapter = {
        ...chapter,
        hasVideo: false,
        videoUrl: '',
        videoTitle: '',
        videoDescription: '',
        videoDuration: 0,
      };
      await chapterService.update(chapter.id, updatedChapter);
      setChapters(chapters.map(c => c.id === chapter.id ? updatedChapter : c));
    } catch (error) {
      console.error('Error removing video:', error);
      alert('Failed to remove video');
    }
  };

  const stats = {
    total: chapters.length,
    withVideo: chapters.filter(c => c.hasVideo).length,
    withoutVideo: chapters.filter(c => !c.hasVideo).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-[#f5e1a0]/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
              <Video className="w-8 h-8 text-[#f5e1a0]" />
              Video Management
            </h2>
            <p className="text-gray-400 mt-1">Manage animated videos for learning chapters</p>
          </div>
          <a
            href="/admin/chapters/new"
            className="flex items-center gap-2 bg-[#f5e1a0] hover:bg-[#ffe08a] text-[#181e26] px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Chapter with Video
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 border border-[#f5e1a0]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-sm text-gray-400">Total Chapters</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 border border-[#f5e1a0]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Play className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.withVideo}</p>
                <p className="text-sm text-gray-400">With Videos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 border border-[#f5e1a0]/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stats.withoutVideo}</p>
                <p className="text-sm text-gray-400">Need Videos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-[#f5e1a0]/20 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search chapters or video titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/50 border border-gray-600 pl-10 pr-4 py-2 rounded-lg text-white placeholder-gray-400 focus:border-[#f5e1a0] focus:outline-none transition-colors"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[#f5e1a0] text-[#181e26]'
                  : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('with-video')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'with-video'
                  ? 'bg-[#f5e1a0] text-[#181e26]'
                  : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
            >
              With Video
            </button>
            <button
              onClick={() => setFilter('without-video')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'without-video'
                  ? 'bg-[#f5e1a0] text-[#181e26]'
                  : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
            >
              Need Video
            </button>
          </div>
        </div>
      </div>

      {/* Video List */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-[#f5e1a0]/20 p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-[#f5e1a0]/30 border-t-[#f5e1a0] rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-400">Loading chapters...</p>
          </div>
        ) : filteredChapters.length === 0 ? (
          <div className="text-center py-8">
            <Video className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No chapters found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredChapters.map((chapter) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/30 border border-[#f5e1a0]/20 rounded-lg p-6 hover:border-[#f5e1a0]/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#f5e1a0]/20 text-[#f5e1a0] text-xs font-medium px-2 py-1 rounded">
                        Chapter {chapter.order}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        chapter.isActive 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {chapter.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{chapter.title}</h3>
                    
                    {chapter.hasVideo ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <Video className="w-4 h-4 text-green-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">
                              {chapter.videoTitle || 'Animated Video'}
                            </p>
                            {chapter.videoDuration && (
                              <div className="flex items-center text-gray-400 text-xs mt-1">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>{formatDuration(chapter.videoDuration || 0)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {chapter.videoDescription && (
                          <p className="text-sm text-gray-400">{chapter.videoDescription}</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-yellow-400">No video assigned</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditVideo(chapter)}
                    className="flex items-center gap-2 px-3 py-2 bg-[#f5e1a0] hover:bg-[#ffe08a] text-[#181e26] rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    {chapter.hasVideo ? 'Edit Video' : 'Add Video'}
                  </button>
                  
                  {chapter.hasVideo && (
                    <button
                      onClick={() => handleDeleteVideo(chapter)}
                      className="flex items-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Video
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoManager; 