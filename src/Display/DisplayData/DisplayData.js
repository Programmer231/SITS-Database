import Card from "../../UI/Card";
import classes from "./DisplayData.module.css";
import DisplayDefined from "./DisplayDefined";
import DisplayUndefined from "./DisplayUndefined";
import { useState, useEffect, useRef } from "react";

const DisplayData = (props) => {
  const [definedState, setDefinedState] = useState([]);
  const [undefinedState, setUndefinedState] = useState([]);
  const [clickedState, setClickedState] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const firstRender = useRef(true);

  const { definedValues, undefinedValues, mySearchedInfo } = props;

  useEffect(() => {
    let undefinedPartInfoValues = {};
    let definedPartInfoValues = {};
    setDefinedState(definedValues);
    setUndefinedState(undefinedValues);

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
  }, [JSON.stringify(mySearchedInfo)]);

  const clickedHandler = (name) => {
    setClickedState((prevState) => {
      return { ...prevState, [name]: !prevState[name] };
    });
  };

  const submitHandler = () => {
    setSubmitted((prevState) => !prevState);
  };

  useEffect(() => {
    if (!firstRender.current) {
      const finalData = {
        part: props.mySearchedInfo.part,
        description: props.mySearchedInfo.description,
        number: props.mySearchedInfo.number,
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
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetch("https://sits-practice-default-rtdb.firebaseio.com/.json", {
        method: "POST",
        body: JSON.stringify(finalData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      firstRender.current = false;
    }
  }, [submitted]);

  return (
    <div className={classes.dataWrap}>
      <Card>
        <div className={classes.contentWrap}>
          <h1 className={classes.headingWrapper}>
            {props.mySearchedInfo.part}
          </h1>
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
