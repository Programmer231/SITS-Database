//code to retrieve data when updating firebase by importing excel spreadsheet

let sitsData = {};

fetch("https://sits-practice-default-rtdb.firebaseio.com/SITS/SITS.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    for (let x of data) {
      console.log(v4());
      sitsData[v4()] = x;
    }
    fetch("https://sits-practice-default-rtdb.firebaseio.com/SITS/SITS.json", {
      method: "DELETE",
    });
    fetch("https://sits-practice-default-rtdb.firebaseio.com/SITS.json", {
      method: "POST",
      body: JSON.stringify(sitsData),
      headers: { "Content-type": "applicatoin/json" },
    });
  });
