import { useState } from 'react';
import { deleteEntry } from '../services/api';

interface DeleteComponentProps {
  entryId: string;
  onDelete: (id: string) => void;
}

const DeleteComponent: React.FC<DeleteComponentProps> = ({ entryId, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteEntry(entryId);
      onDelete(entryId);
    } catch {
      setError('Failed to delete the entry. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h2>Delete Entry</h2>
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete Entry'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DeleteComponent;