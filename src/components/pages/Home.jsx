import "./pages.css";

const Home = ({ todoList }) => {
  return (
    <div>
      <h1 className="page-header"> Home Page</h1>
      <div className="my-container">
        <ul>
          {todoList.map((e, i) => (
            <div key={i}>
              <li>
                {i + 1} -- {e}
              </li>
              <br />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
