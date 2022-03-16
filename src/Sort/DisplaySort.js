import classes from "./DisplaySort.module.css";

const DisplaySort = (props) => {
  return (
    <div className={classes.FiltersWrap} onClick={props.onClick}>
      <h1 className={classes.SortItem}>{props.value}</h1>
      {props.ascending ? <h1>Ascending</h1> : <h1>Descending</h1>}
    </div>
  );
};

export default DisplaySort;
