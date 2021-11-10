import classes from "./App.module.css";
import AddField from "./AddField/AddField";

function App() {
  return (
    <div>
      <nav className={classes.wrapper}>
        <h1 className={classes.element}>Whirlwind Database</h1>
      </nav>
      <AddField />
    </div>
  );
}

export default App;
