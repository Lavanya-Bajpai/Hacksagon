import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { quizService } from '../../services';
import { Quiz } from '../../models/Quiz';
import ResumableQuiz from './ResumableQuiz';
import { QuizQuestion } from '../../data/quiz-questions';

const DynamicQuiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        setError('Quiz ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const quizData = await quizService.getById(quizId);
        
        if (!quizData) {
          setError('Quiz not found');
          return;
        }

        if (!quizData.isActive) {
          setError('This quiz is not available');
          return;
        }

        setQuiz(quizData);
      } catch (err) {
        setError('Failed to load quiz');
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Convert Quiz model to QuizQuestion format for ResumableQuiz
  const convertQuizToQuestions = (quiz: Quiz): QuizQuestion[] => {
    return quiz.questions.map((q, index) => ({
      id: q.id || `q${index}`,
      text: q.question,
      options: q.options,
      correctIndex: q.correctOptionIndex,
      explanation: q.explanation
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#f5e1a0]/30 border-t-[#f5e1a0] rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-400">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#f5e1a0] mb-4">Quiz Not Found</h2>
          <p className="text-gray-400 mb-4">{error || 'The requested quiz could not be found.'}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-[#f5e1a0] text-[#1a2233] font-bold py-2 px-4 rounded hover:bg-[#ffe066] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const questions = convertQuizToQuestions(quiz);

  return (
    <ResumableQuiz 
      quizId={quizId!} 
      questions={questions} 
    />
  );
};

export default DynamicQuiz; 