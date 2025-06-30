import { useState } from 'react';
import CategoryList from './CategoryList';
import CreateCategory from './CreateCategory';

const AdminPanel = () => {
  // State to trigger refreshes of the category list
  const [categoriesUpdated, setCategoriesUpdated] = useState(false);

  // Callback function when a new category is created
  const handleCategoryCreated = () => {
    // Toggle the state to force CategoryList to refresh
    setCategoriesUpdated(prev => !prev);
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        color: '#333',
        borderBottom: '2px solid #eee',
        paddingBottom: '0.5rem'
      }}>
        Admin Panel
      </h1>
      
      {/* Category Creation Section */}
      <div style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginTop: 0 }}>Create New Category</h2>
        <CreateCategory onCategoryCreated={handleCategoryCreated} />
      </div>
      
      {/* Category List Section */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ marginTop: 0 }}>Existing Categories</h2>
        {/* Key prop forces re-render when categoriesUpdated changes */}
        <CategoryList key={categoriesUpdated} />
      </div>
    </div>
  );
};

export default AdminPanel;