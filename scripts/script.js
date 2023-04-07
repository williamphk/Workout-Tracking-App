window.onload = domReady;

function domReady() {
  //Get the HTML Element
  var formHandle = document.forms.inputForm;
  var calendar = document.getElementById("calendar");
  var achievement = document.getElementById("achievement");
  var month = document.getElementById("month");

  var targetDays;
  var totalDays = [];

  //For testing
  var setMonth;

  createCalendar();

  var chunkedTotalDays = chunkArray(totalDays);
  var workoutDays = [];

  //Create a copy of the 2d array of the calender
  for (let i = 0; i < chunkedTotalDays.length; i++) {
    workoutDays.push(new Array());
  }

  //Form handle
  formHandle.onsubmit = processForm;

  function processForm() {
    var targetField = formHandle.target;
    targetDays = targetField.value;
    return false;
  }

  month.innerHTML = getMonthName();

  function createCalendar() {
    //Previous Month
    for (
      var i = getRemainingDaysInPreviousMonth();
      i <= getDaysInPreviousMonth();
      i++
    ) {
      var day = document.createElement("div");
      day.classList.add("previous-month");
      day.classList.add("calendar-day");
      day.textContent = i;
      calendar.appendChild(day);
      day.addEventListener("click", toggleWorkoutDay);
      totalDays.push(i);
    }
    // Current Month
    for (var i = 1; i <= getDaysInCurrentMonth(); i++) {
      var day = document.createElement("div");
      day.classList.add("calendar-day");
      if (i == getToday()) {
        day.classList.add("today");
      }
      day.textContent = i;
      calendar.appendChild(day);
      day.addEventListener("click", toggleWorkoutDay);
      totalDays.push(i);
    }
    //Next Month
    for (var i = 1; i <= 6 - getWeekdayOfLastDayOfMonth(); i++) {
      var day = document.createElement("div");
      day.classList.add("next-month");
      day.classList.add("calendar-day");
      day.textContent = i;
      calendar.appendChild(day);
      day.addEventListener("click", toggleWorkoutDay);
      totalDays.push(i);
    }
  }

  var chunkedTotalDays = chunkArray(totalDays);

  function toggleWorkoutDay(event) {
    //Get which date the user is clicking
    var day = event.target;
    var dayNumber = parseInt(day.textContent);

    //Previous Month
    if (day.classList.contains("previous-month")) {
      //If the date has been selected
      if (day.classList.contains("workout")) {
        day.classList.remove("workout");
        workoutDays[0] = workoutDays[0].filter((d) => d !== dayNumber);
        console.log(workoutDays);
      } else {
        day.classList.add("workout");
        workoutDays[0].push(dayNumber);
        console.log(workoutDays);
      }
    }
    //Next Month
    else if (day.classList.contains("next-month")) {
      //If the date has been selected
      if (day.classList.contains("workout")) {
        day.classList.remove("workout");
        workoutDays[workoutDays.length - 1] = workoutDays[
          workoutDays.length - 1
        ].filter((d) => d !== dayNumber);
        console.log(workoutDays);
      }
      //If the date has not selected
      else {
        day.classList.add("workout");
        workoutDays[workoutDays.length - 1].push(dayNumber);
        console.log(workoutDays);
      }
    }
    //Current Month
    else {
      //Week 1
      if (dayNumber > 0 && dayNumber <= chunkedTotalDays[0][6]) {
        //If the date has been selected
        if (day.classList.contains("workout")) {
          day.classList.remove("workout");
          //Remove the element from the array
          workoutDays[0] = workoutDays[0].filter((d) => d !== dayNumber);
          console.log(workoutDays);
        }
        //If the date has not selected
        else {
          workoutDays[0].push(dayNumber);
          day.classList.add("workout");
          console.log(workoutDays);
        }
      }
      //Week 2
      else if (
        dayNumber > chunkedTotalDays[0][6] &&
        dayNumber <= chunkedTotalDays[1][6]
      ) {
        //If the date has been selected
        if (day.classList.contains("workout")) {
          day.classList.remove("workout");
          //Remove the element from the array
          workoutDays[1] = workoutDays[1].filter((d) => d !== dayNumber);
          console.log(workoutDays);
        }
        //If the date has not selected
        else {
          workoutDays[1].push(dayNumber);
          day.classList.add("workout");
          console.log(workoutDays);
        }
      }
      //Week 3
      else if (
        dayNumber > chunkedTotalDays[1][6] &&
        dayNumber <= chunkedTotalDays[2][6]
      ) {
        //If the date has been selected
        if (day.classList.contains("workout")) {
          day.classList.remove("workout");
          //Remove the element from the array
          workoutDays[2] = workoutDays[2].filter((d) => d !== dayNumber);
          console.log(workoutDays);
        }
        //If the date has not selected
        else {
          workoutDays[2].push(dayNumber);
          day.classList.add("workout");
          console.log(workoutDays);
        }
      }
      //Week 4
      else if (
        dayNumber > chunkedTotalDays[2][6] &&
        dayNumber <= chunkedTotalDays[3][6]
      ) {
        //If the date has been selected
        if (day.classList.contains("workout")) {
          day.classList.remove("workout");
          //Remove the element from the array
          workoutDays[3] = workoutDays[3].filter((d) => d !== dayNumber);
          console.log(workoutDays);
        }
        //If the date has not selected
        else {
          workoutDays[3].push(dayNumber);
          day.classList.add("workout");
          console.log(workoutDays);
        }
      }
      //Week 5
      else if (
        dayNumber > chunkedTotalDays[3][6] &&
        dayNumber <= chunkedTotalDays[4][6]
      ) {
        //If the date has been selected
        if (day.classList.contains("workout")) {
          day.classList.remove("workout");
          //Remove the element from the array
          workoutDays[4] = workoutDays[4].filter((d) => d !== dayNumber);
          console.log(workoutDays);
        }
        //If the date has not selected
        else {
          workoutDays[4].push(dayNumber);
          day.classList.add("workout");
          console.log(workoutDays);
        }
      }
      //Last week
      else if (
        dayNumber > chunkedTotalDays[4][6] &&
        dayNumber <= getDaysInCurrentMonth()
      ) {
        //If the date has been selected
        if (day.classList.contains("workout")) {
          day.classList.remove("workout");
          //Remove the element from the array
          workoutDays[workoutDays.length - 1] = workoutDays[
            workoutDays.length - 1
          ].filter((d) => d !== dayNumber);
          console.log(workoutDays);
        }
        //If the date has not selected
        else {
          workoutDays[workoutDays.length - 1].push(dayNumber);
          day.classList.add("workout");
          console.log(workoutDays);
        }
      }
    }
    checkAchievement();
  }

  //Check if the target is reached
  function checkAchievement() {
    console.log(targetDays);
    //Check if the target is reached in every weeks
    if (workoutDays.every((a) => a.length >= targetDays)) {
      achievement.style.display = "block";
    } else {
      achievement.style.display = "none";
    }
  }

  //Helper functions
  //Return the total number of days of the current month
  function getDaysInCurrentMonth() {
    var now = getMonth(setMonth);
    var year = now.getFullYear();
    var month = now.getMonth();
    return new Date(year, month + 1, 0).getDate();
  }
  //console.log("getDaysInCurrentMonth " + getDaysInCurrentMonth());

  //Return the weekday of the first date of the current month
  function getWeekdayOfFirstDayOfMonth() {
    var now = getMonth(setMonth);
    var year = now.getFullYear();
    var month = now.getMonth();
    var firstDayOfMonth = new Date(year, month, 1);
    return firstDayOfMonth.getDay();
  }
  //console.log("getWeekdayOfFirstDayOfMonth " + getWeekdayOfFirstDayOfMonth());

  //Return the total number of days of the previous month
  function getDaysInPreviousMonth() {
    var now = getMonth(setMonth);
    var year = now.getFullYear();
    var month = now.getMonth();
    return new Date(year, month, 0).getDate();
  }
  //console.log("getDaysInPreviousMonth " + getDaysInPreviousMonth());

  //Return the weekday of the last date of the current month
  function getWeekdayOfLastDayOfMonth() {
    var now = getMonth(setMonth);
    var year = now.getFullYear();
    var month = now.getMonth();
    var lastDayOfMonth = new Date(year, month, getDaysInCurrentMonth());
    return lastDayOfMonth.getDay();
  }
  //console.log("getWeekdayOfLastDayOfMonth " + getWeekdayOfLastDayOfMonth());

  //To calculate the starting date of the calender
  function getRemainingDaysInPreviousMonth() {
    var remainingDayInPreviousMonth =
      getDaysInPreviousMonth() - getWeekdayOfFirstDayOfMonth() + 1;
    return remainingDayInPreviousMonth;
  }

  //   console.log(
  //     "getRemainingDaysInPreviousMonth " + getRemainingDaysInPreviousMonth()
  //   );

  //For testing different month
  function getMonth(int) {
    if (!int) {
      return new Date();
    } else {
      var now = new Date();
      var year = now.getFullYear();
      var date = now.getDate();
      return new Date(year, int - 1, date);
    }
  }

  //return the Month name
  function getMonthName() {
    var month = getMonth(setMonth).toLocaleString("default", {
      month: "long",
    });
    return month;
  }

  //return the date of Today
  function getToday() {
    var now = new Date();
    return now.getDate();
  }

  //divide the array into a 2d array with each array containing max 7 elements
  function chunkArray(arr, chunkSize = 7) {
    var chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
