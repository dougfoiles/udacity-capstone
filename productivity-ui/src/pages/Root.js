import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authActions } from "../store";

import NavBar from "../components/navigation/NavBar";

function Root(props) {
  const { auth } = props;
  const dispatch = useDispatch();

  const idToken = auth.getIdToken();
  if (idToken) {
    dispatch(authActions.setIdToken(idToken));
  }

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default Root;
