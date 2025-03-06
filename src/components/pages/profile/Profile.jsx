import { BASE_URL } from "../../../data";

const Profile = ({ user }) => {
  return (
    <div>
      <h1 className="page-header">User Profile</h1>
      <div className="my-container" style={{ textAlign: "center" }}>
        <div className="current-user-info">
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
      </div>
    </div>
  );
};

export default Profile;
