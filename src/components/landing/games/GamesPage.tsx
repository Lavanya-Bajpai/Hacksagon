import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const games = [
  {
    path: '/games/article-hunt',
    title: 'Article Hunt',
    description: 'Test your knowledge by matching articles to their descriptions.',
    icon: (
      <svg className="h-8 w-8 md:h-10 md:w-10 text-[#f5e1a0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
    ),
  },
  {
    path: '/games/lexiq-word',
    title: 'LexIQ Word Game',
    description: 'Sharpen your vocabulary with fun and challenging word puzzles.',
    icon: (
      <svg className="h-8 w-8 md:h-10 md:w-10 text-[#f5e1a0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" /></svg>
    ),
  },
  {
    path: '/games/timeline-challenge',
    title: 'Timeline Challenge',
    description: 'Arrange key events in the correct order and master the timeline.',
    icon: (
      <svg className="h-8 w-8 md:h-10 md:w-10 text-[#f5e1a0]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M4 10h16" /></svg>
    ),
  },
  {
    path: '/games/constitution-chronicles',
    title: 'Constitution Chronicles',
    description: 'An interactive narrative adventure where your choices shape the story and test your understanding of the Constitution.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-10 md:h-10">
        <rect x="5" y="9" width="30" height="20" rx="6" fill="#f5e1a0" stroke="#bfa77a" strokeWidth="2"/>
        <rect x="10" y="13" width="9" height="14" rx="3" fill="#fffbe6" stroke="#e2d8c0" strokeWidth="1"/>
        <rect x="23" y="13" width="9" height="14" rx="3" fill="#fffbe6" stroke="#e2d8c0" strokeWidth="1"/>
        <path d="M15 18 Q20 23 25 18" stroke="#bfa77a" strokeWidth="1.2" fill="none"/>
        <path d="M15 23 Q20 28 25 23" stroke="#bfa77a" strokeWidth="1.2" fill="none"/>
        <g>
          <rect x="30" y="30" width="7" height="2" rx="1" fill="#C19A6B"/>
          <rect x="34" y="31" width="2" height="6" rx="1" fill="#C19A6B"/>
          <ellipse cx="35" cy="37" rx="2" ry="1.5" fill="#C19A6B" fillOpacity="0.7"/>
        </g>
      </svg>
    ),
  }
];

const GamesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-16 bg-gradient-to-br from-[#181e26] via-[#232b39] to-[#1a2233] flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-playfair text-[#f5e1a0] mb-4 md:mb-6 drop-shadow-lg text-center">Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full max-w-7xl justify-items-center">
        {games.map((game) => (
          <Link
            to={game.path}
            key={game.path}
            className="group bg-white/5 border border-[#f5e1a0]/20 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 flex flex-col items-center hover:bg-[#f5e1a0]/10 hover:scale-105 transition-all duration-300 cursor-pointer w-full max-w-sm"
          >
            <div className="mb-3 md:mb-4 bg-[#f5e1a0]/10 rounded-full p-3 md:p-4 flex items-center justify-center">
              {game.icon}
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#f5e1a0] mb-2 font-playfair group-hover:underline text-center">{game.title}</h2>
            <p className="text-white/80 text-center text-sm md:text-base mb-2 leading-relaxed">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GamesPage; 