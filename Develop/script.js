// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  var now = dayjs();
  let hour = dayjs().hour();

  $("#current-Day").text(now)

  $("#bts").click(function () {
    alert("Time to Grind!");
    console.log("hey!");
  });
});

// save button functionality
$(".saveBtn").click(function () {
  // get plans from localstorage
  var localPlans = getPlan();
  // grab the container associated with the specific save button
  var container = $(this).closest('.time-block');
  // grab the id from the time-block container
  var id = container.attr('id');
  // attach the id to the text to be saved
  var plan = id + container.find('.description').val();
  // push the text to be saved to our plans array
  localPlans.push(plan);
  // save the array to localstorage
  localStorage.setItem('plans', JSON.stringify(localPlans));
  console.log(localPlans);
});

function getPlan() {
  var plans = localStorage.getItem('plans');
  if(plans) {
    plans = JSON.parse(plans);
  } else {
    plans = [];
  }
  return plans;
}





// $(document).ready(function () {
//   // Get the input field and save button
//   var inputField = $(".Description");
//   var saveButton = $(".saveBtn");

//   // Add a click event to the save button
//   saveBtn.click(function () {
//     // Get the current input value
//     var inputValue = inputField.val();

//     // Get the current date and time using Day.js
//     var currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");

//     // Save the input value and date to local storage
//     localStorage.setItem("inputValue", inputValue);
//     localStorage.setItem("inputDate", currentDate);
//   });
// });


let block = $(".time-block");
let blockHour = $(".hour").text().charAt(0);

// for each time block
$(".time-block").each(function() {
  // get the plans from localstorage
  var localPlans = getPlan();
  // for each plan in localstorage
  for(var i = 0; i < localPlans.length; i++) {
    // grab its id (ex: 'hour-4')
    var match = localPlans[i].match(/hour-[1-9]/);
    // if a plans' id matches our time-blocks id
    if(match[0].toString() == $(this).attr('id').toString()) {
      // set the text in our time-block to that plan
      $(this).find('.description').val(localPlans[i].substring(6, localPlans[i].length));
    }
  }

  // set each timeblocks color
  var hourText = $(this).find('.hour').text();
  // get the time of each block into military time
  var timeHour = toMilitaryTime(hourText);
  // get the current hour
  var hour = dayjs().hour();

  // give each timeblock its appropriate time
  if(timeHour < hour) {
    $(this).addClass('past');
  } else if(timeHour == hour) {
    $(this).addClass('present');
  } else if(timeHour > hour){
    $(this).addClass('future');
  }

})

// function to turn text like '4PM' to military time
function toMilitaryTime(time) {
  var hour = parseInt(time, 10);
  var isPM = time.indexOf('pm') > -1 || time.indexOf('PM') > -1;
  
  if (hour === 12 && !isPM) {
    hour = 0;
  } else if (isPM) {
    hour += 12;
  }

  return hour;
}