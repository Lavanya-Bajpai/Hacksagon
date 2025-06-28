import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { BattleData } from './types';
import BattleAvatar from './BattleAvatar';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  battle: BattleData;
  currentUser: any;
}

const BattleLobby = ({ battle, currentUser }: Props) => {
  const [showLoader, setShowLoader] = useState(false);
  const [copied, setCopied] = useState(false);
  const { userData } = useAuth();

  // Join as user2 if not already in room
  useEffect(() => {
    if (!battle.players.user2 && battle.players.user1.uid !== currentUser.uid) {
      // Use photoURL from Firebase User or from userData, or fallback to null
      const photoURL = currentUser.photoURL || (userData as any)?.photoURL || null;
      
      updateDoc(doc(db, 'battles', battle.id), {
        'players.user2': {
          uid: currentUser.uid,
          displayName: currentUser.displayName || 'Anonymous',
          photoURL: photoURL,
          score: 0,
          answers: [],
          ready: false
        }
      });
    }
  }, [battle, currentUser, userData]);

  useEffect(() => {
    // If the battle status changes, hide the loader
    if (battle.status !== 'waiting') setShowLoader(false);
  }, [battle.status]);

  // Ready up
  const handleReady = async () => {
    const userKey = battle.players.user1.uid === currentUser.uid ? 'user1' : 'user2';
    await updateDoc(doc(db, 'battles', battle.id), {
      [`players.${userKey}.ready`]: true
    });
    setShowLoader(true);
  };

  if (showLoader) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        {/* 3D Cube Loader */}
        <div className="cube-loader mb-8 sm:mb-12">
          <div className="cube">
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face right"></div>
            <div className="face left"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#ffe066] drop-shadow mb-3 sm:mb-4 text-center">Preparing Battle Room...</div>
        <div className="text-gray-300 text-base sm:text-lg lg:text-xl text-center">Hang tight while we get things ready!</div>
        <style>{`
          .cube-loader {
            perspective: 800px;
            width: 64px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .cube {
            width: 48px;
            height: 48px;
            position: relative;
            transform-style: preserve-3d;
            animation: cube-spin 1.2s infinite linear;
          }
          .cube .face {
            position: absolute;
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #ffe066 60%, #f5e1a0 100%);
            opacity: 0.95;
            border-radius: 8px;
            box-shadow: 0 2px 12px 0 #232b39cc;
          }
          .cube .front  { transform: rotateY(  0deg) translateZ(24px); }
          .cube .back   { transform: rotateY(180deg) translateZ(24px); }
          .cube .right  { transform: rotateY( 90deg) translateZ(24px); }
          .cube .left   { transform: rotateY(-90deg) translateZ(24px); }
          .cube .top    { transform: rotateX( 90deg) translateZ(24px); }
          .cube .bottom { transform: rotateX(-90deg) translateZ(24px); }
          @keyframes cube-spin {
            0%   { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
          }
        `}</style>
      </div>
    );
  }

  const inviteLink = `${window.location.origin}/battle/${battle.id}`;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        <BattleAvatar 
          name={battle.players.user1.displayName} 
          photoURL={battle.players.user1.photoURL}
          highlight 
        />
        <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#ffe066] drop-shadow">VS</span>
        {battle.players.user2 && (
          <BattleAvatar 
            name={battle.players.user2.displayName} 
            photoURL={battle.players.user2.photoURL}
          />
        )}
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 flex items-center gap-3 text-center">
        <span>Quiz Battle Room</span> 
        <span className="text-2xl sm:text-3xl lg:text-4xl">⚔️</span>
      </h2>
      <div className="mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl text-center">Share this link with your friend:</div>
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-lg sm:max-w-2xl">
        <input
          className="border px-3 sm:px-4 py-2 sm:py-3 rounded-lg w-full sm:w-96 text-center text-sm sm:text-base lg:text-lg bg-white/10 text-white border-[#ffe066]/30 focus:border-[#ffe066] focus:outline-none"
          value={inviteLink}
          readOnly
          onClick={e => (e.target as HTMLInputElement).select()}
        />
        <button
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[#ffe066] text-[#232b39] font-bold shadow hover:bg-[#f5e1a0] transition-all border border-[#f5e1a0]/40 focus:outline-none text-sm sm:text-base lg:text-lg"
          onClick={() => {
            navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          title="Copy link"
        >
          {copied ? 'Copied!' : '📋'}
        </button>
      </div>
      <div className="mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl text-center">
        {battle.players.user1.displayName} {battle.players.user2 && `vs ${battle.players.user2.displayName}`}
      </div>
      <button 
        className="px-8 sm:px-12 py-3 sm:py-4 bg-[#ffe066] text-[#232b39] font-bold rounded-lg shadow-lg hover:bg-[#f5e1a0] transition-all border border-[#f5e1a0]/40 focus:outline-none focus:ring-2 focus:ring-[#f5e1a0] text-base sm:text-lg lg:text-xl" 
        onClick={handleReady}
      >
        {battle.players.user1.uid === currentUser.uid
          ? battle.players.user1.ready ? 'Ready!' : 'I am Ready'
          : battle.players.user2?.ready ? 'Ready!' : 'I am Ready'}
      </button>
      <div className="mt-6 sm:mt-8 text-gray-500 text-sm sm:text-base lg:text-lg text-center">
        {(!battle.players.user2) ? 'Waiting for opponent to join...' : 'Waiting for both players to be ready...'}
      </div>
    </div>
  );
};

export default BattleLobby; 