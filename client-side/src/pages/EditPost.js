import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Components/Editor";



export default function EditPost(){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        fetch('https://crud-mern-2caq.onrender.com/post/'+id)
        .then(response =>{
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
                setFile(postInfo.file);
            })
        })
    },[])

    async function updatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);

        const response = await fetch('https://crud-mern-2caq.onrender.com/post', {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include',
            
        });
        req.json({body});
        console.log(response);
        if(response.ok){
            setRedirect(true);
        }
    }


    if (redirect) {
        return <Navigate to={'/post/'+id} />;
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
            <button type="submit">Update post</button>
        </form>
    );
}