import React from 'react';
import Navigation from '../navigation/Navigation';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#232b39] flex">
      {/* Navigation Sidebar */}
      <Navigation />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-0 md:ml-64 transition-all duration-300 ease-in-out">
        <div className="w-full h-full">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default MainLayout; 