import { useSelector, shallowEqual } from "react-redux";
import HomePageImage from "./HomePageImage";
import "./style.scss";

const Home = () => {
  const isLoggedIn = useSelector((state: any) => {
    return state.auth.isLoggedIn;
  }, shallowEqual);

  return (
    <div className="home">
      <p className="welcome-message">Welcome Home! :)</p>
      {isLoggedIn ? <HomePageImage /> : ""}
    </div>
  );
};

export default Home;
