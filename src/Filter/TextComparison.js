import classes from "./NumberComparison.module.css";
import formClasses from "../AddField/AddField.module.css";
import { useState } from "react";

const TextComparison = (props) => {
  const [inputValue, setInputValue] = useState("");

  const changeTextHandler = (event) => {
    setInputValue(event.target.value);
  };

  const addTextFilter = () => {
    console.log(inputValue);

    props.addFilter({
      type: "text",
      dataValue: props.selectedTextData,
      readValue: props.selectedText,
      text: inputValue,
    });
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div className={classes.spaceData}>
        <h1 style={{ display: "inline" }}>{props.selectedText}</h1>
        <input
          type="text"
          width="100px"
          className={classes.textComparisonInputs}
          value={inputValue || ""}
          onChange={(event) => changeTextHandler(event)}
        />
      </div>

      <div className={formClasses.actions} style={{ textAlign: "center" }}>
        <button onClick={addTextFilter}>Add</button>
      </div>
    </div>
  );
};

export default TextComparison;
