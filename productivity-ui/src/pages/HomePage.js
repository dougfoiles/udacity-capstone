import { useNavigation } from "react-router-dom";
import PageContent from "../components/common/PageContent";
import Home from "../components/home/Home";
import LoadingCard from "../components/common/LoadingCard";

const HomePage = () => {
  const { state } = useNavigation();

  if (state === "loading") {
    return (
      <PageContent>
        <LoadingCard />
      </PageContent>
    );
  }

  return (
    <PageContent>
      <Home />
    </PageContent>
  );
};

export default HomePage;
