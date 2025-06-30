import { useState, useEffect } from 'react';
import { fetchCategories, deleteCategory } from '../api/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await fetchCategories();
        setCategories(data);
        setLoading(false);
      } catch {
        setError('Failed to load categories');
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter(cat => cat._id !== id));
      } catch {
        setError('Failed to delete category');
      }
    }
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category._id}>
            {category.name}
            <button 
              onClick={() => handleDelete(category._id)}
              style={{ marginLeft: '10px', color: 'red' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;