import Card from "../../UI/Card";
import classes from "./DisplayData.module.css";
import DisplayDefined from "./DisplayDefined";
import DisplayUndefined from "./DisplayUndefined";
import { useState, useEffect } from "react";

const DisplayData = (props) => {
  const [definedState, setDefinedState] = useState([]);
  const [undefinedState, setUndefinedState] = useState([]);
  const [clickedState, setClickedState] = useState({});
  const [descriptionClicked, setDescriptionState] = useState(false);
  const [serialClicked, setSerialClicked] = useState(false);
  const [assetTagClicked, setAssetTagClicked] = useState(false);
  const [PCEPTagClicked, setPCEPTagClicked] = useState(false);

  const [updatedFormData, setUpdatedFormData] = useState({
    part: props.mySearchedInfo.part || null,
    description: props.mySearchedInfo.description || null,
    number: props.mySearchedInfo.number || null,
    price: props.mySearchedInfo.price || null,
    totalPrice: props.mySearchedInfo.totalPrice || null,
    PCEPTagNumber: props.mySearchedInfo.PCEPTagNumber || null,
    assetTagNumber: props.mySearchedInfo.assetTagNumber || null,
    serialNumber: props.mySearchedInfo.serialNumber || null,
    purpose: props.mySearchedInfo.purpose || null,
    type: props.mySearchedInfo.type || null,
  });

  const descClickedHandler = () => {
    setDescriptionState((prevState) => !prevState);
  };

  const inputChangedHandler = (event, name) => {
    setUpdatedFormData((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
  };

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
  }, [mySearchedInfo, definedValues, undefinedValues]);

  const clickedHandler = (name) => {
    setClickedState((prevState) => {
      return { ...prevState, [name]: !prevState[name] };
    });
  };

  const submitHandler = () => {
    const finalData = { ...updatedFormData };

    //These lines need modification when we add the numbers to them
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
            <h1 style={{ textAlign: "center" }}>{props.mySearchedInfo.part}</h1>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="number">Number: </label>
              <input
                name="number"
                type="number"
                value={updatedFormData.number || 0}
                onChange={(event) => inputChangedHandler(event, "number")}
              />
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="price">Price: </label>
              <div>
                <h1 className={classes.priceHeadings}>$</h1>
                <input
                  className={classes.money}
                  name="price"
                  type="number"
                  value={updatedFormData.price || 0}
                  onChange={(event) => inputChangedHandler(event, "price")}
                />
              </div>
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="total price">Total Price: </label>
              <div>
                <h1 className={classes.priceHeadings}>$</h1>
                <input
                  className={classes.money}
                  name="total price"
                  type="number"
                  value={updatedFormData.price * updatedFormData.number || 0}
                />
              </div>
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="PCEP tag">PCEPTagNumber: </label>
              <input
                name="PCEP tag"
                type="number"
                value={updatedFormData.PCEPTagNumber || 0}
                onChange={(event) =>
                  inputChangedHandler(event, "PCEPTagNumber")
                }
              />
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="asset tag">assetTagNumber: </label>
              <input
                name="asset tag"
                type="number"
                value={updatedFormData.assetTagNumber || 0}
                onChange={(event) =>
                  inputChangedHandler(event, "assetTagNumber")
                }
              />
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="serial">Serial Number: </label>
              <input
                name="serial"
                type="number"
                value={updatedFormData.serialNumber || 0}
                onChange={(event) => inputChangedHandler(event, "serialNumber")}
              />
            </div>
            <div className={classes.description}>
              <h1
                className={classes.description_header}
                onClick={descClickedHandler}
              >
                Description:
              </h1>
              {descriptionClicked ? (
                <h4>{props.mySearchedInfo.description}</h4>
              ) : null}
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
