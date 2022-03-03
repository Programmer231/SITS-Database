import Card from "../UI/Card";
import moreClasses from "../Display/DisplayField.module.css";
import formClasses from "../AddField/AddField.module.css";
import classes from "./filter.module.css";
import { useState } from "react";
import { prettyDOM } from "@testing-library/react";

const MainFilter = () => {
  const [numberSelected, setNumberSelected] = useState(true);

  const handleNumberSelected = (id) => {
    setNumberSelected((prevState) => {
      if (id === 0 && prevState) {
        return prevState;
      } else if (id === 1 && !prevState) {
        return prevState;
      } else {
        return !prevState;
      }
    });
  };

  return (
    <Card>
      <div className={moreClasses.wrap}>
        <h1 style={{ display: "block" }}>Filter</h1>
        <div className={classes.actions}>
          <button
            className={
              numberSelected
                ? classes.backgroundPurple
                : classes.backgroundWhite
            }
            onClick={() => handleNumberSelected(0)}
          >
            Number
          </button>
          <button
            className={
              numberSelected
                ? classes.backgroundWhite
                : classes.backgroundPurple
            }
            onClick={() => handleNumberSelected(1)}
          >
            Text
          </button>
        </div>
        {numberSelected ? (
          <select name="numberFilter" id="numberFilter">
            <option value="assetTagNumber">Asset Tag Number</option>
            <option value="PCEPTagNumber">PCEP Tag Number</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
            <option value="totalPrice">Total Price</option>
          </select>
        ) : (
          <select name="textFilter" id="textFilter">
            <option value="part">Part</option>
            <option value="description">Description</option>
            <option value="purpose">Purpose</option>
            <option value="type">Type</option>
          </select>
        )}

        <div className={formClasses.actions} style={{ textAlign: "center" }}>
          <button>Add</button>
        </div>
      </div>
    </Card>
  );
};

export default MainFilter;
