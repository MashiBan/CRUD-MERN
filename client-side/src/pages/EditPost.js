import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Components/Editor";


export default function EditPost(){

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function updatePost(e){
        e.preventDefault;
    }


    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <form onSubmit={updatePost}>
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