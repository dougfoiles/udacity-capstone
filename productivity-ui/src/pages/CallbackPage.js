import PageContent from "../components/common/PageContent";
import Callback from "../components/common/Callback";
import { useLocation, Navigate } from "react-router-dom";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const CallbackPage = (props) => {
  const dispatch = useDispatch();
  const auth = props.auth;
  const { hash } = useLocation();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function getToken() {
      if (/access_token|id_token|error/.test(hash)) {
        const authResult = await auth.handleAuthentication();
        auth.setSession(authResult);
        dispatch(authActions.setIsLoggedIn(true));
        dispatch(authActions.setIdToken(auth.getIdToken()));
        setAuthenticated(true);
      }
    }
    getToken();
  }, []);

  return (
    <PageContent>
      <Callback />
      {authenticated && <Navigate to="/" replace={true} />}
    </PageContent>
  );
};

export default CallbackPage;
