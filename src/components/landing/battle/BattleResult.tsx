import { BattleData } from './types';
import Confetti from './Confetti';

interface Props {
  battle: BattleData;
  currentUser: any;
}

const BattleResult = ({ battle, currentUser }: Props) => {
  const userKey = battle.players.user1.uid === currentUser.uid ? 'user1' : 'user2';
  const opponentKey = userKey === 'user1' ? 'user2' : 'user1';
  const user = battle.players[userKey];
  const opponent = battle.players[opponentKey];
  const userScore = user ? user.score : 0;
  const oppScore = opponent ? opponent.score : 0;
  const isWinner = userScore > oppScore;
  const isDraw = userScore === oppScore;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {(isWinner || isDraw) && <Confetti />}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 flex items-center gap-3 text-center">
        {isWinner ? '🏆' : isDraw ? '🎉' : '😢'} Battle Result
      </h2>
      <div className="mb-4 sm:mb-6 text-lg sm:text-xl lg:text-2xl text-center">
        {isDraw
          ? "It's a Draw!"
          : isWinner
            ? <span>🏆 You Win! <span className="ml-3 text-yellow-400">Battle Winner</span></span>
            : "You Lose!"}
      </div>
      <div className="mb-8 sm:mb-10 space-y-2 sm:space-y-3 text-base sm:text-lg lg:text-xl">
        <div>Your Score: <span className="font-bold text-[#ffe066]">{userScore}</span></div>
        <div>Opponent Score: <span className="font-bold text-[#ffe066]">{oppScore}</span></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg">
        <button 
          className="w-full px-8 sm:px-12 py-3 sm:py-4 bg-[#ffe066] text-[#232b39] font-bold rounded-lg shadow-lg hover:bg-[#f5e1a0] transition-all border border-[#f5e1a0]/40 focus:outline-none focus:ring-2 focus:ring-[#f5e1a0] text-base sm:text-lg lg:text-xl" 
          onClick={() => window.location.reload()}
        >
          Rematch
        </button>
        <button 
          className="w-full px-8 sm:px-12 py-3 sm:py-4 bg-[#232b39] text-[#ffe066] font-bold rounded-lg shadow-lg hover:bg-[#181e26] transition-all border border-[#ffe066]/40 focus:outline-none focus:ring-2 focus:ring-[#ffe066] text-base sm:text-lg lg:text-xl" 
          onClick={() => window.location.href = '/'}
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default BattleResult; 