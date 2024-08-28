import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Components/Editor";

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => response.json())
            .then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
                setFile(postInfo.file);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    async function updatePost(e) {
        e.preventDefault();
        
        const data = {
            title,
            summary,
            content,
            id,
            file
        };

        try {
            const response = await fetch('http://localhost:4000/post', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (response.ok) {
                setRedirect(true);
            } else {
                const error = await response.json();
                console.error('Error updating post:', error);
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    }

    if (redirect) {
        return <Navigate to={`/post/${id}`} />;
    }

    return (
        <form onSubmit={updatePost}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image Link"
                value={file}
                onChange={e => setFile(e.target.value)}
            />
            <Editor
                onChange={setContent}
                value={content}
            />
            <button type="submit">Update post</button>
        </form>
    );
}
