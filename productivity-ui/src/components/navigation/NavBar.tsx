import { NavLink } from "react-router-dom";
import "./NavBar.scss";
import { useSelector, shallowEqual } from "react-redux";

const NavBar = () => {
  //TODO change "any"
  const isLoggedIn = useSelector((state: any) => {
    return state.auth.isLoggedIn;
  }, shallowEqual);

  return (
    <div className="nav-bar">
      <ul className="list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pomodoro"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Pomodoro
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/journal"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Journal
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stats"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Stats
          </NavLink>
        </li> */}
      </ul>
      <ul className="list">
        {!isLoggedIn && (
          <li>
            <NavLink to="/login?action=login">Login</NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
