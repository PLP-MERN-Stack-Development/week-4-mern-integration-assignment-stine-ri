import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, addComment, deletePost } from '../api/api';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await fetchPost(id);
        setPost(data);
        setLoading(false);
      } catch {
        setError('Failed to load post');
        setLoading(false);
      }
    };
    getPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment(id, { text: commentText });
      setCommentText('');
      // Refresh post data
      const { data } = await fetchPost(id);
      setPost(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add comment');
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id);
      navigate('/');
    } catch {
      setError('Failed to delete post');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>{post.title}</h1>
      {post.image && (
        <img 
          src={`${import.meta.env.VITE_API_BASE_URL}${post.image}`} 
          alt={post.title} 
          style={{ maxWidth: '100%', marginBottom: '1rem' }}
        />
      )}
      <p>{post.content}</p>
      <p>Category: {post.category?.name}</p>
      <p>Author: {post.author?.name}</p>
      
      <button onClick={handleDelete} style={{ margin: '1rem 0', padding: '0.5rem', background: 'red', color: 'white' }}>
        Delete Post
      </button>

      <div style={{ marginTop: '2rem' }}>
        <h2>Comments</h2>
        {post.comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          post.comments.map(comment => (
            <div key={comment._id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd' }}>
              <p>{comment.text}</p>
              <small>By: {comment.user?.name || 'Anonymous'}</small>
            </div>
          ))
        )}
        
        <form onSubmit={handleCommentSubmit} style={{ marginTop: '1rem' }}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            required
            style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }}
          />
          <button type="submit" style={{ marginTop: '0.5rem', padding: '0.5rem 1rem' }}>
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostDetail;