import Card from "../../UI/Card";
import classes from "./DisplayData.module.css";
import DisplayDefined from "./DisplayDefined";
import DisplayUndefined from "./DisplayUndefined";
import { useState, useEffect, useRef } from "react";

const cloneDeep = require("lodash.clonedeep");

const DisplayData = (props) => {
  const [definedState, setDefinedState] = useState([]);
  const [undefinedState, setUndefinedState] = useState([]);
  const [clickedState, setClickedState] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const firstRender = useRef(true);

  const { definedValues, undefinedValues, mySearchedInfo } = props;

  useEffect(() => {
    console.log(mySearchedInfo);

    let brandInfoValues = {};
    let undefinedBrandInfoValues = {};
    setDefinedState(definedValues);
    setUndefinedState(undefinedValues);

    for (let x of definedValues) {
      if (props.mySearchedInfo[x.type] === "Y") {
        brandInfoValues[x.type] = true;
      } else {
        brandInfoValues[x.type] = false;
      }
    }

    for (let y of undefinedValues) {
      undefinedBrandInfoValues[y.type] = false;
    }

    setClickedState((prevState) => {
      return {
        ...prevState,
        ...brandInfoValues,
        ...undefinedBrandInfoValues,
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
        brand: props.mySearchedInfo.brand,
        website: props.mySearchedInfo.website,
      };

      for (let x in clickedState) {
        if (clickedState[x]) {
          finalData[x] = "Y";
        } else {
          finalData[x] = "";
        }
      }

      fetch(
        `https://react-practic-b6a39-default-rtdb.firebaseio.com/${props.mySearchedInfo.id}/.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      fetch("https://react-practic-b6a39-default-rtdb.firebaseio.com/.json", {
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
            {props.mySearchedInfo.brand}
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
