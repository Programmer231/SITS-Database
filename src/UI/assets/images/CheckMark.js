import CheckMark from "./CheckMark.png";
import classes from "./Mark.module.css";

const checkMark = () => {
  return (
    <div>
      <img
        src={CheckMark}
        alt="checked"
        width="20px"
        height="20px"
        className={classes.CheckMark}
      />
    </div>
  );
};

export default checkMark;
