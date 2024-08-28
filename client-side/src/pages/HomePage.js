import { useEffect, useState } from "react";
import Posts from "../Components/Posts";

export default function HomePage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/post')
            .then(response => response.json())
            .then(posts => {
                setPosts(posts);
            });
    }, []);

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Posts key={post._id} {...post} />
            ))}
        </>
    );
}
