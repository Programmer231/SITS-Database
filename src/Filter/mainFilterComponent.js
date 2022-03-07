import Card from "../UI/Card";
import moreClasses from "../Display/DisplayField.module.css";
import classes from "./filter.module.css";
import SelectOptionClasses from "./MainFilterComponent.module.css";
import NumberComparison from "./NumberComparison";
import { useState } from "react";
import DisplayFilter from "./DisplayFilter";
import TextComparison from "./TextComparison";
import { v4 } from "uuid";

const MainFilter = (props) => {
  const [numberSelected, setNumberSelected] = useState(true);
  const [selectedNumberValue, setSelectedNumberValue] =
    useState("Asset Tag Number");
  const [selectedTextValue, setSelectedTextValue] = useState("Description");
  const [selectedTextDataValue, setSelectedTextDataValue] =
    useState("description");
  const [selectedNumberDataValue, setSelectedNumberDataValue] =
    useState("assetTagNumber");

  const changeSelectedText = (event) => {
    setSelectedTextValue(event.target.options[event.target.selectedIndex].text);
    setSelectedTextDataValue(event.target.value);
  };

  const changeSelectedNum = (event) => {
    setSelectedNumberValue(
      event.target.options[event.target.selectedIndex].text
    );
    setSelectedNumberDataValue(event.target.value);
  };

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

        <div className={SelectOptionClasses.centerOptions}>
          {numberSelected ? (
            <div>
              <select
                className={SelectOptionClasses.options}
                name="numberFilter"
                id="numberFilter"
                onChange={changeSelectedNum}
              >
                <option name="assetTagNumber" value="assetTagNumber">
                  Asset Tag Number
                </option>
                <option name="PCEPTagNumber" value="PCEPTagNumber">
                  PCEP Tag Number
                </option>
                <option name="price" value="price">
                  Price
                </option>
                <option name="number" value="number">
                  Quantity
                </option>
                <option name="totalPrice" value="totalPrice">
                  Total Price
                </option>
              </select>

              <NumberComparison
                selectedNum={selectedNumberValue}
                selectedNumData={selectedNumberDataValue}
                addFilter={props.addFilter}
              />
            </div>
          ) : (
            <div>
              <select
                className={SelectOptionClasses.options}
                name="textFilter"
                id="textFilter"
                onChange={changeSelectedText}
              >
                <option name="description" value="description">
                  Description
                </option>
                <option name="purpose" value="purpose">
                  Purpose
                </option>
                <option name="type" value="type">
                  Type
                </option>
              </select>

              <TextComparison
                selectedText={selectedTextValue}
                selectedTextData={selectedTextDataValue}
                addFilter={props.addFilter}
              />
            </div>
          )}

          <div className={classes.filtersWrap}>
            {props.filters.map((filter) => {
              return (
                <DisplayFilter
                  type={filter.type}
                  name={filter.readValue}
                  sign={filter.sign}
                  text={filter.text}
                  number={filter.number}
                  key={v4()}
                  clicked={props.deleteFilter}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MainFilter;
