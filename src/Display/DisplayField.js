import classes from "./DisplayField.module.css";
import filterClasses from "../Filter/filter.module.css";
import { useEffect, useState } from "react";
import DisplayData from "./DisplayData/DisplayData";

const DisplayField = (props) => {
  const [numberElements, setNumberElements] = useState([]);
  const [numberSITSElements, setNumberSITSElements] = useState([]);
  const [dataSelected, setDataSelected] = useState(true);




  const handleDataSelected = (id) => {
    setDataSelected((prevState) => {
      if (id === 0 && prevState) {
        return prevState;
      } else if (id === 1 && !prevState) {
        return prevState;
      } else {
        return !prevState;
      }
    });
  };

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
    <div className={filterClasses.cardWrap}>
      <div className={filterClasses.actions} style={{ marginBottom: "100px" }}>
        <button
          className={
            dataSelected
              ? filterClasses.backgroundPurple
              : filterClasses.backgroundWhite
          }
          onClick={() => handleDataSelected(0)}
        >
          School Data
        </button>
        <button
          className={
            dataSelected
              ? filterClasses.backgroundWhite
              : filterClasses.backgroundPurple
          }
          onClick={() => handleDataSelected(1)}
        >
          SITS Data
        </button>
      </div>
      <div className={classes.dataFlex}>
        {dataSelected &&
        numberElements.length === props.searchedSchoolInfo.length
          ? props.searchedSchoolInfo.map((part, index) => {
              return (
                <DisplayData
                  specialID="School"
                  firebaseID="-N0BBR52DkRON_JqpgXE"
                  key={part.id}
                  definedValues={numberElements[index][0]}
                  undefinedValues={numberElements[index][1]}
                  mySearchedInfo={props.searchedSchoolInfo[index]}
                  deleteHandler = {props.deleteHandler}
                />
              );
            })
          : null}
      </div>

      <div className={classes.dataFlex}>
        {!dataSelected &&
        numberSITSElements.length === props.searchedSITSInfo.length
          ? props.searchedSITSInfo.map((part, index) => {
              return (
                <DisplayData
                  specialID="SITS"
                  firebaseID="-N0BBR4Loyk2cg6SgPDy"
                  key={part.id}
                  definedValues={numberSITSElements[index][0]}
                  undefinedValues={numberSITSElements[index][1]}
                  mySearchedInfo={props.searchedSITSInfo[index]}
                  deleteHandler = {props.deleteHandler}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default DisplayField;
