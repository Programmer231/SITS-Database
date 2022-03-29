import Card from "../UI/Card";
import { useState, useEffect, useRef, useCallback } from "react";
import classes from "./AddField.module.css";
import extraClasses from "../Form/NewMeetupForm.module.css";
import Form from "../Form/Form";
import DisplayField from "../Display/DisplayField";
import moreClasses from "../Display/DisplayField.module.css";
import MainFilter from "../Filter/MainFilterComponent";
import Sort from "../Sort/Sort";
import BarcodeReader from "react-barcode-reader";

const AddField = () => {
  const [addField, setAddField] = useState({
    type: "",
    number: false,
    checkboxBoolean: false,
  });

  const [certificationState, setCertificationState] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortItems, setSortItems] = useState({});
  const [searchPart, setSearchPart] = useState({ part: "" });

  const [partSchoolInfo, setPartSchoolInfo] = useState([]);
  const [partSITSInfo, setPartSITSInfo] = useState([]);
  const [schoolOldData, setSchoolOldData] = useState([]);
  const [SITSOldData, setSITSOldData] = useState([]);
  const searchRef = useRef();
  const partSchoolDataConstant = useRef();
  const partSITSDataConstant = useRef();

  const handleScan = (data) => {
    console.log(data);
    setFilters([
      {
        type: "number",
        sign: "=",
        dataValue: "PCEPTagNumber",
        readValue: "PCEP Tag Number",
        number: data,
      },
    ]);
  };

  const handlerError = (err) => {
    console.log(err);
  };

  const searchFunction = (search) => {
    setTimeout(() => {
      if (search === searchRef.current.value) {
        let newDataSchoolInfo = [];
        let newDataSITSInfo = [];
        let counter = false;
        let SITSCounter = false;
        for (let x of partSchoolDataConstant.current) {
          for (let word of x.part.split(" ")) {
            for (let letter = 0; letter < word.length; letter++) {
              if (
                word
                  .substring(
                    letter,
                    searchRef.current.value.trim().length + letter
                  )
                  .toString()
                  .toLowerCase() ===
                searchRef.current.value.trim().toString().toLowerCase()
              ) {
                newDataSchoolInfo.push(x);
                counter = true;
                break;
              }
            }
            if (counter) {
              counter = false;
              break;
            }
          }
        }
        for (let y of partSITSDataConstant.current) {
          for (let word of y.part.split(" ")) {
            for (let letter = 0; letter < word.length; letter++) {
              if (
                word
                  .substring(
                    letter,
                    searchRef.current.value.trim().length + letter
                  )
                  .toString()
                  .toLowerCase() ===
                searchRef.current.value.trim().toString().toLowerCase()
              ) {
                newDataSITSInfo.push(y);
                SITSCounter = true;
                break;
              }
            }
            if (SITSCounter) {
              SITSCounter = false;
              break;
            }
          }
        }
        setPartSchoolInfo([...newDataSchoolInfo]);
        setPartSITSInfo([...newDataSITSInfo]);
        setSchoolOldData([...newDataSchoolInfo]);
        setSITSOldData([...newDataSITSInfo]);
        newDataSchoolInfo = [];
        newDataSITSInfo = [];
      }
    }, 1000);
  };

  useEffect(() => {
    let partSchoolData = [];
    let partSITSData = [];

    fetch(
      "https://sits-practice-default-rtdb.firebaseio.com/School/-MwwnSmoggPm4EINVQKA.json"
    )
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
        setPartSchoolInfo([...partSchoolData]);
        partSchoolDataConstant.current = [...partSchoolData];
        setSchoolOldData([...partSchoolData]);
      });

    fetch(
      "https://sits-practice-default-rtdb.firebaseio.com/SITS/-Mz3Dj7E2lP_nWu-EPl5.json"
    )
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
        setPartSITSInfo([...partSITSData]);
        partSITSDataConstant.current = [...partSITSData];
        setSITSOldData([...partSITSData]);
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

  const sortMyItems = (item) => {
    setSortItems({ ...item });
  };

  const deleteSortItem = () => {
    setSortItems({});
  };

  const sortData = useCallback((schoolData, SITSData, sortItems) => {
    if (!sortItems) {
      return;
    }

    let newDataSchoolSortedInfo = [...schoolData];
    let newDataSITSSortedInfo = [...SITSData];
    if (sortItems.dataValue === "totalPrice") {
      for (let x = 0; x < newDataSchoolSortedInfo.length; x++) {
        let key = newDataSchoolSortedInfo[x];
        let compare =
          (newDataSchoolSortedInfo[x].number || 0) *
          (newDataSchoolSortedInfo[x].price || 0);
        let j = x - 1;
        if (sortItems.ascending) {
          while (
            j >= 0 &&
            (newDataSchoolSortedInfo[j].number || 0) *
              (newDataSchoolSortedInfo[j].price || 0) >
              compare
          ) {
            newDataSchoolSortedInfo[j + 1] = newDataSchoolSortedInfo[j];
            j--;
          }
        } else {
          while (
            j >= 0 &&
            (newDataSchoolSortedInfo[j].number || 0) *
              (newDataSchoolSortedInfo[j].price || 0) <
              compare
          ) {
            newDataSchoolSortedInfo[j + 1] = newDataSchoolSortedInfo[j];
            j--;
          }
        }
        newDataSchoolSortedInfo[j + 1] = { ...key };
      }
      for (let x = 0; x < newDataSITSSortedInfo.length; x++) {
        let key = newDataSITSSortedInfo[x];
        let compare =
          (newDataSITSSortedInfo[x].number || 0) *
          (newDataSITSSortedInfo[x].price || 0);
        let j = x - 1;
        if (sortItems.ascending) {
          while (
            j >= 0 &&
            (newDataSITSSortedInfo[j].number || 0) *
              (newDataSITSSortedInfo[j].price || 0) >
              compare
          ) {
            newDataSITSSortedInfo[j + 1] = newDataSITSSortedInfo[j];
            j--;
          }
        } else {
          while (
            j >= 0 &&
            (newDataSITSSortedInfo[j].number || 0) *
              (newDataSITSSortedInfo[j].price || 0) <
              compare
          ) {
            newDataSITSSortedInfo[j + 1] = newDataSITSSortedInfo[j];
            j--;
          }
        }
        newDataSITSSortedInfo[j + 1] = { ...key };
      }
    } else {
      for (let x = 0; x < newDataSchoolSortedInfo.length; x++) {
        let key = newDataSchoolSortedInfo[x];
        let compare = newDataSchoolSortedInfo[x][sortItems.dataValue] || 0;
        let j = x - 1;

        if (sortItems.ascending) {
          while (
            j >= 0 &&
            (newDataSchoolSortedInfo[j][sortItems.dataValue] || 0) > compare
          ) {
            newDataSchoolSortedInfo[j + 1] = newDataSchoolSortedInfo[j];
            j--;
          }
        } else {
          while (
            j >= 0 &&
            (newDataSchoolSortedInfo[j][sortItems.dataValue] || 0) < compare
          ) {
            newDataSchoolSortedInfo[j + 1] = newDataSchoolSortedInfo[j];
            j--;
          }
        }

        newDataSchoolSortedInfo[j + 1] = { ...key };
      }
      for (let x = 0; x < newDataSITSSortedInfo.length; x++) {
        let key = newDataSITSSortedInfo[x];
        let compare = newDataSITSSortedInfo[x][sortItems.dataValue] || 0;
        let j = x - 1;

        if (sortItems.ascending) {
          while (
            j >= 0 &&
            (newDataSITSSortedInfo[j][sortItems.dataValue] || 0) > compare
          ) {
            newDataSITSSortedInfo[j + 1] = newDataSITSSortedInfo[j];
            j--;
          }
        } else {
          while (
            j >= 0 &&
            (newDataSITSSortedInfo[j][sortItems.dataValue] || 0) < compare
          ) {
            newDataSITSSortedInfo[j + 1] = newDataSITSSortedInfo[j];
            j--;
          }
        }

        newDataSITSSortedInfo[j + 1] = { ...key };
      }
    }

    console.log(newDataSchoolSortedInfo);
    setPartSchoolInfo([...newDataSchoolSortedInfo]);
    setPartSITSInfo([...newDataSITSSortedInfo]);
    return;
  }, []);

  const filterAllData = useCallback(
    (schoolData, SITSData, filter, filterCount, allFilters, sortItems) => {
      if (!filter) {
        sortData(schoolData, SITSData, sortItems);
        return;
      }
      let newDataSchoolInfo = [];
      let newDataSITSInfo = [];
      let z = { ...filter };
      if (z.type === "text") {
        let counter = false;
        let SITSCounter = false;
        for (let x of schoolData) {
          if (!x[z.dataValue]) {
            continue;
          }
          for (let word of x[z.dataValue].toString().split(" ")) {
            for (let letter = 0; letter < word.length; letter++) {
              if (
                word
                  .substring(letter, z.text.trim().length + letter)
                  .toString()
                  .toLowerCase() === z.text.trim().toString().toLowerCase()
              ) {
                newDataSchoolInfo.push(x);
                counter = true;
                break;
              }
            }
            if (counter) {
              counter = false;
              break;
            }
          }
        }
        for (let y of SITSData) {
          if (!y[z.dataValue]) {
            continue;
          }
          for (let word of y[z.dataValue].toString().split(" ")) {
            for (let letter = 0; letter < word.length; letter++) {
              if (
                word
                  .substring(letter, z.text.trim().length + letter)
                  .toString()
                  .toLowerCase() === z.text.trim().toString().toLowerCase()
              ) {
                newDataSITSInfo.push(y);
                SITSCounter = true;
                break;
              }
            }
            if (SITSCounter) {
              SITSCounter = false;
              break;
            }
          }
        }
      } else if (z.type === "number") {
        if (z.dataValue === "totalPrice") {
          if (z.sign === ">") {
            for (let item of schoolData) {
              if ((item.price || 0) * (item.number || 0) > z.number) {
                newDataSchoolInfo.push(item);
              }
            }
            for (let item of SITSData) {
              if ((item.price || 0) * (item.number || 0) > z.number) {
                newDataSITSInfo.push(item);
              }
            }
          } else if (z.sign === "<") {
            for (let item of schoolData) {
              if ((item.price || 0) * (item.number || 0) < z.number) {
                newDataSchoolInfo.push(item);
              }
            }
            for (let item of SITSData) {
              if ((item.price || 0) * (item.number || 0) < z.number) {
                newDataSITSInfo.push(item);
              }
            }
          } else if (z.sign === "=") {
            for (let item of schoolData) {
              if ((item.price || 0) * (item.number || 0) === z.number) {
                newDataSchoolInfo.push(item);
              }
            }
            for (let item of SITSData) {
              if ((item.price || 0) * (item.number || 0) === z.number) {
                newDataSITSInfo.push(item);
              }
            }
          }
        }
        if (z.sign === ">") {
          for (let item of schoolData) {
            if ((item[z.dataValue] || 0) > z.number) {
              newDataSchoolInfo.push(item);
            }
          }
          for (let item of SITSData) {
            if ((item[z.dataValue] || 0) > z.number) {
              newDataSITSInfo.push(item);
            }
          }
        } else if (z.sign === "<") {
          for (let item of schoolData) {
            if ((item[z.dataValue] || 0) < z.number) {
              newDataSchoolInfo.push(item);
            }
          }
          for (let item of SITSData) {
            if ((item[z.dataValue] || 0) < z.number) {
              newDataSITSInfo.push(item);
            }
          }
        } else if (z.sign === "=") {
          for (let item of schoolData) {
            if ((item[z.dataValue] || 0) === z.number) {
              newDataSchoolInfo.push(item);
            }
          }
          for (let item of SITSData) {
            if ((item[z.dataValue] || 0) === z.number) {
              newDataSITSInfo.push(item);
            }
          }
        }
      }

      filterCount++;

      if (z.readValue === allFilters[allFilters.length - 1].readValue) {
        console.log(newDataSITSInfo);
        sortData([...newDataSchoolInfo], [...newDataSITSInfo], sortItems);
        return;
      } else {
        filterAllData(
          [...newDataSchoolInfo],
          [...newDataSITSInfo],
          allFilters[filterCount],
          filterCount,
          allFilters,
          sortItems
        );
      }
    },
    [sortData]
  );

  useEffect(() => {
    filterAllData(
      schoolOldData,
      SITSOldData,
      filters[0],
      0,
      filters,
      sortItems
    );
  }, [filters, schoolOldData, SITSOldData, filterAllData, sortItems, sortData]);

  const addFilter = (filter) => {
    for (let x of filters) {
      if (x.dataValue === filter.dataValue) {
        return;
      }
    }

    setFilters((prevState) => [...prevState, filter]);
  };

  const deleteFilter = (name) => {
    setFilters((prevState) =>
      prevState.filter((filter) => name !== filter.readValue)
    );

    if (filters.length === 1) {
      return;
    }
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

    searchFunction(event.target.value);
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
      <BarcodeReader onScan={handleScan} onError={handlerError} />
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
      </div>
      <div className={classes.mainFilterStyles}>
        <MainFilter
          addFilter={addFilter}
          deleteFilter={deleteFilter}
          filters={filters}
        />
      </div>
      <div className={classes.mainFilterStyles}>
        <Sort
          addSort={sortMyItems}
          sort={sortItems}
          deleteSort={deleteSortItem}
        />
      </div>

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
