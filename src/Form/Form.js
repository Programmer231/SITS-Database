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
    price: 0,
    totalPrice: 0,
    PCEPTagNumber: 0,
    assetTagNumber: 0,
    serialNumber: 0,
    purpose: "",
    type: "",
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
              name="Part"
              type="text"
              value={formData.part}
              onChange={(event) => inputChangedHandler(event, "part")}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={(event) => inputChangedHandler(event, "description")}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="serial">Serial Number</label>
            <input
              name="serial"
              type="number"
              value={formData.serialNumber}
              onChange={(event) => inputChangedHandler(event, "serialNumber")}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="asset tag">Asset Tag Number</label>
            <input
              name="asset tag"
              type="number"
              value={formData.assetTagNumber}
              onChange={(event) => inputChangedHandler(event, "assetTagNumber")}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="PCEP tag">PCEP Tag Number</label>
            <input
              name="PCEP tag"
              type="number"
              value={formData.PCEPTagNumber}
              onChange={(event) => inputChangedHandler(event, "PCEPTagNumber")}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="price">Price</label>
            <input
              name="Price"
              type="number"
              value={formData.price}
              onChange={(event) => inputChangedHandler(event, "price")}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="quantity">Number of Items</label>
            <input
              name="quantity"
              type="number"
              value={formData.number}
              onChange={(event) => inputChangedHandler(event, "number")}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="total price">Total Price</label>
            <input
              name="total price"
              type="number"
              value={formData.number * formData.price}
              onChange={(event) => inputChangedHandler(event, "totalPrice")}
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
