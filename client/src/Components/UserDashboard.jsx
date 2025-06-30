import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardData } from '../api/api';
import { PencilIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const response = await getDashboardData(); // entire Axios response
      console.log("Dashboard API response:", response);

      const payload = response.data; // contains: { success, message, data }

      if (!payload.success || !payload.data) {
        throw new Error(payload.message || 'Failed to fetch dashboard data');
      }

      setDashboardData(payload.data); // ✅ correctly extract the actual dashboard data
    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardData();
}, []);



  if (loading) return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-2">Loading dashboard...</p>
    </div>
  );

  if (error) return (
    <div className="text-center py-8">
      <div className="text-red-500 font-medium">{error}</div>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded"
      >
        Retry
      </button>
    </div>
  );

  if (!dashboardData?.user) return (
    <div className="text-center py-8">
      <p>No user data available</p>
      <p className="text-sm text-gray-500 mt-2">
        Try logging out and back in
      </p>
    </div>
  );

  // Safely get first character of name or default to 'U'
  const userInitial = dashboardData.user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* User Profile Section */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                  {userInitial}
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-1">
                {dashboardData.user.name || 'Unknown User'}
              </h2>
              <p className="text-gray-600 mb-4">
                {dashboardData.user.email || 'No email provided'}
              </p>
              <button
                onClick={() => navigate('/profile/edit')}
                className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <PencilIcon className="h-5 w-5 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Posts Section */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">
                Your Posts ({dashboardData.postCount || 0})
              </h3>
              <button
                onClick={() => navigate('/posts')}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Create New Post
              </button>
            </div>

            {dashboardData.posts?.length === 0 ? (
              <p className="text-gray-500 mt-4">
                You haven't created any posts yet.
              </p>
            ) : (
              <div className="space-y-4">
                {dashboardData.posts?.map((post) => (
                  <div key={post._id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div 
                      className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                      onClick={() => navigate(`/posts/${post._id}`)}
                    >
                      <h4 className="font-medium text-gray-900 hover:text-blue-600">
                        {post.title || 'Untitled Post'}
                      </h4>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded mr-3">
                          {post.category?.name || 'Uncategorized'}
                        </span>
                        <span>
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown date'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;