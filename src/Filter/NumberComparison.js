import classes from "./NumberComparison.module.css";
import formClasses from "../AddField/AddField.module.css";
import { useState } from "react";

const NumberComparison = (props) => {
  const [inputValue, setInputValue] = useState(0);
  const [sign, setSign] = useState("<");

  const changeNumberHandler = (event) => {
    setInputValue(event.target.valueAsNumber);
  };

  const changeSignHandler = (event) => {
    setSign(event.target.value);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div className={classes.spaceData}>
        <h1 style={{ display: "inline" }}>{props.selectedNum}</h1>
        <select
          name="comparison"
          id="comparison"
          className={classes.comparisonSelect}
          onChange={changeSignHandler}
        >
          <option name="<" value="<">
            Less Than
          </option>
          <option name=">" value=">">
            Greater Than
          </option>
          <option name="=" value="=">
            Equal To
          </option>
        </select>
        <input
          type="number"
          width="100px"
          className={classes.comparisonInputs}
          value={inputValue || 0.0}
          onChange={(event) => changeNumberHandler(event)}
        />
      </div>

      <div className={formClasses.actions} style={{ textAlign: "center" }}>
        <button
          onClick={() =>
            props.addFilter({
              type: "number",
              sign: sign,
              dataValue: props.selectedNumData,
              readValue: props.selectedNum,
              number: inputValue,
            })
          }
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NumberComparison;
