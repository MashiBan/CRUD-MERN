import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
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
        const postData = {
            title,
            summary,
            content,
            file
        };

        const response = await fetch('https://crud-mern-2caq.onrender.com/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
            credentials: 'include',
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <form onSubmit={createNewPost}>
            <input
                type="title"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type="summary"
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
            <Editor onChange={setContent} value={content}/>
            <button type="submit">Create Post</button>
        </form>
    );
}
