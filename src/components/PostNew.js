import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostNew() {
  const clearForm = { content: "", id: 0 };
  const navigate = useNavigate();
  const [form, setForm] = useState(clearForm);

  const redirect = () => {
    navigate(-1);
  };
  const handleChange = (event) => {
    let { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const btnClick = (e) => {
    e.preventDefault();
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
    setForm(clearForm);
    redirect();
  };

  return (
    <div className="postNew">
      <div className="header-new-post">
        <p onClick={redirect} className="material-icons">
          close
        </p>
      </div>
      <div className="postForm">
        <div className="user__info-photo">
          <img src={`https://i.pravatar.cc/300?${Math.random()}`} alt="" />
        </div>
        <form onSubmit={btnClick} id="myForm">
          <input
            type="text"
            value={form.content}
            name="content"
            onChange={handleChange}
            autoFocus
          />
        </form>
      </div>
      <button type="submit" form="myForm">
        Опубликовать
      </button>
    </div>
  );
}
