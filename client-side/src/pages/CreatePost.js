import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Components/Editor";

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(e) {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        const response = await fetch('https://crud-mern-2caq.onrender.com/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        } else {
            // Optionally handle errors
            console.error('Failed to create post');
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={createNewPost}>
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
            <button type="submit">Create Post</button>
        </form>
    );
}
