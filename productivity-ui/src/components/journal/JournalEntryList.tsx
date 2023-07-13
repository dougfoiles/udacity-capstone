import JournalEntryItem from "./JournalEntryItem";

import { JournalEntry as JournalEntryModel } from "../../models/journal-models";

type Props = {
  journalEntries: JournalEntryModel[];
};
const JournalEntryList = (props: Props): JSX.Element => {
  const { journalEntries } = props;

  return (
    <div>
      <h2>Journal Entries</h2>
      <ul>
        {journalEntries.map((entry) => {
          return (
            <li key={entry.id}>
              <JournalEntryItem
                title={entry.title}
                creationDate={entry.creationDate}
                id={entry.id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default JournalEntryList;
