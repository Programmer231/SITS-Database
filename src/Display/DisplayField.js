import classes from "./DisplayField.module.css";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import extraClasses from "../Form/NewMeetupForm.module.css";
import moreClasses from "./DisplayData/DisplayData.module.css";
import DisplayData from "./DisplayData/DisplayData";
import { cloneDeep } from "lodash";

const DisplayField = (props) => {
  const { searchedInfo, certifications, submittedData } = props;

  const [numberElements, setNumberElements] = useState([]);

  const [counter, setCounter] = useState(false);

  useEffect(() => {
    let numOfElements = [];
    let undefinedValues = [];
    let definedValues = [];
    let allElements = [];

    for (let y of props.searchedInfo) {
      for (let x of props.certifications) {
        let counter = false;
        for (let z in y) {
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

    setCounter(false);

    setNumberElements(allElements);
  }, [submittedData, searchedInfo, certifications]);

  return (
    <div className={classes.cardWrap}>
      <Card>
        <div className={classes.wrap}>
          <form onSubmit={(event) => props.searchHandler(event)}>
            <div className={extraClasses.control}>
              <label htmlFor="Brand">Search a Brand:</label>
              <input
                type="text"
                value={props.formData.brand}
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
          ? props.searchedInfo.map((brand, index) => {
              return (
                <DisplayData
                  key={brand.id}
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
