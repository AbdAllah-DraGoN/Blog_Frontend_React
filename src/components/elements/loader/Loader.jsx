import "./loader.css";

const Loader = ({ state = false }) => {
  return <>{state ? <span className="loader"></span> : ""}</>;
};

export default Loader;
