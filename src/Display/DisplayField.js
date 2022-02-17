import classes from "./DisplayField.module.css";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import extraClasses from "../Form/NewMeetupForm.module.css";
import DisplayData from "./DisplayData/DisplayData";

const DisplayField = (props) => {
  const [numberElements, setNumberElements] = useState([]);
  const [numberSITSElements, setNumberSITSElements] = useState([]);

  useEffect(() => {
    let numOfElements = [];
    let undefinedValues = [];
    let definedValues = [];
    let allElements = [];

    for (let y of props.searchedSchoolInfo) {
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

    allElements = [];

    for (let y of props.searchedSITSInfo) {
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

    setNumberSITSElements(allElements);
  }, [props.searchedSchoolInfo, props.certifications, props.searchedSITSInfo]);

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
          </form>
        </div>
      </Card>

      <h1
        style={{
          display: "block",
          textDecoration: "underline",
          textAlign: "center",
          width: "100%",
          marginTop: "500px",
        }}
      >
        School Data
      </h1>
      <div className={classes.dataFlex}>
        {numberElements.length === props.searchedSchoolInfo.length
          ? props.searchedSchoolInfo.map((part, index) => {
              return (
                <DisplayData
                  key={part.id}
                  definedValues={numberElements[index][0]}
                  undefinedValues={numberElements[index][1]}
                  mySearchedInfo={props.searchedSchoolInfo[index]}
                />
              );
            })
          : null}
      </div>

      <h1
        style={{
          display: "block",
          textDecoration: "underline",
          textAlign: "center",
          width: "100%",
          marginTop: "500px",
        }}
      >
        SITS Data
      </h1>
      <div className={classes.dataFlex}>
        {numberSITSElements.length === props.searchedSITSInfo.length
          ? props.searchedSITSInfo.map((part, index) => {
              return (
                <DisplayData
                  key={part.id}
                  definedValues={numberSITSElements[index][0]}
                  undefinedValues={numberSITSElements[index][1]}
                  mySearchedInfo={props.searchedSITSInfo[index]}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default DisplayField;
