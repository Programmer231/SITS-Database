import classes from "./NewMeetupForm.module.css";
import { useState, useEffect } from "react";
import Card from "../UI/Card";
import CheckBox from "./CheckBox/CheckBox";

const Form = (props) => {
  const [checkedData, setCheckedData] = useState({});

  const { certifications } = props;

  useEffect(() => {
    const finalChecks = {};

    for (let x of certifications) {
      finalChecks[x.type] = false;
    }

    setCheckedData({ ...finalChecks });
  }, [certifications]);

  const [formData, setFormData] = useState({
    part: "",
    description: "",
    number: 0,
  });

  const inputChangedHandler = (event, name) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
  };

  const checkboxChangedHandler = (event, name) => {
    setCheckedData((prevState) => {
      return {
        ...prevState,
        [name]: !prevState[name],
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault(event);

    fetch("https://sits-practice-default-rtdb.firebaseio.com/.json", {
      method: "POST",
      body: JSON.stringify({ ...formData, ...checkedData }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setFormData({
        part: "",
        description: "",
        number: 0,
      });
      setCheckedData({});
    });
  };

  return (
    <div className={classes.contentWrapper}>
      <Card>
        <form
          className={classes.form}
          onSubmit={(event) => submitHandler(event)}
        >
          <div className={classes.control}>
            <label htmlFor="Part">Part</label>
            <input
              type="text"
              value={formData.part}
              onChange={(event) => inputChangedHandler(event, "part")}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="URL">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(event) => inputChangedHandler(event, "description")}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="URL">Number of Items</label>
            <input
              type="number"
              value={formData.number}
              onChange={(event) => inputChangedHandler(event, "number")}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="Info">Other Important Information</label>
            <div className={classes.displayCheckBoxWrapper}>
              {props.certifications.map((c) => (
                <CheckBox
                  key={c.id}
                  type={c.type}
                  myCheckboxChangedHandler={checkboxChangedHandler}
                  myCheckedData={checkedData}
                />
              ))}
            </div>
          </div>
          <div className={classes.actions}>
            <button type="submit">Submit</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Form;
