import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ReactTimeAgo from 'react-time-ago'
import { Link } from "react-router-dom"
import {UserContext} from '../Context/userContext'

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            });
        });
    }, [])

    if(!postInfo){
        return '';
    }

    return(
        <div>
            <div className="image-post-page">
            <img src={`${postInfo.file}`} alt=""/>
            </div>
            <div className="post-page" >
            <h1>{postInfo.title}</h1>
            <h4 >{postInfo.summary}</h4>
            </div>
            <div className="post-page-content">
            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            <h6 style={{fontSize:'1.2rem',margin: '3px'}}>by {postInfo.author.username}</h6>
            <h6 style={{fontSize:'0.8rem', margin:'0', display:'block'}}><ReactTimeAgo date={postInfo.createdAt} locale="en-US"/></h6>
            {userInfo.id === postInfo.author._id && (
                <div className="edit">
                    <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Edit this post</Link>
                </div>
            )}
            </div>

        </div>
    )
}