import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import "./App.css";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";
import Posts from "./components/pages/Posts";
import SinglePost from "./components/pages/single-post/SinglePost";
import Users from "./components/pages/Users";
import UserProfile from "./components/pages/profile/UserProfile";
import CreatePost from "./components/pages/CreatePost";
import EditPost from "./components/pages/EditPost";
import Favorites from "./components/pages/Favorites";

function App() {
  const todoList = [
    "pagination => posts, users, comments, user posts, favorite posts ♻♻♻",
    "Update localstoreage to  useContext",
    "Update folders and files structure",
    "Update UI",
    // "",
  ];
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3500}
          newestOnTop={true}
          closeOnClick={true}
          closeButton={false}
        />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home todoList={todoList} />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:id" element={<SinglePost />} />
            <Route path="posts/create" element={<CreatePost />} />
            <Route path="posts/:id/edit" element={<EditPost />} />
            <Route path="users" element={<Users />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="users/profile/:id?" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
