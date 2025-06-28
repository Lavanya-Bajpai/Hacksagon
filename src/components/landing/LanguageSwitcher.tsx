import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode as any);
    setIsOpen(false);
  };

  const currentLanguageInfo = availableLanguages.find(lang => lang.code === currentLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-[#f5e1a0] transition-colors rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#f5e1a0]"
        aria-label={t('change.language')}
      >
        <Globe size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
          <div className="py-1">
            {availableLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between ${
                  currentLanguage === language.code ? 'text-[#f5e1a0] bg-gray-700' : 'text-white'
                }`}
              >
                <span>{language.nativeName}</span>
                {currentLanguage === language.code && (
                  <span className="text-[#f5e1a0]">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 