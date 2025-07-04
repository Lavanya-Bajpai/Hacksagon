import React from 'react';
import BattleDecor from './BattleDecor';

const BattleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative min-h-screen font-sans bg-gradient-to-br from-[#232b39] to-[#2d3650] flex items-center justify-center overflow-hidden">
    <BattleDecor />
    {/* Decorative blurred background shape */}
    <div className="absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] bg-gradient-to-br from-[#ffe066]/40 via-[#f5e1a0]/30 to-[#232b39]/10 rounded-full blur-3xl opacity-60" />
    {/* Subtle overlay for depth */}
    <div className="absolute inset-0 -z-10 bg-black/30" />
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-screen">
      {children}
    </div>
  </div>
);

export default BattleLayout; 