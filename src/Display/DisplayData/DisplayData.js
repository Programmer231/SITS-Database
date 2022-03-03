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
  const [purposeClicked, setPurposeClicked] = useState(false);
  const [typeClicked, setTypeClicked] = useState(false);

  const [updatedFormData, setUpdatedFormData] = useState({
    part: props.mySearchedInfo.part || "",
    description: props.mySearchedInfo.description || "",
    number: props.mySearchedInfo.number || 0,
    price: props.mySearchedInfo.price || 0,
    PCEPTagNumber: props.mySearchedInfo.PCEPTagNumber || 0,
    assetTagNumber: props.mySearchedInfo.assetTagNumber || 0,
    serialNumber: props.mySearchedInfo.serialNumber || "",
    purpose: props.mySearchedInfo.purpose || "",
    type: props.mySearchedInfo.type || "",
  });

  const descClickedHandler = () => {
    setDescriptionState((prevState) => !prevState);
  };

  const purposeClickedHandler = () => {
    setPurposeClicked((prevState) => !prevState);

  }

  const typeClickedHandler = () => {
    setTypeClicked((prevState) => !prevState);
  }

  const inputStringChangedHandler = (event, name) => {
    setUpdatedFormData((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
  };

  const inputNumberChangedHandler = (event, name) => {
    setUpdatedFormData((prevState) => {
      return {
        ...prevState,
        [name]: event.target.valueAsNumber,
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
    console.log(updatedFormData);
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
      `https://sits-practice-default-rtdb.firebaseio.com/${props.specialID}/${props.mySearchedInfo.id}/.json`,
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
                onChange={(event) => inputNumberChangedHandler(event, "number")}
              />
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="price">Price: </label>
              <div className = {classes.priceWrap}>
                <h1 className={classes.priceHeadings}>$</h1>
                <input
                  name="price"
                  type="number"
                  value={updatedFormData.price || 0}
                  onChange={(event) =>
                    inputNumberChangedHandler(event, "price")
                  }
                />
              </div>
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="total price">Total Price: </label>
              <div className = {classes.totalPriceHeadings}>
                <h1 className = {classes.totalPriceHeadings}>
                  <div>${updatedFormData.price * updatedFormData.number || 0}</div>
                </h1>
              </div>
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="PCEP tag">PCEP Tag Number: </label>
              <input
                name="PCEP tag"
                type="number"
                value={updatedFormData.PCEPTagNumber || 0}
                onChange={(event) =>
                  inputNumberChangedHandler(event, "PCEPTagNumber")
                }
              />
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="asset tag">Asset Tag Number: </label>
              <input
                name="asset tag"
                type="number"
                value={updatedFormData.assetTagNumber || 0}
                onChange={(event) =>
                  inputNumberChangedHandler(event, "assetTagNumber")
                }
              />
            </div>
            <div className={classes.mainDataFormWrapper}>
              <label htmlFor="serial">Serial Number: </label>
              <input
                name="serial"
                type="text"
                value={updatedFormData.serialNumber || ''}
                onChange={(event) =>
                  inputStringChangedHandler(event, "serialNumber")
                }
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
                <h4 className={classes.textFieldStyles}>
                  {props.mySearchedInfo.description}
                </h4>
              ) : null}
              <div className={classes.description}>
                <h1
                  className={classes.description_header}
                  onClick={purposeClickedHandler}
                >
                  Purpose:
                </h1>
                {purposeClicked ? (
                  <h4 className={classes.textFieldStyles}>
                    {props.mySearchedInfo.purpose}
                  </h4>
                ) : null}
              </div>
              <div className={classes.description}>
                <h1
                  className={classes.description_header}
                  onClick={typeClickedHandler}
                >
                  Type:
                </h1>
                {typeClicked ? (
                  <h4 className={classes.textFieldStyles}>
                    {props.mySearchedInfo.type}
                  </h4>
                ) : null}
              </div>
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
