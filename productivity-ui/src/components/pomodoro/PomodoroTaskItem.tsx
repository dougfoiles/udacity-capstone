import { useDispatch } from "react-redux";
import { pomodoroActions } from "../../store";

type Props = {
  isActive: boolean;
  id: string;
  description: string;
};

const PomodoroTaskItem = (props: Props): JSX.Element => {
  const { isActive, id, description } = props;
  const dispatch = useDispatch();

  const onItemClick = () => {
    if (!isActive) {
      dispatch(pomodoroActions.setTaskSelected(id));
    } else {
      dispatch(pomodoroActions.setTaskSelected(null));
    }
  };
  return (
    <div
      className={`pomodoro-task-item ${isActive ? "active" : ""}`}
      onClick={onItemClick}
    >
      <div className="pomodoro-task-title">{description}</div>
    </div>
  );
};

export default PomodoroTaskItem;
