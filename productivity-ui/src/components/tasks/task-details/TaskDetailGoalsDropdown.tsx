import { Goal } from "../../../models/goal-models";

type Props = {
  mode: string;
  label: string;
  defaultGoalId: string;
  goals: Goal[];
};

const TaskDetailGoalsDropdown = (props: Props): JSX.Element => {
  const { mode, label, goals, defaultGoalId } = props;

  const matchedGoals = goals.filter((goal: { id: any }) => {
    return goal.id === defaultGoalId;
  });
  const defaultGoal =
    matchedGoals.length > 0
      ? matchedGoals[0]
      : { description: "None", id: null };

  return (
    <div className="detail-attribute">
      <p className="label">{label}</p>
      {mode === "EDIT" ? (
        <select className="value" name="goal" id="goal">
          <option selected={!defaultGoal.id} value={1}>
            None
          </option>
          {goals.map((goal) => {
            return (
              <option
                selected={goal.id === props.defaultGoalId ? true : false}
                value={goal.id}
                key={goal.id}
              >
                {goal.description}
              </option>
            );
          })}
        </select>
      ) : (
        <p>{defaultGoal.description}</p>
      )}
    </div>
  );
};

export default TaskDetailGoalsDropdown;
