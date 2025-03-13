import { BASE_URL } from "../../../data";
import useGetApi from "../../../hooks/useGetApi";
import Loader from "../../elements/loader/Loader";
import Post from "../../elements/post/Post";

const Profile = ({ user }) => {
  // console.log(user);
  const [data, loading] = useGetApi(`/users/${user.id}/posts?limit=20`);

  return (
    <div>
      <h1 className="page-header">User Profile</h1>
      <div className="my-container" style={{ textAlign: "center" }}>
        <div className="user-profile-info">
          <img
            src={`${BASE_URL}/${user.image}`}
            alt="User"
            style={{ width: "250px", height: "250px", borderRadius: "50%" }}
          />
          <div
            style={{
              marginTop: "20px",
              fontSize: "20px",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            <p>Wellcome, {user.name}</p>
            <p>Your Email: {user.email}</p>
          </div>
        </div>

        <hr style={{ margin: "2rem" }} />
        <hr style={{ margin: "2rem" }} />

        <h2
          className="section-header"
          style={{ margin: "5rem auto", fontSize: "3rem" }}
        >
          Posts
        </h2>
        <hr style={{ margin: "0rem auto 3rem", width: "50%" }} />
        <div className="posts-container" id="posts-container">
          <Loader state={loading} />
          {data && data.data.map((post) => <Post key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
