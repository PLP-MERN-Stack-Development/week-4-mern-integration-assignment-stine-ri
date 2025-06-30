import { useState } from 'react';
import { createCategory } from '../api/api';

const CreateCategory = ({ onCategoryCreated }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      const { data } = await createCategory({ name });
      setName('');
      setSuccess('Category created successfully!');
      if (onCategoryCreated) {
        onCategoryCreated(data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create category');
    }
  };

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      marginBottom: '20px'
    }}>
      <h3 style={{ marginTop: 0 }}>Create New Category</h3>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ color: 'green', marginBottom: '10px' }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          style={{
            padding: '8px',
            flex: 1,
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;