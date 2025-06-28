import { useEffect, useState } from 'react';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { BattleData } from './types';
import BattleAvatar from './BattleAvatar';

interface Props {
  battle: BattleData;
  currentUser: any;
}

const BattleQuiz = ({ battle, currentUser }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [timer, setTimer] = useState<number>(battle.timer);
  const [showNext, setShowNext] = useState(false);

  const userKey = battle.players.user1.uid === currentUser.uid ? 'user1' : 'user2';
  const opponentKey = userKey === 'user1' ? 'user2' : 'user1';
  const question = battle.questions[battle.currentQuestion];
  const user = battle.players[userKey];
  const opponent = battle.players[opponentKey];

  // Timer logic
  useEffect(() => {
    if (battle.status !== 'in-progress') return;
    if (timer <= 0) {
      handleAnswer(null);
      return;
    }
    const interval = setInterval(() => setTimer((t: number) => t - 1), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [timer, battle.status]);

  // Reset timer on question change
  useEffect(() => {
    setTimer(battle.timer);
    setSelected(null);
    setShowNext(false);
  }, [battle.currentQuestion, battle.timer]);

  // Handle answer
  const handleAnswer = async (optionIdx: number | null) => {
    if (!user) return;
    setSelected(optionIdx);
    setShowNext(true);
    const answers = [...(user.answers || []), optionIdx];
    let score = user.score;
    if (optionIdx !== null && question.options[optionIdx] === question.answer) {
      score += 10 + timer; // 10 points + time bonus
    }
    await updateDoc(doc(db, 'battles', battle.id), {
      [`players.${userKey}.answers`]: answers,
      [`players.${userKey}.score`]: score
    });
    // If both answered, go to next question or finish
    const oppAnswers = (opponent?.answers || []);
    if (answers.length === battle.questions.length && oppAnswers.length === battle.questions.length) {
      await updateDoc(doc(db, 'battles', battle.id), { status: 'finished' });
    } else if (answers.length > battle.currentQuestion && oppAnswers.length > battle.currentQuestion) {
      await updateDoc(doc(db, 'battles', battle.id), { currentQuestion: battle.currentQuestion + 1 });
    }
  };

  // Show opponent's answer status
  const oppAnswered = (opponent?.answers || []).length > battle.currentQuestion;

  if (!user) return <div>Player not found.</div>;

  return (
    <div className="w-full max-w-2xl lg:max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white/10 rounded-xl lg:rounded-2xl border border-[#f5e1a0]/40 text-center mt-6 sm:mt-10 relative shadow-xl animate-battle-glow">
      {/* Avatars and VS banner */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        <BattleAvatar 
          name={user.displayName} 
          photoURL={user.photoURL}
          highlight 
          size="responsive" 
        />
        <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#ffe066] drop-shadow">VS</span>
        {opponent && (
          <BattleAvatar 
            name={opponent.displayName} 
            photoURL={opponent.photoURL}
            size="responsive" 
          />
        )}
      </div>
      {/* Mascot and header */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <span className="text-2xl sm:text-3xl lg:text-4xl">⚔️</span>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#f5e1a0]">Question {battle.currentQuestion + 1} / {battle.questions.length}</h2>
      </div>
      {/* Progress bar */}
      <div className="w-full h-3 sm:h-4 bg-[#232b39]/40 rounded-full mb-6 sm:mb-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#ffe066] to-[#f5e1a0] transition-all duration-500" style={{ width: `${((battle.currentQuestion+1)/battle.questions.length)*100}%` }} />
      </div>
      <div className="mb-4 sm:mb-6 text-white text-lg sm:text-xl lg:text-2xl font-medium">{question.question}</div>
      <div className="mb-6 sm:mb-8 text-gray-400 text-base sm:text-lg lg:text-xl">Time left: {timer}s</div>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {question.options.map((opt: string, idx: number) => (
          <button
            key={idx}
            className={`w-full px-6 sm:px-8 py-3 sm:py-4 lg:py-5 rounded-lg border text-white transition-colors text-base sm:text-lg lg:text-xl font-medium
              ${selected === idx ? 'bg-[#f5e1a0] text-[#232b39]' : 'bg-black/30 border-[#f5e1a0]/10 hover:bg-[#f5e1a0]/10'}
              ${selected !== null && idx !== selected ? 'opacity-60' : ''}
            `}
            disabled={selected !== null}
            onClick={() => handleAnswer(idx)}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg text-gray-400">
        {oppAnswered ? "Opponent has answered" : "Waiting for opponent..."}
      </div>
      {showNext && <div className="text-green-500 font-bold text-base sm:text-lg lg:text-xl">Answer submitted!</div>}
      {/* Animated border/glow style */}
      <style>{`
        @keyframes battle-glow {
          0% { box-shadow: 0 0 16px 2px #ffe06644, 0 0 0 0 #f5e1a044; }
          50% { box-shadow: 0 0 32px 8px #ffe06688, 0 0 0 8px #f5e1a044; }
          100% { box-shadow: 0 0 16px 2px #ffe06644, 0 0 0 0 #f5e1a044; }
        }
        .animate-battle-glow { animation: battle-glow 2.5s infinite alternate; }
      `}</style>
    </div>
  );
};

export default BattleQuiz; 