import "./TaskDetailAttribute.scss";

type Props = {
  mode: string;
  inputType?: string;
  label: string;
  name: string;
  value: string;
};

const TaskDetailAttribute = (props: Props): JSX.Element => {
  const { mode, label, name, value } = props;
  const inputType = props.inputType || "text";

  return (
    <div className="detail-attribute">
      <p className="label">{label}</p>
      {mode === "EDIT" ? (
        <input
          className="value"
          type={inputType}
          name={name}
          defaultValue={value}
        />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
};

export default TaskDetailAttribute;
