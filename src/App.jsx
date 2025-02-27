import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout/Layout";
import "./App.css";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NotFound from "./components/pages/NotFound";
import Posts from "./components/pages/posts";
import SinglePost from "./components/pages/single-post/SinglePost";
import Users from "./components/pages/Users";
import Profile from "./components/pages/Profile";

function App() {
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
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:id" element={<SinglePost />} />
            <Route path="users" element={<Users />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
