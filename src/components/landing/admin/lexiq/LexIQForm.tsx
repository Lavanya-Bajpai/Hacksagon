import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lexiqService } from '../../../services';
import { LexIQWord } from '../../../models/LexIQWord';

const LexIQForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState<Partial<LexIQWord>>({
    word: '',
    definition: '',
    partOfSpeech: '',
    example: '',
    difficulty: 'easy',
    isActive: true
  });

  useEffect(() => {
    if (id && id !== 'new') {
      fetchWord();
    }
  }, [id]);

  const fetchWord = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await lexiqService.getById(id);
      if (data) {
        setWord(data);
      }
    } catch (error) {
      alert('Failed to fetch word');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (id && id !== 'new') {
        await lexiqService.update(id, word);
      } else {
        // Ensure all required fields are present for add operation
        const wordData: Omit<LexIQWord, 'id' | 'createdAt' | 'updatedAt'> = {
          word: word.word || '',
          definition: word.definition || '',
          partOfSpeech: word.partOfSpeech || '',
          example: word.example || '',
          difficulty: word.difficulty || 'easy',
          isActive: word.isActive ?? true
        };
        await lexiqService.add(wordData);
      }
      navigate('/admin/lexiq');
    } catch (error) {
      alert('Failed to save word');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof LexIQWord, value: any) => {
    setWord(prev => ({ ...prev, [field]: value }));
  };

  if (loading && id !== 'new') {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">
        {id === 'new' ? 'Add New Word' : 'Edit Word'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Word *
          </label>
          <input
            type="text"
            value={word.word || ''}
            onChange={(e) => handleChange('word', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Definition *
          </label>
          <textarea
            value={word.definition || ''}
            onChange={(e) => handleChange('definition', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Part of Speech *
          </label>
          <input
            type="text"
            value={word.partOfSpeech || ''}
            onChange={(e) => handleChange('partOfSpeech', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Example *
          </label>
          <textarea
            value={word.example || ''}
            onChange={(e) => handleChange('example', e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty *
          </label>
          <select
            value={word.difficulty || 'easy'}
            onChange={(e) => handleChange('difficulty', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={word.isActive || false}
            onChange={(e) => handleChange('isActive', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
            Active
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/lexiq')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LexIQForm; 