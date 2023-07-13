import Pomodoro from "../components/pomodoro/Pomodoro";
import PageContent from "../components/common/PageContent";
import { useLoaderData } from "react-router-dom";

const PomodoroPage = () => {
  const data = useLoaderData();
  return (
    <PageContent>
      <Pomodoro tasks={data} />
    </PageContent>
  );
};

export default PomodoroPage;
