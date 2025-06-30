import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to BlogApp</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A simple platform to share your thoughts and discover amazing content
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/login" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Browse Posts
          </Link>
          <Link 
            to="/login"  
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg"
          >
            Create Post
          </Link>
        </div>
      </div>

      {/* Recent Posts Preview */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Recent Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example post cards - replace with actual data */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">Post Title</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">Short preview of the post content...</p>
            <Link to="/post/1" className="text-blue-600 hover:underline">Read more</Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">Another Post</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">Short preview of the post content...</p>
            <Link to="/post/2" className="text-blue-600 hover:underline">Read more</Link>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">Third Post</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">Short preview of the post content...</p>
            <Link to="/post/3" className="text-blue-600 hover:underline">Read more</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} BlogApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;