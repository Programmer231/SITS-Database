import classes from "./filter.module.css";
import Card from "../UI/Card";
import { useState } from "react";

const Sort = () => {

    const [ascendingSelected, setAscendingSelected] = useState();
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
            
        </Card>
    )

}



export default Sort;