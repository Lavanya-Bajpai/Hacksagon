import React, { useState, useEffect } from 'react';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/UserProfile';

const userService = new UserService();

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const allUsers = await userService.getAllUsers();
        console.log('All users fetched:', allUsers);
        
        // Filter out users without valid data and sort by constitutional points
        const validUsers = allUsers.filter(user => user && user.uid);
        const sortedUsers = validUsers.sort((a, b) => {
          const pointsA = a.games?.constitutionChronicles?.constitutionalPoints || 0;
          const pointsB = b.games?.constitutionChronicles?.constitutionalPoints || 0;
          console.log(`User ${a.username || 'Unknown'}: ${pointsA} points, User ${b.username || 'Unknown'}: ${pointsB} points`);
          return pointsB - pointsA;
        });
        
        console.log('Sorted users:', sortedUsers);
        setUsers(sortedUsers);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to load leaderboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#181e26] via-[#232b39] to-[#1a2233]">
        <div className="text-center text-[#f5e1a0] text-xl">Loading Leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#181e26] via-[#232b39] to-[#1a2233]">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-[#f5e1a0] text-gray-900 rounded-lg hover:bg-[#f5e1a0]/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 py-10 md:py-16 bg-gradient-to-br from-[#181e26] via-[#232b39] to-[#1a2233] flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold font-playfair text-[#f5e1a0] mb-10 drop-shadow-lg">Constitution Chronicles Leaderboard</h1>
      <div className="w-full max-w-4xl">
        <div className="bg-black/40 backdrop-blur-md border border-[#f5e1a0]/20 rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-[#f5e1a0]/20">
            <h2 className="text-xl font-bold font-playfair text-[#f5e1a0]">Top Constitutional Champions</h2>
          </div>
          {users.length === 0 ? (
            <div className="p-8 text-center text-white/60">
              <p className="text-lg mb-2">No players yet!</p>
              <p className="text-sm">Play Constitution Chronicles to appear on the leaderboard.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#f5e1a0]/20">
              {users.map((user, index) => {
                const username = user.username || 'Anonymous User';
                const level = user.level || 1;
                const points = user.games?.constitutionChronicles?.constitutionalPoints || 0;
                
                return (
                  <div key={user.uid || index} className="p-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white font-bold text-lg border-2 border-[#f5e1a0]/30">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-[#f5e1a0]">{username}</div>
                        <div className="text-sm text-white/60">Level {level}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">
                        {points}
                      </div>
                      <div className="text-sm text-white/60">Constitutional Points</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 