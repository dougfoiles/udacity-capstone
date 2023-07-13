import { useNavigate } from "react-router-dom";

import "./JournalEntryItem.scss";

type Props = {
  title: string;
  creationDate: string;
  id: string;
};

const JournalEntryItem = (props: Props): JSX.Element => {
  const navigate = useNavigate();

  const { title, creationDate, id } = props;
  const onClick = () => {
    navigate("/journal/" + id);
  };
  return (
    <div className="item" onClick={onClick}>
      <div className="title">{title}</div>
      <div className="date">{creationDate}</div>
    </div>
  );
};

export default JournalEntryItem;
