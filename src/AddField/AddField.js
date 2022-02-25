import Card from "../UI/Card";
import { useState, useEffect, useRef } from "react";
import classes from "./AddField.module.css";
import extraClasses from "../Form/NewMeetupForm.module.css";
import Form from "../Form/Form";
import DisplayField from "../Display/DisplayField";
import moreClasses from "../Display/DisplayField.module.css";

const AddField = () => {
  const [addField, setAddField] = useState({
    type: "",
    number: false,
    checkboxBoolean: false,
  });

  const [certificationState, setCertificationState] = useState([]);

  const [searchPart, setSearchPart] = useState({ part: "" });

  const [partSchoolInfo, setPartSchoolInfo] = useState([]);
  const [partSITSInfo, setPartSITSInfo] = useState([]);

  const searchRef = useRef();
  const partSchoolDataConstant = useRef();
  const partSITSDataConstant = useRef();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      const timer = setTimeout(() => {
        if (searchPart.part === searchRef.current.value) {
          let newDataSchoolInfo = [];
          let newDataSITSInfo = [];
          let counter = false;
          let SITSCounter = false;
          for (let x of partSchoolDataConstant.current) {
            for(let word of x.part.split(" ")){
              for(let letter = 0; letter < word.length; letter ++){
                if (
                  word.substring(letter, searchRef.current.value.trim().length + letter).toLowerCase() ===
                  searchRef.current.value.trim().toLowerCase()
                ) {
                  newDataSchoolInfo.push(x);
                  counter = true;
                  break;
                }
              }
              if(counter){
                counter = false;
                break;
              }
            };
          }
          for (let y of partSITSDataConstant.current) {
            for(let word of y.part.split(" ")) {
              for(let letter = 0; letter < word.length; letter ++){
                if (
                  word.substring(letter, searchRef.current.value.trim().length + letter).toLowerCase() ===
                  searchRef.current.value.trim().toLowerCase()
                ) {
                  newDataSITSInfo.push(y);
                  SITSCounter = true;
                  break;
                }
              }
              if(SITSCounter){
                SITSCounter = false;
                break;
              }
            };
          }
          setPartSchoolInfo([...newDataSchoolInfo]);
          setPartSITSInfo([...newDataSITSInfo]);
          newDataSchoolInfo = [];
          newDataSITSInfo = [];
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchPart, searchRef, partSchoolDataConstant, partSITSDataConstant]);

  useEffect(() => {
    let partSchoolData = [];
    let partSITSData = [];

    fetch("https://sits-practice-default-rtdb.firebaseio.com/School.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let key in data) {
          if (!data[key].part) {
            continue;
          }
          partSchoolData.push({ id: key, ...data[key] });
        }
        setPartSchoolInfo(partSchoolData);
        partSchoolDataConstant.current = [...partSchoolData];
      });

    fetch("https://sits-practice-default-rtdb.firebaseio.com/SITS.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let key in data) {
          if (!data[key].part) {
            continue;
          }
          partSITSData.push({ id: key, ...data[key] });
        }
        setPartSITSInfo(partSITSData);
        partSITSDataConstant.current = [...partSITSData];
      });
  }, []);

  const addFieldCheckboxChangedHandler = (name) => {
    setAddField((prevState) => {
      return {
        ...prevState,
        number: false,
        checkboxBoolean: false,
        [name]: !prevState[name],
      };
    });
  };

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
      setAddField({ type: "", number: false, checkboxBoolean: false });
    });
  };

  const inputChangedHandler = (event) => {
    setAddField({
      type: event.target.value,
    });
  };

  const searchPartChangedHandler = (event) => {
    setSearchPart({
      part: event.target.value,
    });
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
    setAddField({ type: "", number: false, checkboxBoolean: false });
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
              <div className={classes.addFieldCheckbox}>
                <label htmlFor="Number">Number</label>
                <input
                  type="checkbox"
                  value="Number"
                  name="number"
                  checked={addField.number}
                  onChange={() => addFieldCheckboxChangedHandler("number")}
                  required={!(addField.number || addField.checkboxBoolean)}
                />

                <label htmlFor="Yes/No">YES/NO</label>
                <input
                  type="checkbox"
                  value="YES/NO"
                  name="yes/no"
                  checked={addField.checkboxBoolean}
                  onChange={() =>
                    addFieldCheckboxChangedHandler("checkboxBoolean")
                  }
                  required={!(addField.checkboxBoolean || addField.number)}
                />
              </div>
              <div className={classes.actions}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </Card>
        <div className={classes.spaceOutSearchField}>
          <Card>
            <div className={moreClasses.wrap}>
                <div className={classes.control}>
                  <label htmlFor="Part">Search a Part:</label>
                  <input
                    type="text"
                    value={searchPart.part}
                    onChange={(event) => searchPartChangedHandler(event)}
                    ref={searchRef}
                  />
                </div>
            </div>
          </Card>
        </div>
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
      {
        <DisplayField
          inputChangedHandler={displayDataHandler}
          formData={searchPart}
          searchedSchoolInfo={partSchoolInfo}
          searchedSITSInfo={partSITSInfo}
          certifications={certificationState}
          setSearchedSchoolInfo={setPartSchoolInfo}
          setSearchedSITSInfo={setPartSITSInfo}
        />
      }
    </div>
  );
};

export default AddField;
