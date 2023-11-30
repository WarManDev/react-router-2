import PostItem from "./PostItem";
import { Link } from "react-router-dom";
import useJsonFetch from "../hooks/useJsonFetch";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [data] = useJsonFetch(process.env.REACT_APP_INDEX_URL);
  const navigate = useNavigate();

  const redirect = (id) => {
    debugger;
    navigate(`/posts/${id}`);
  };

  return (
    <div className="posts">
      <div className="header-posts">
        <Link to="/new" className="btn-posts">
          Создать пост
        </Link>
      </div>
      {data && (
        <div className="posts">
          {data.map((item) => (
            <PostItem key={item.id} data={item} redirect={redirect} />
          ))}
        </div>
      )}
    </div>
  );
}
