import classes from "./App.module.css";
import AddField from "./AddField/AddField";
import { useState } from "react";
import BeHappy from "./UI/assets/images/BeHappy.png";

function App() {
  const [smileyFace, setSmileyFace] = useState(false);

  const handleClick = () => {
    setSmileyFace((prevState) => !prevState);
  };
  return (
    <div>
      <nav className={classes.wrapper} onClick={handleClick}>
        <h1 className={classes.element}>SITS Database</h1>
      </nav>
      {!smileyFace ? (
        <AddField />
      ) : (
        <img
          style={{ display: "block", margin: "auto" }}
          alt="Be Happy :)"
          src={BeHappy}
          width="800px"
          height="800px"
        ></img>
      )}
    </div>
  );
}

export default App;
