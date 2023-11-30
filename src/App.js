import "./App.css";
import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import PostNew from "./components/PostNew";
import Post from "./components/Post";

function App() {
  return (
    <div className="containier">
      <Routes>
        <Route path="/new" element={<PostNew />} />
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
