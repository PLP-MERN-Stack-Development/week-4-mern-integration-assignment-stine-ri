import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './Components/PostList';
import PostDetail from './Components/PostDetail';
import CreatePost from './Components/CreatePost';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import AdminPanel from './Components/AdminPanel';
import CategoryList from './Components/CategoryList';
import UserDashboard from './Components/UserDashboard';
import Home from './Components/LandingPage';
import EditProfile from './Components/EditProfile';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Make Home the default route */}
          <Route path="/" element={<Home />} />
          
          {/* Keep all existing routes */}
          <Route path="/posts" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          
          {/* Add a test route for user routes */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;