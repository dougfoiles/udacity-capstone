import { Link, useSubmit } from "react-router-dom";
import Button from "../../common/Button";
import { JournalEntry } from "../../../models/journal-models";

import "./JournalEntryDetails.scss";

type Props = {
  details: JournalEntry;
};

const JourneyEntryDetails = (props: Props): JSX.Element => {
  const submit = useSubmit();
  const { details } = props;

  const onDelete = () => {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  };
  return (
    <div>
      <div className="back-button-container">
        <Link className="back-button" to="..">
          {"< Back"}
        </Link>
      </div>
      <div className="details-container">
        <div className="content-container">
          <div className="content">
            <div className="title">
              <div className="label-title">Title</div>
              <div>{details.title}</div>
            </div>
            <div className="text">
              <div className="label-text">Entry</div>
              <div>{details.text}</div>
            </div>
          </div>
        </div>
        <div className="actions">
          <Button type="button" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JourneyEntryDetails;
