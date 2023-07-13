import JournalEntryForm from "./JournalEntryForm";
import JournalEntryList from "./JournalEntryList";
import "./style.scss";
import { JournalEntry as JournalEntryModel } from "../../models/journal-models";
import Button from "../common/Button";

type Props = {
  journalEntries: JournalEntryModel[];
  hasNext: boolean;
  loadNext: () => void;
  loadMoreRef: any;
};

const Journal = (props: Props): JSX.Element => {
  const { journalEntries, hasNext, loadNext, loadMoreRef } = props;

  return (
    <div className="journal-container">
      <div className="journal-card">
        <JournalEntryForm />
      </div>

      <div className="journal-card">
        <JournalEntryList journalEntries={journalEntries} />
        {hasNext ? (
          <Button type="button" onClick={loadNext} loadMoreRef={loadMoreRef}>
            Load more
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Journal;
