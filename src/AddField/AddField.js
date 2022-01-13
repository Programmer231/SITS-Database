import Card from "../UI/Card";
import { useState, useRef, useEffect } from "react";
import classes from "./AddField.module.css";
import extraClasses from "../Form/NewMeetupForm.module.css";
import Form from "../Form/Form";
import DisplayField from "../Display/DisplayField";

const AddField = () => {
  const [submitted, setSubmitted] = useState(false);

  const firstRender = useRef(false);

  const [addField, setAddField] = useState({ type: "" });

  const [certificationState, setCertificationState] = useState([]);

  const [searchPart, setSearchPart] = useState({ part: "" });

  const [submittedSearch, setSubmittedSearch] = useState(false);

  const [partInfo, setPartInfo] = useState([]);

  const inputChangedHandler = (event) => {
    setAddField({
      type: event.target.value,
    });
  };

  const submitSearchHandler = (event) => {
    event.preventDefault();
    setSubmittedSearch((prevState) => !prevState);
  };

  const displayDataHandler = (event) => {
    setSearchPart({ part: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setSubmitted((prevState) => !prevState);
  };

  useEffect(() => {
    let certificationData = [];
    if (firstRender.current) {
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
    } else {
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
    }
  }, [submitted]);

  useEffect(() => {
    let partData = [];
    if (firstRender.current) {
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
    }

    firstRender.current = true;
  }, [submittedSearch]);

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
        submittedData={submitted}
      />
    </div>
  );
};

export default AddField;
