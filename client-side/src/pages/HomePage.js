import { useEffect, useState } from "react";
import Posts from "../Components/Posts";

import {API_BASE_URL} from '../config.js';

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
