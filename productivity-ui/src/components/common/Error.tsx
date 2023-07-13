import PageContent from "./PageContent";
import NavBar from "../navigation/NavBar";
const Error = () => {
  return (
    <>
      <NavBar />

      <PageContent>
        <h2>An unexpected error occured!</h2>
      </PageContent>
    </>
  );
};

export default Error;
