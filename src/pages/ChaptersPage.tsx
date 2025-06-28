import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '../components/main/MainLayout';
import { Chapter } from '../models/Chapter';
import { chapterService } from '../services';
import { useLanguage } from '../contexts/LanguageContext';

const ChaptersPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      try {
        const data = await chapterService.getOrderedChapters();
        setChapters(data);
      } catch (error) {
        console.error('Failed to fetch chapters', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  // Reset section index and stop speech when opening a new chapter
  useEffect(() => {
    setCurrentSection(0);
    handleStopSpeaking();
  }, [selectedChapter]);

  // Stop speech when changing section
  useEffect(() => {
    handleStopSpeaking();
  }, [currentSection]);

  // Stop speech when modal closes (unmount)
  useEffect(() => {
    return () => {
      handleStopSpeaking();
    };
  }, []);

  const handleReadAloud = (text: string) => {
    const synth = synthRef.current;
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }
    const utter = new window.SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ''));
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    utteranceRef.current = utter;
    synth.speak(utter);
    setIsSpeaking(true);
  };

  const handleStopSpeaking = () => {
    const synth = synthRef.current;
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
    }
  };

  // Helper to split chapter content into sections
  const getSections = (content: string) => {
    return content
      .split(/\s*---+\s*/)
      .map(section => section.trim())
      .filter(section => section.length > 0);
  };

  // Animation class for section transitions
  const sectionAnimationClass = "animate-fade-slide";

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#232b39] via-[#181e26] to-[#1a2233] w-full flex justify-center">
        <div className="relative w-full max-w-7xl overflow-x-hidden">
          {/* Decorative blurred background */}
          <div className="absolute -z-10 top-10 left-1/2 transform -translate-x-1/2 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-[#ffe066]/30 via-[#f5e1a0]/20 to-[#232b39]/10 rounded-full blur-3xl opacity-40" />

          <div className="w-full px-3 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16 sm:pb-20">
            {/* Main header */}
            <header className="mb-6 sm:mb-10 flex flex-col items-center text-center sticky top-0 z-20 bg-transparent pb-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <span className="text-3xl sm:text-5xl">📚</span>
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold text-[#ffe066] drop-shadow-lg font-serif tracking-tight">{t('chapters.title')}</h1>
              </div>
              <p className="text-sm sm:text-lg md:text-2xl text-gray-200 mt-2 max-w-2xl font-medium px-2">
                {t('chapters.subtitle')}
              </p>
            </header>

            {/* Chapters Grid */}
            <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
              {loading ? (
                <div className="text-center text-[#ffe066] py-10">Loading chapters...</div>
              ) : chapters.length === 0 ? (
                <div className="text-center text-white/80 py-10">No chapters available. Please check back later.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {chapters.map((chapter, idx) => (
                    <div
                      key={chapter.id}
                      className="bg-white/10 backdrop-blur-lg border border-[#ffe066]/40 rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 md:p-5 flex flex-col justify-between hover:scale-[1.02] hover:shadow-xl transition-all duration-200 min-h-[160px] sm:min-h-[180px] md:min-h-[200px] group/article relative"
                    >
                      <div className="absolute -top-2 sm:-top-3 left-3 sm:left-4 text-lg sm:text-2xl select-none pointer-events-none">
                        {idx === 0 && '🏛️'}
                        {idx === 1 && '⚖️'}
                        {idx === 2 && '🟨'}
                        {idx === 3 && '🚫'}
                        {idx === 4 && '💼'}
                        {idx === 5 && '❌'}
                        {idx === 6 && '🎖️'}
                        {idx === 7 && '🗣️'}
                        {idx === 8 && '🔒'}
                        {idx === 9 && '❤️'}
                      </div>
                      <div className="flex-1 pt-3 sm:pt-4">
                        <h4 className="text-sm sm:text-lg font-bold text-[#ffe066] font-serif mb-2 drop-shadow-sm group-hover/article:text-white transition-colors leading-tight">
                          {chapter.title}
                        </h4>
                        <p className="text-gray-100 text-xs sm:text-sm min-h-[32px] sm:min-h-[40px] font-medium leading-relaxed">
                          {chapter.content.slice(0, 100)}{chapter.content.length > 100 ? '...' : ''}
                        </p>
                      </div>
                      <button
                        className="mt-2 sm:mt-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#ffe066] text-[#232b39] font-bold rounded-md sm:rounded-lg shadow hover:bg-[#fff3b0] transition-colors text-xs sm:text-sm min-h-[32px] sm:min-h-[36px] touch-manipulation"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedChapter(chapter);
                        }}
                      >
                        Read More
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Modal for full chapter */}
          {selectedChapter && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
              <div className="relative bg-gradient-to-br from-[#232b39] via-[#181e26] to-[#1a2233] border-2 border-[#ffe066]/60 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
                <button
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[#ffe066] bg-[#232b39] hover:bg-[#ffe066] hover:text-[#232b39] focus:ring-4 focus:ring-[#ffe066]/40 transition-all duration-200 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-[#ffe066]/60 z-10"
                  onClick={() => setSelectedChapter(null)}
                  aria-label="Close"
                  tabIndex={0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#ffe066] font-serif mb-3 sm:mb-4 drop-shadow pr-8">{selectedChapter.title}</h3>
                  {(() => {
                    const sections = getSections(selectedChapter.content);
                    const total = sections.length;
                    return (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[#ffe066] font-semibold">
                            Article {currentSection + 1} of {total}
                          </span>
                          <button
                            className={`flex items-center gap-2 px-3 py-1.5 rounded bg-[#ffe066] text-[#232b39] font-bold shadow hover:bg-[#fff3b0] transition-colors text-sm ${isSpeaking ? 'opacity-80' : ''}`}
                            onClick={() => handleReadAloud(sections[currentSection])}
                            aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
                          >
                            {isSpeaking ? (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><rect x="6" y="6" width="12" height="12" rx="2" fill="#232b39"/></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l7 6.5-7 6.5z" /></svg>
                            )}
                            {isSpeaking ? 'Stop' : 'Audio'}
                          </button>
                        </div>
                        <div
                          key={currentSection}
                          className={`prose prose-invert max-w-none text-white text-sm sm:text-base mb-6 ${sectionAnimationClass}`}
                          dangerouslySetInnerHTML={{ __html: sections[currentSection] }}
                        />
                        {total > 1 && (
                          <div className="flex items-center justify-between mt-4 gap-2">
                            <button
                              className="px-4 py-2 rounded bg-[#ffe066] text-[#232b39] font-bold disabled:opacity-50"
                              onClick={() => setCurrentSection((i) => Math.max(0, i - 1))}
                              disabled={currentSection === 0}
                            >
                              Previous
                            </button>
                            <button
                              className="px-4 py-2 rounded bg-[#ffe066] text-[#232b39] font-bold disabled:opacity-50"
                              onClick={() => setCurrentSection((i) => Math.min(total - 1, i + 1))}
                              disabled={currentSection === total - 1}
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
          <style>{`
            .animate-fade-in { animation: fadeIn 0.3s; }
            @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
            .touch-manipulation { touch-action: manipulation; }
            .animate-fade-slide { animation: fadeSlideIn 0.5s cubic-bezier(0.4,0,0.2,1); }
            @keyframes fadeSlideIn {
              from { opacity: 0; transform: translateY(24px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChaptersPage;