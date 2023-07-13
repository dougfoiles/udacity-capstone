import { Form } from "react-router-dom";

import "./JournalEntryForm.scss";
import Button from "../common/Button";
import { useActionData } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { containsMessage } from "../../utils/typeGuards/type-guards";

const JournalEntryForm = () => {
  const [titleValue, setTitleValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const data = useActionData();

  const resetInputs = useCallback(() => {
    setTitleValue("");
    setTextValue("");
  }, [setTitleValue, setTextValue]);

  useEffect(() => {
    let message;
    if (containsMessage(data)) {
      message = data.message;
    }

    if (message) {
      resetInputs();
    }
  }, [data, resetInputs]);

  return (
    <Form method="post">
      <div className="text-box">
        <h2>Add Entry</h2>
        <div className="input-container">
          <label className="title-label" htmlFor="title">
            Title
          </label>
          <input
            required
            id="title"
            type="text"
            name="title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="title-label" htmlFor="text">
            Entry
          </label>
          <textarea
            required
            name="text"
            className="text-area"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </div>
        <div className="actions">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </Form>
  );
};

export default JournalEntryForm;
