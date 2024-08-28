import { useEffect, useState } from "react";
import Posts from "../Components/Posts";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from the API
        fetch(`${API_BASE_URL}/post`)
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Posts key={post._id} {...post} />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </>
    );
}
