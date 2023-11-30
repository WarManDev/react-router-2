import { useParams } from "react-router-dom";
import useJsonFetch from "../hooks/useJsonFetch";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostItem from "./PostItem";

export default function Post() {
  const { id } = useParams();
  const [data] = useJsonFetch(process.env.REACT_APP_INDEX_URL);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ content: " " });
  debugger;
  const navigate = useNavigate();

  const redirect = () => {
    navigate(-1);
  };

  const deletePost = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_INDEX_URL}/${id}`,
          { method: "DELETE" }
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        if (response.status === 204) {
        }
      } catch (err) {
        console.log(err);
      }
    })();
    redirect();
  };

  const onChangeText = (e) => {
    let { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const editPost = (e) => {
    e.preventDefault();
    form.id = data.find((item) => item.id === Number(id)).id;
    debugger;
    (async () => {
      try {
        const response = await fetch(process.env.REACT_APP_INDEX_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        if (response.status === 204) {
        }
      } catch (err) {
        console.log(err);
      }
    })();
    setForm({ content: " " });
    redirect();
  };

  return (
    (data && !edit && (
      <PostItem data={data.find((item) => item.id === Number(id))}>
        <div className="button">
          <button className="delete" onClick={deletePost}>
            Удалить
          </button>
          <button
            className="add"
            onClick={() => {
              debugger;
              form.content = data.find(
                (item) => item.id === Number(id)
              ).content;
              setEdit(true);
            }}
          >
            Изменить
          </button>
        </div>
      </PostItem>
    )) ||
    (data && edit && (
      <div className="postNew">
        <div className="header-edit-post">
          <h5>Редактировать публикацию</h5>
          <p onClick={() => setEdit(false)} className="material-icons">
            close
          </p>
        </div>
        <div className="postForm">
          <div className="user__info-photo">
            <img src={`https://i.pravatar.cc/300?${Math.random()}`} alt="" />
          </div>
          <form id="myForm" onSubmit={editPost}>
            <input
              type="text"
              value={form.content}
              name="content"
              onChange={onChangeText}
              autoFocus
            />
          </form>
        </div>
        <button type="submit" form="myForm">
          Изменить
        </button>
      </div>
    ))
  );
}
