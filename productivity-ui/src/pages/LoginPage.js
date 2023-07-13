import { useLocation } from "react-router-dom";
import LoadingCard from "../components/common/LoadingCard";
import PageContent from "../components/common/PageContent";
import Login from "../components/home/Login";

const LoginPage = (props) => {
  const { auth } = props;
  const { search } = useLocation();
  const isAction = search.length > 0 && search.split("=")[1] === "login";
  if (isAction) {
    auth.login();
  }
  return (
    <PageContent>
      {isAction && <LoadingCard />}
      {!isAction && <Login auth={auth} />}
    </PageContent>
  );
};

export default LoginPage;
