import Card from "../../UI/Card";
import classes from "./DisplayData.module.css";
import DisplayDefined from "./DisplayDefined";
import DisplayUndefined from "./DisplayUndefined";
import { useState, useEffect } from "react";

const DisplayData = (props) => {
  const [definedState, setDefinedState] = useState([]);
  const [undefinedState, setUndefinedState] = useState([]);
  const [clickedState, setClickedState] = useState({});
  const [numberState, setNumberState] = useState(0);

  const { definedValues, undefinedValues, mySearchedInfo } = props;

  useEffect(() => {
    let undefinedPartInfoValues = {};
    let definedPartInfoValues = {};
    setDefinedState(definedValues);
    setUndefinedState(undefinedValues);
    setNumberState(mySearchedInfo.number);

    for (let y of undefinedValues) {
      undefinedPartInfoValues[y.type] = false;
    }
    for (let x of definedValues) {
      definedPartInfoValues[x.type] = mySearchedInfo[x.type];
    }

    setClickedState((prevState) => {
      return {
        ...prevState,
        ...definedPartInfoValues,
        ...undefinedPartInfoValues,
      };
    });
  }, [mySearchedInfo, definedValues, undefinedValues]);

  const clickedHandler = (name) => {
    setClickedState((prevState) => {
      return { ...prevState, [name]: !prevState[name] };
    });
  };

  const changedNumberHandler = (event) => {
    setNumberState(event.target.value);
  };

  const submitHandler = () => {
    const finalData = {
      part: props.mySearchedInfo.part,
      description: props.mySearchedInfo.description,
      number: numberState,
    };

    for (let x in clickedState) {
      if (clickedState[x]) {
        finalData[x] = true;
      } else {
        finalData[x] = false;
      }
    }

    fetch(
      `https://sits-practice-default-rtdb.firebaseio.com/${props.mySearchedInfo.id}/.json`,
      {
        method: "PATCH",
        body: JSON.stringify(finalData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className={classes.dataWrap}>
      <Card>
        <div className={classes.contentWrap}>
          <div className={classes.headingWrapper}>
            <h1>{props.mySearchedInfo.part}</h1>
            <div className={classes.headingFormWrapper}>
              <label htmlFor="number">Number: </label>
              <input
                name="number"
                type="number"
                value={numberState}
                onChange={(event) => changedNumberHandler(event)}
              />
            </div>
          </div>
          <h2 style={{ textAlign: "center" }}>Defined Values:</h2>
          {definedState.map((value) => {
            return (
              <DisplayDefined
                key={value.id}
                type={value.type}
                myClickedHandler={clickedHandler}
                clickedData={clickedState}
              />
            );
          })}
          <h2 style={{ textAlign: "center" }}>Undefined Values: </h2>
          {undefinedState.length > 0 ? (
            undefinedState.map((value2) => {
              return (
                <DisplayUndefined
                  key={value2.id}
                  type={value2.type}
                  myClickedHandler={clickedHandler}
                  clickedData={clickedState}
                />
              );
            })
          ) : (
            <h1>NONE</h1>
          )}
          <div className={classes.actions}>
            <button onClick={submitHandler}>Update</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DisplayData;
