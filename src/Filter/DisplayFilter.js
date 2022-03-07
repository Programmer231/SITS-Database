import classes from "./DisplayFilter.module.css";

const DisplayFilter = (props) => {
  console.log(props);

  return (
    <div
      className={classes.FiltersWrap}
      onClick={() => props.clicked(props.name)}
    >
      {props.type === "text" ? (
        <h1>
          {props.name} = {props.text}
        </h1>
      ) : (
        <h1>
          {props.name} {props.sign} {props.number}
        </h1>
      )}
    </div>
  );
};

export default DisplayFilter;
