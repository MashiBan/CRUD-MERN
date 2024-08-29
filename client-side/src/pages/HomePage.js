import { useEffect, useState } from "react";
import Posts from "../Components/Posts";


export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from the API
        fetch('https://crud-mern-2caq.onrender.com/post')
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
