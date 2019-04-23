// YOUR CODE HERE!

// Get references to the tbody element, input fields and buttons
var tbody = document.querySelector("tbody");
var datetimeInput = document.querySelector("#datetime");
var cityInput = document.querySelector("#city");
var stateInput = document.querySelector("#state");
var countryInput = document.querySelector("#country");
var shapeInput = document.querySelector("#shape");
var commentsInput = document.querySelector("#comments");
var searchBtn = document.querySelector("#search");
var submitBtn = document.querySelector("#submit");
var resetBtn = document.querySelector("#reset");

// Add an event listener to the buttons, call function when clicked
searchBtn.addEventListener("click", handleSearchButtonClick);
submitBtn.addEventListener("click", handleSubmitButtonClick);
resetBtn.addEventListener("click", handleResetButtonClick);

// Initialize Dataset for filteredData
var filteredDataSet = dataSet;

// renderTable renders the filtereDataSet to the tbody
function renderTable() {
  tbody.innerHTML = "";
  console.log("Rendering")

  for (var i = 0; i < filteredDataSet.length; i++) {
    // Get the current sighting object and its fields
    var data = filteredDataSet[i];
    var fields = Object.keys(data);

    // Create a new row in the tbody, set index to be i + startingIndex
    var row = tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create new cell and set its inner text to be the current value at the current address's field
      var field = fields[j];
      var cell = row.insertCell(j);
      cell.innerText = data[field];
    }
  }
  console.log("I pity the fool who doesn't Render " + filteredDataSet.length)
}
// Render table on page load
renderTable();

function handleResetButtonClick() {
   // Clear input fields
   datetimeInput.value = "";
   cityInput.value = "";
   stateInput.value = "";
   countryInput.value = "";
   shapeInput.value = "";
   commentsInput.value = "";
   handleSearchButtonClick();
}

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

// Search existing UFO info
function handleSearchButtonClick() {
  // Format user's search by removing leading and trailing whitespace, lowercase string
  var filterDatetime = datetimeInput.value.trim().toLowerCase();
  var filterCity = cityInput.value.trim().toLowerCase();
  var filterState = stateInput.value.trim().toLowerCase();
  var filterCountry = countryInput.value.trim().toLowerCase();
  var filterShapes = getSelectValues(shapeInput);
  var filterComments = commentsInput.value.trim().toLowerCase();
  
  // Set filteredDataSet to an array of all addresses whose "state" matches the filter
  filteredDataSet = dataSet.filter(function(data) {
    var dateDatetime = String(data.datetime).toLowerCase();
    var cityField = String(data.city).toLowerCase();
    var stateField = String(data.state).toLowerCase();
    var countryField = String(data.country).toLowerCase();
    var shapeField = String(data.shape).toLowerCase();
    var commentsField = String(data.comments).toLowerCase();

    var validRecord = 
    (filterDatetime.length === 0 || dateDatetime === filterDatetime) &&
    (filterCity.length === 0 || cityField.includes(filterCity)) &&
    (filterState.length === 0 || stateField === filterState) &&
    (filterCountry.length === 0 || countryField.includes === filterCountry) &&
    (filterShapes.length === 0 || filterShapes.includes(shapeField)) &&
    (filterComments.length === 0 || commentsField.includes(filterComments)); 
    
    return validRecord;
  });
  console.log("filtered: " + filteredDataSet.length);
  renderTable();
}

// Enter a new UFO info and Submit
function handleSubmitButtonClick(event) {
  // The default behavior of a button clicked inside of a form is to try and submit the form somewhere (which we don't want)
  event.preventDefault();

 var newUFO = {
    datetime: datetimeInput.value.trim(),
    city: cityInput.value.trim(),
    state: stateInput.value.trim(),
    country: countryInput.value.trim(),
    shape: shapeInput.value.trim(),
    comments: commentsInput.value.trim()
  }

  if (newUFO.datetime !=0) {
    filteredDataSet.push(newUFO);
  }
  renderTable();
  handleResetButtonClick();
}
