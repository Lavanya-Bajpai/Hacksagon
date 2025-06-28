import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import Login from './components/landing/auth/Login';
import SignUp from './components/landing/auth/SignUp';

import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

// Temporary Main component - replace with your actual main page
const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to LexIQ!</h1>
        <p className="text-xl">You have successfully signed up and are now on the main page.</p>
        <p className="text-lg mt-4">This is where your main application content will go.</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
