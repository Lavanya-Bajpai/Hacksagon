import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { lexiqService } from '../../../services';
import { LexIQWord } from '../../../models/LexIQWord';
import AdminTable from '../common/AdminTable';

const LexIQList: React.FC = () => {
  const [words, setWords] = useState<LexIQWord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    setLoading(true);
    try {
      const data = await lexiqService.getAll(true);
      setWords(data);
    } catch (error) {
      alert('Failed to fetch words');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (word: LexIQWord) => {
    if (!word.id) return;
    if (!window.confirm(`Delete word "${word.word}"?`)) return;
    try {
      await lexiqService.delete(word.id);
      setWords(words.filter(w => w.id !== word.id));
    } catch (error) {
      alert('Failed to delete word');
    }
  };

  const columns = [
    { header: 'Word', accessor: 'word' as keyof LexIQWord },
    { header: 'Definition', accessor: 'definition' as keyof LexIQWord },
    { header: 'Part of Speech', accessor: 'partOfSpeech' as keyof LexIQWord },
    { header: 'Difficulty', accessor: 'difficulty' as keyof LexIQWord },
    { header: 'Status', accessor: (w: LexIQWord) => w.isActive ? 'Active' : 'Inactive' },
    { header: 'Created', accessor: (w: LexIQWord) => new Date(w.createdAt).toLocaleDateString() },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Nagrik Aur Samvidhan Words</h2>
        <Link to="/admin/lexiq/new" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
          Add New Word
        </Link>
      </div>
      <AdminTable<LexIQWord>
        data={words}
        columns={columns}
        keyField="id"
        loading={loading}
        baseEditUrl="/admin/lexiq"
        onDelete={handleDelete}
      />
    </div>
  );
};

export default LexIQList; 