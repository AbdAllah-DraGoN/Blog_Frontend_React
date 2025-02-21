import { Outlet, Link } from "react-router-dom";

import "./layout.css";

function Layout() {
  return (
    <div className="main-div">
      <header>
        <div className="main-header">
          <div className="main-logo">
            <Link to="/">HEADER</Link>
          </div>

          <ul>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer
        style={{ background: "#EEE", padding: "10px", textAlign: "center" }}
      >
        <p>&copy; 2025 My Blog Website</p>
      </footer>
    </div>
  );
}

export default Layout;
