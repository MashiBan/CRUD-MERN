import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactTimeAgo from 'react-time-ago';
import { UserContext } from '../Context/userContext';

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://crud-mern-2caq.onrender.com/post/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(postData => {
                setPostInfo(postData);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const response = await fetch(`https://crud-mern-2caq.onrender.com/post/${postInfo._id}`, {
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

    if (!postInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="image-post-page">
                <img src={postInfo.file} alt="Post" />
            </div>
            <div className="post-page">
                <h1>{postInfo.title}</h1>
                <h4>{postInfo.summary}</h4>
            </div>
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
