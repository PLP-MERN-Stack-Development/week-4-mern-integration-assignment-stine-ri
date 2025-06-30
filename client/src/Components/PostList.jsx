import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../api/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const { data } = await fetchPosts(page);
        setPosts(data.posts);
        setPages(data.pages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getPosts();
  }, [page]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post._id}>
          <Link to={`/post/${post._id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.content.substring(0, 100)}...</p>
        </div>
      ))}
      <div>
        {[...Array(pages).keys()].map(x => (
          <button key={x + 1} onClick={() => setPage(x + 1)}>
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;