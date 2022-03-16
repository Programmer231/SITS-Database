import classes from "../Filter/filter.module.css";
import moreClasses from "../Display/DisplayField.module.css";
import formClasses from "../AddField/AddField.module.css";
import SelectOptionClasses from "../Filter/MainFilterComponent.module.css";
import Card from "../UI/Card";
import { useState } from "react";
import DisplaySort from "./DisplaySort";
import SortClasses from "./SortClasses.module.css";

const Sort = (props) => {
  const [ascendingSelected, setAscendingSelected] = useState(true);
  const [selectedNumberValue, setSelectedNumberValue] =
    useState("Asset Tag Number");
  const [selectedNumberDataValue, setSelectedNumberDataValue] =
    useState("assetTagNumber");

  const changeSelectedNum = (event) => {
    setSelectedNumberValue(
      event.target.options[event.target.selectedIndex].text
    );
    setSelectedNumberDataValue(event.target.value);
  };

  const handleAscendingSelected = (id) => {
    setAscendingSelected((prevState) => {
      if (id === 0 && prevState) {
        return prevState;
      } else if (id === 1 && !prevState) {
        return prevState;
      } else {
        return !prevState;
      }
    });
  };

  console.log(props.sort);

  return (
    <Card>
      <div className={moreClasses.wrap}>
        <h1 style={{ display: "block" }}>Sort</h1>
        <div className={classes.actions}>
          <button
            className={
              ascendingSelected
                ? classes.backgroundPurple
                : classes.backgroundWhite
            }
            onClick={() => handleAscendingSelected(0)}
          >
            Ascending
          </button>
          <button
            className={
              ascendingSelected
                ? classes.backgroundWhite
                : classes.backgroundPurple
            }
            onClick={() => handleAscendingSelected(1)}
          >
            Descending
          </button>
        </div>
        <div className={SelectOptionClasses.centerOptions}>
          <select
            name="numberSort"
            id="numberSort"
            onChange={changeSelectedNum}
            className={SelectOptionClasses.options}
          >
            <option name="numberSort" value="assetTagNumber">
              Asset Tag Number
            </option>
            <option name="numberSort" value="PCEPTagNumber">
              PCEP Tag Number
            </option>
            <option name="numberSort" value="price">
              Price
            </option>
            <option name="numberSort" value="quantity">
              Quantity
            </option>
            <option name="numberSort" value="totalPrice">
              Total Price
            </option>
          </select>
        </div>

        <div className={formClasses.actions} style={{ textAlign: "center" }}>
          <button
            onClick={() =>
              props.addSort({
                dataValue: selectedNumberDataValue,
                readValue: selectedNumberValue,
                ascending: ascendingSelected,
              })
            }
          >
            Sort
          </button>
        </div>

        <div className={SortClasses.SortWrap}>
          {props.sort.dataValue ? (
            <DisplaySort
              value={props.sort.readValue}
              ascending={props.sort.ascending}
              onClick={props.deleteSort}
            />
          ) : null}
        </div>
      </div>
    </Card>
  );
};

export default Sort;
