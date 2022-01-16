import classes from "./DisplayField.module.css";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import extraClasses from "../Form/NewMeetupForm.module.css";
import DisplayData from "./DisplayData/DisplayData";

const DisplayField = (props) => {
  const [numberElements, setNumberElements] = useState([]);

  useEffect(() => {
    let numOfElements = [];
    let undefinedValues = [];
    let definedValues = [];
    let allElements = [];

    for (let y of props.searchedInfo) {
      for (let x of props.certifications) {
        let counter = false;
        for (let z in y) {
          if (typeof z === String) {
            continue;
          }
          if (z === x.type) {
            counter = true;
          }
        }
        if (!counter) {
          undefinedValues.push(x);
        } else {
          definedValues.push(x);
        }
      }
      numOfElements.push(definedValues);
      numOfElements.push(undefinedValues);
      allElements.push(numOfElements);
      numOfElements = [];
      undefinedValues = [];
      definedValues = [];
    }

    setNumberElements(allElements);
  }, [props.searchedInfo, props.certifications]);

  return (
    <div className={classes.cardWrap}>
      <Card>
        <div className={classes.wrap}>
          <form onSubmit={(event) => props.searchHandler(event)}>
            <div className={extraClasses.control}>
              <label htmlFor="Part">Search a Part:</label>
              <input
                type="text"
                value={props.formData.part}
                onChange={(event) => props.inputChangedHandler(event)}
              />
            </div>
            <div className={extraClasses.actions}>
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </Card>
      <div className={classes.dataFlex}>
        {numberElements.length === props.searchedInfo.length
          ? props.searchedInfo.map((part, index) => {
              return (
                <DisplayData
                  key={part.id}
                  definedValues={numberElements[index][0]}
                  undefinedValues={numberElements[index][1]}
                  mySearchedInfo={props.searchedInfo[index]}
                  setSearchedInfo={props.setSearchedInfo}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default DisplayField;
