import { useSelector, shallowEqual } from "react-redux";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element | string;
  auth: any;
};

const ProtectedRoute = (props: Props): JSX.Element => {
  const { children } = props;

  const isLoggedIn = useSelector((state: any) => {
    return state.auth.isLoggedIn;
  }, shallowEqual);

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return <div>{children}</div>;
};

export default ProtectedRoute;
