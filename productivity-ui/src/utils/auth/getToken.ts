import store from "../../store";

export const getToken: any = () => {
  return store?.getState()?.auth?.idToken;
};
