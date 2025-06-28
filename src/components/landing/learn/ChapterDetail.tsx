import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, BookOpen, Clock, ArrowLeft, Video } from 'lucide-react';
import { Chapter } from '../../models/Chapter';
import VideoPlayer from './VideoPlayer';
import CollapsibleArticle from './CollapsibleArticle';

interface ChapterDetailProps {
  chapter: Chapter;
  onBack: () => void;
}

const ChapterDetail: React.FC<ChapterDetailProps> = ({ chapter, onBack }) => {
  const [showVideo, setShowVideo] = useState(false);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-[#f5e1a0] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Chapters
        </button>
        
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-[#f5e1a0]/20 p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-[#f5e1a0]/20 text-[#f5e1a0] text-sm font-medium px-3 py-1 rounded-full">
                  Chapter {chapter.order}
                </span>
                <div className="flex items-center text-gray-400 text-sm">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>Learning Module</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-serif font-bold text-white mb-4">
                {chapter.title}
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {chapter.content.substring(0, 200)}...
              </p>

              {/* Video Section - Inline Display */}
              {chapter.hasVideo && chapter.videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/30 border border-[#f5e1a0]/20 rounded-lg p-6 mb-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#f5e1a0] to-[#ffe066] rounded-lg flex items-center justify-center">
                        <Video className="w-6 h-6 text-[#181e26]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {chapter.videoTitle || 'Animated Video'}
                        </h3>
                        {chapter.videoDuration && (
                          <div className="flex items-center text-gray-400 text-xs mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{formatDuration(chapter.videoDuration || 0)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setShowVideo(!showVideo)}
                      className="flex items-center gap-2 bg-[#f5e1a0] text-[#181e26] px-4 py-2 rounded-lg font-semibold hover:bg-[#ffe08a] transition-colors"
                    >
                      {showVideo ? (
                        <>
                          <BookOpen className="w-5 h-5" />
                          Hide Video
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Watch Video
                        </>
                      )}
                    </button>
                  </div>
                  
                  {chapter.videoDescription && (
                    <p className="text-gray-300 text-sm mb-4">
                      {chapter.videoDescription}
                    </p>
                  )}

                  {/* Inline Video Player */}
                  <AnimatePresence>
                    {showVideo && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-black rounded-lg overflow-hidden">
                          <VideoPlayer
                            videoUrl={chapter.videoUrl}
                            title={chapter.videoTitle || chapter.title}
                            description={chapter.videoDescription}
                            onClose={() => setShowVideo(false)}
                            inline={true}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Content Sections */}
              <div className="space-y-6">
                <CollapsibleArticle
                  title="Chapter Overview"
                  shortDescription="Introduction and key concepts covered in this chapter"
                >
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">
                      {chapter.content}
                    </p>
                  </div>
                </CollapsibleArticle>

                <CollapsibleArticle
                  title="Key Points"
                  shortDescription="Important concepts and takeaways from this chapter"
                >
                  <div className="prose prose-invert max-w-none">
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#f5e1a0] rounded-full mt-2 flex-shrink-0"></span>
                        <span>Understanding the fundamental principles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#f5e1a0] rounded-full mt-2 flex-shrink-0"></span>
                        <span>Historical context and significance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-[#f5e1a0] rounded-full mt-2 flex-shrink-0"></span>
                        <span>Practical applications in modern context</span>
                      </li>
                    </ul>
                  </div>
                </CollapsibleArticle>

                <CollapsibleArticle
                  title="Interactive Quiz"
                  shortDescription="Test your understanding with a quick quiz"
                >
                  <div className="text-center py-8">
                    <div className="bg-[#f5e1a0]/10 border border-[#f5e1a0]/20 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-white mb-2">Ready to Test Your Knowledge?</h4>
                      <p className="text-gray-300 mb-4">
                        Take a quiz to reinforce what you've learned in this chapter.
                      </p>
                      <button className="bg-[#f5e1a0] text-[#181e26] px-6 py-2 rounded-lg font-semibold hover:bg-[#ffe08a] transition-colors">
                        Start Quiz
                      </button>
                    </div>
                  </div>
                </CollapsibleArticle>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-black/30 border border-[#f5e1a0]/20 rounded-lg p-6 sticky top-6">
                <h3 className="text-lg font-bold text-white mb-4">Chapter Progress</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Content Read</span>
                    <span className="text-[#f5e1a0] font-semibold">100%</span>
                  </div>
                  
                  {chapter.hasVideo && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Video Watched</span>
                      <span className="text-[#f5e1a0] font-semibold">0%</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Quiz Completed</span>
                    <span className="text-gray-500">Not Started</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <h4 className="text-sm font-semibold text-white mb-3">Estimated Time</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <span>Reading</span>
                      <span>5-8 min</span>
                    </div>
                    {chapter.hasVideo && chapter.videoDuration && (
                      <div className="flex justify-between">
                        <span>Video</span>
                        <span>{formatDuration(chapter.videoDuration || 0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Quiz</span>
                      <span>3-5 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterDetail; 