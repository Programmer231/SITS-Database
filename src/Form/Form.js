import classes from "./NewMeetupForm.module.css";
import { useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import CheckBox from "./CheckBox/CheckBox";

const Form = (props) => {
  let isFirstRender = useRef(true);

  const [checkedData, setCheckedData] = useState({});

  const { certifications } = props;

  useEffect(() => {
    const finalChecks = {};

    for (let x of certifications) {
      finalChecks[x.type] = false;
    }

    setCheckedData({ ...finalChecks });
  }, [certifications]);

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    brand: "",
    website: "",
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

    let certificationInfo = {};

    for (let x in checkedData) {
      if (checkedData[x]) {
        certificationInfo[x] = true;
      } else {
        certificationInfo[x] = false;
      }
    }

    setFormData((prevState) => {
      return {
        ...prevState,
        ...certificationInfo,
      };
    });
    setSubmitted((prevState) => !prevState);
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      fetch("https://sits-practice-default-rtdb.firebaseio.com/.json", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        setFormData({
          brand: "",
          website: "",
          number: 0,
        });
        setCheckedData({});
      });
    } else {
      isFirstRender.current = false;
    }
  }, [submitted]);

  return (
    <div className={classes.contentWrapper}>
      <Card>
        <form
          className={classes.form}
          onSubmit={(event) => submitHandler(event)}
        >
          <div className={classes.control}>
            <label htmlFor="Brand">Part</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(event) => inputChangedHandler(event, "brand")}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="URL">Description</label>
            <input
              type="text"
              value={formData.website}
              onChange={(event) => inputChangedHandler(event, "website")}
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
