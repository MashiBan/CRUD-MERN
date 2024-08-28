import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

// Configure TimeAgo locales
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export default function Posts({ _id, title, summary, file, createdAt, author }) {
    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={file} alt={title} />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <span className="author">{author.username}</span>
                    <time>
                        <ReactTimeAgo date={createdAt} locale="en-US" />
                    </time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}
