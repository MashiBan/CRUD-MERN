import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import { UserContext } from '../Context/userContext';

// Use environment variable for API base URL
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
import {API_BASE_URL} from '../config.js';

export default function PostPage() {
    // State to hold post information
    const [postInfo, setPostInfo] = useState(null);
    
    // Get user information from context
    const { userInfo } = useContext(UserContext);
    
    // Extract post ID from URL parameters
    const { id } = useParams();
    
    // Hook to programmatically navigate
    const navigate = useNavigate();

    // Fetch post information when component mounts or post ID changes
    useEffect(() => {
        fetch(`${API_BASE_URL}/post/${id}`)
            .then(response => response.json())
            .then(postData => {
                setPostInfo(postData);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    // Display a loading message while the post information is being fetched
    if (!postInfo) {
        return <p>Loading...</p>;
    }

    // Handle post deletion
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const response = await fetch(`${API_BASE_URL}/post/${postInfo._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensures cookies are sent
            });
    
            if (response.ok) {
                // Redirect to the homepage after successful deletion
                window.location.href = '/';
            } else {
                console.error('Failed to delete post');
            }
        }
    };

    return (
        <div>
            {/* Display post image */}
            <div className="image-post-page">
                <img src={postInfo.file} alt="Post" />
            </div>
            
            {/* Display post title and summary */}
            <div className="post-page">
                <h1>{postInfo.title}</h1>
                <h4>{postInfo.summary}</h4>
            </div>
            
            {/* Display post content, author information, and timestamp */}
            <div className="post-page-content">
                <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
                <h6 style={{ fontSize: '1.2rem', margin: '3px' }}>by {postInfo.author.username}</h6>
                <h6 style={{ fontSize: '0.8rem', margin: '0', display: 'block' }}>
                    <ReactTimeAgo date={postInfo.createdAt} locale="en-US" />
                </h6>
                
                
                {userInfo.id === postInfo.author._id && (
                    <div className="edit">
                       <button className="edit-btn">
                           <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Edit this post</Link>
                       </button>
                       <button className="delete-btn" onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}
