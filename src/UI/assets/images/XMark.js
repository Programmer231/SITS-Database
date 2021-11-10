import XMark from "./XMark.png";
import classes from "./Mark.module.css";

const xMark = () => {
  return (
    <img
      src={XMark}
      alt="checked"
      width="20px"
      height="20px"
      className={classes.XMark}
    />
  );
};

export default xMark;
