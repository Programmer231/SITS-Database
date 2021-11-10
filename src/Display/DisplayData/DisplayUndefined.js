import classes from "./DisplayDefined.module.css";
import XMark from "../../UI/assets/images/XMark";
import CheckMark from "../../UI/assets/images/CheckMark";

const DisplayUndefined = (props) => {
  return (
    <div
      className={classes.flexInfo}
      onClick={() => props.myClickedHandler(props.type)}
    >
      <h2>{props.type}</h2>
      {props.clickedData[props.type] ? <CheckMark /> : <XMark />}
    </div>
  );
};

export default DisplayUndefined;
