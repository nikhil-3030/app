import { useEffect, useState } from 'react';
import axios from 'axios';
import './ReadComponent.css';
import { useNavigate } from 'react-router-dom';

const ReadComponent = () => {
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete post');
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/update/${id}`);
  };

  const handleCreate = () => {
    navigate('/create');
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.id.toString().includes(searchTerm)
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <div className="actions">
        <button onClick={handleCreate}>
          <i className="fas fa-plus"></i> Create
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by ID, title, or body..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
      </div>
      <table className="posts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button onClick={() => handleEdit(post.id)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(post.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>No posts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReadComponent;