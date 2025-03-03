import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateEntry, getEntry } from '../services/api';

const UpdateComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const data = await getEntry(id);
        setEntry(data);
      } catch (err) {
        setError('Failed to fetch entry');
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry({ ...entry, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEntry(id, entry);
      navigate('/');
    } catch (err) {
      setError('Failed to update entry');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={entry.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          name="body"
          value={entry.body}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Entry</button>
    </form>
  );
};

export default UpdateComponent;