import "./style.scss";
import Button from "../common/Button";

type Props = {
  auth: any;
};

const Login = (props: Props): JSX.Element => {
  const auth = props.auth;

  const onClick = () => {
    auth.login();
  };
  return (
    <div className="home">
      <div className="welcome-message">Please log in!</div>
      <div className="action">
        <Button onClick={onClick}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
