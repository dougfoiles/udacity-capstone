import PageContent from "../components/common/PageContent";
import Logout from "../components/home/Logout";

const LogoutPage = (props) => {
  props.auth.logout();

  return (
    <PageContent>
      <Logout />
    </PageContent>
  );
};

export default LogoutPage;
