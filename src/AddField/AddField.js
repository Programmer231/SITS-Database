import Card from "../UI/Card";
import { useState, useEffect } from "react";
import classes from "./AddField.module.css";
import extraClasses from "../Form/NewMeetupForm.module.css";
import Form from "../Form/Form";
import DisplayField from "../Display/DisplayField";

const AddField = () => {
  const [addField, setAddField] = useState({ type: "", number: false, checkboxBoolean: false });

  const [certificationState, setCertificationState] = useState([]);

  const [searchPart, setSearchPart] = useState({ part: "" });

  const [partInfo, setPartInfo] = useState([]);

  const addFieldCheckboxChangedHandler = (name) => {
    setAddField(prevState => {
      return {
        ...prevState,
        number: false,
        checkboxBoolean: false,
        [name]: !prevState[name],
      }
    })
  }

  const submitAddField = () => {
    let certificationData = [];
    fetch(
      "https://sits-practice-default-rtdb.firebaseio.com/Certifications.json",
      {
        method: "POST",
        body: JSON.stringify(addField),
        headers: { "Content-Type": "application/json" },
      }
    ).then(() => {
      fetch(
        "https://sits-practice-default-rtdb.firebaseio.com/Certifications.json"
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          for (let key in data) {
            certificationData.push({ id: key, ...data[key] });
          }

          setCertificationState(certificationData);
        });
      setAddField({ type: "" });
    });
  };

  const submitSearchForm = () => {
    let partData = [];
    let query = `?orderBy="part"&indexOn="brand"&equalTo="${searchPart.part}"`;
    if (searchPart.part.length === 0) {
      fetch("https://sits-practice-default-rtdb.firebaseio.com/.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          for (let key in data) {
            if (!data[key].part) {
              continue;
            }
            partData.push({ id: key, ...data[key] });
          }
          setPartInfo(partData);
          setSearchPart({ part: "" });
        });
    } else {
      fetch("https://sits-practice-default-rtdb.firebaseio.com/.json" + query)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          for (let key in data) {
            partData.push({ id: key, ...data[key] });
          }
          setPartInfo(partData);
          setSearchPart({ part: "" });
        });
    }
  };

  const inputChangedHandler = (event) => {
    setAddField({
      type: event.target.value,
    });
  };

  const submitSearchHandler = (event) => {
    event.preventDefault();
    submitSearchForm();
  };

  const displayDataHandler = (event) => {
    setSearchPart({ part: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    submitAddField();
  };

  useEffect(() => {
    let certificationData = [];
    fetch(
      "https://sits-practice-default-rtdb.firebaseio.com/Certifications.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let key in data) {
          certificationData.push({ id: key, ...data[key] });
        }

        setCertificationState(certificationData);
      });
    setAddField({ type: "" });
  }, []);

  return (
    <div>
      <Form certifications={certificationState} />
      <div className={classes.centerMe}>
        <Card>
          <div className={classes.center}>
            <form onSubmit={(event) => submitHandler(event)}>
              <div className={extraClasses.control}>
                <label htmlFor="Field">Add a Field:</label>
                <input
                  type="text"
                  value={addField.type}
                  onChange={(event) => inputChangedHandler(event)}
                  required
                />
              </div>
              <div className = {classes.addFieldCheckbox}>
                <label htmlFor = "Number">Number</label>
              <input
                  type="checkbox"
                  value= "Number"
                  name = "number"
                  checked = {addField.number}
                  onChange = {() => addFieldCheckboxChangedHandler("number")}
                  required = {!(addField.number || addField.checkboxBoolean)}
              />

              <label htmlFor="Yes/No">YES/NO</label>
              <input
                  type="checkbox"
                  value= "YES/NO"
                  name = "yes/no"
                  checked = {addField.checkboxBoolean}
                  onChange = {() => addFieldCheckboxChangedHandler("checkboxBoolean")}
                  required = {!(addField.checkboxBoolean || addField.number)}
              />
              </div>
              <div className={classes.actions}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </Card>
      </div>
      <h1
        style={{
          textAlign: "center",
          borderBottom: "black solid 2px",
          marginTop: "5%",
        }}
      >
        Data
      </h1>

      <DisplayField
        inputChangedHandler={displayDataHandler}
        formData={searchPart}
        searchHandler={submitSearchHandler}
        searchedInfo={partInfo}
        certifications={certificationState}
        setSearchedInfo={setPartInfo}
      />
    </div>
  );
};

export default AddField;