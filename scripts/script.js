window.onload = domReady;

function domReady() {
  //Get the HTML Element
  var formHandle = document.forms.inputForm;
  var achievement = document.getElementById("achievement");
  var month = document.getElementById("month");
  var rows = document.getElementById("tBody").children;
  var weekOne = document.getElementById("weekOne");
  var weekTwo = document.getElementById("weekTwo");
  var weekThree = document.getElementById("weekThree");
  var weekFour = document.getElementById("weekFour");
  var weekFive = document.getElementById("weekFive");
  var lastWeek;

  //For testing different month
  //Example January: setMonth = 1
  var setMonth;
  var targetDays;

  //Form handle
  formHandle.onsubmit = processForm;

  function processForm() {
    var targetField = formHandle.target;
    targetDays = targetField.value;
    return false;
  }

  month.innerHTML = getMonthName();

  var totalDays = [];
  createArrayOfTheMonth();

  //Save the remaining dates in the previous months, all dates in the current month and the reamining dates in the next month into the totalDays array
  //For example the April 2023:
  //[26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6]

  function createArrayOfTheMonth() {
    //Add the remaining dates in previous month to the totalDays array
    for (
      var i = getRemainingDaysInPreviousMonth();
      i <= getDaysInPreviousMonth();
      i++
    ) {
      totalDays.push(i);
    }
    //Add all the dates in current month to the totalDays array
    for (var i = 1; i <= getDaysInCurrentMonth(); i++) {
      totalDays.push(i);
    }
    //Add the remaining dates in next month to the totalDays array
    for (var i = 1; i <= 6 - getWeekdayOfLastDayOfMonth(); i++) {
      totalDays.push(i);
    }
  }

  //Create a chunked 2d array with 7 elements in each array with the totolDays array
  //For example the April 2023:
  //[
  //  [26, 27, 28, 29, 30, 31, 1],
  //  [2, 3, 4, 5, 6, 7, 8],
  //  [9, 10, 11, 12, 13, 14, 15],
  //  [16, 17, 18, 19, 20, 21, 22],
  //  [23, 24, 25, 26, 27, 28, 29],
  //  [30, 1, 2, 3, 4, 5, 6],
  //]
  var chunkedTotalDays = chunkArray(totalDays);

  //Determine the last week of the month
  if (chunkedTotalDays.length == 4) {
    lastWeek = document.getElementById("weekFour");
  } else if (chunkedTotalDays.length == 5) {
    lastWeek = document.getElementById("weekFive");
  } else if (chunkedTotalDays.length == 6) {
    lastWeek = document.getElementById("weekSix");
  }

  //Create Calendar
  createCalendar();

  function createCalendar() {
    //Create a button element for the dates in previous month
    for (
      var i = getRemainingDaysInPreviousMonth();
      i <= getDaysInPreviousMonth();
      i++
    ) {
      var td = document.createElement("td");
      var day = document.createElement("button");
      day.classList.add("previous-month");
      day.classList.add("calendar-day");
      day.textContent = i;
      td.appendChild(day);
      //Dates in previous month must be in week one
      weekOne.appendChild(td);
      day.addEventListener("click", toggleWorkoutDay);
    }
    //Create a button element for the dates in current month
    for (var i = 1; i <= getDaysInCurrentMonth(); i++) {
      var td = document.createElement("td");
      var day = document.createElement("button");
      day.classList.add("calendar-day");
      if (i == getToday()) {
        day.classList.add("today");
      }
      day.textContent = i;
      td.appendChild(day);
      if (i > 0 && i <= chunkedTotalDays[0][6]) {
        weekOne.appendChild(td);
      } else if (i > 0 && i <= chunkedTotalDays[1][6]) {
        weekTwo.appendChild(td);
      } else if (i > 0 && i <= chunkedTotalDays[2][6]) {
        weekThree.appendChild(td);
      } else if (i > 0 && i <= chunkedTotalDays[3][6]) {
        weekFour.appendChild(td);
      } else if (i > 0 && i <= chunkedTotalDays[4][6]) {
        weekFive.appendChild(td);
      } else if (i > 0 && i <= getDaysInCurrentMonth()) {
        lastWeek.appendChild(td);
      }
      day.addEventListener("click", toggleWorkoutDay);
    }
    //Create a button element for the dates in next month
    for (var i = 1; i <= 6 - getWeekdayOfLastDayOfMonth(); i++) {
      var td = document.createElement("td");
      var day = document.createElement("button");
      day.classList.add("next-month");
      day.classList.add("calendar-day");
      day.textContent = i;
      td.appendChild(day);
      //Dates in previous month must be in last week
      lastWeek.appendChild(td);
      day.addEventListener("click", toggleWorkoutDay);
    }
  }

  var workoutDays = [];

  //Create a emtpy copy of the 2d array of the calender
  for (let i = 0; i < chunkedTotalDays.length; i++) {
    workoutDays.push(new Array());
  }

  //Add achievement div at the end of each week
  for (var i = 0; i < chunkedTotalDays.length; i++) {
    var weeklyAchievement = document.createElement("div");
    weeklyAchievement.className = "weekly-achievement";
    var td = document.createElement("td");
    td.appendChild(weeklyAchievement);
    rows[i].appendChild(td);
  }

  function toggleWorkoutDay(event) {
    //Get which date the user is clicking
    var day = event.target;
    var dayNumber = parseInt(day.textContent);

    //If the user is clicking the dates in previous month
    if (day.classList.contains("previous-month")) {
      //If the date has been selected
      if (day.classList.contains("workout")) {
        day.classList.remove("workout");
        workoutDays[0] = workoutDays[0].filter((d) => d !== dayNumber);
        //console.log(workoutDays);
        //If the date has not been selected
      } else {
        day.classList.add("workout");
        workoutDays[0].push(dayNumber);
        //console.log(workoutDays);
      }
    }
    //If the user is clicking the dates in next month
    else if (day.classList.contains("next-month")) {
      //If the date has been selected
      if (day.classList.contains("workout")) {
        day.classList.remove("workout");
        workoutDays[workoutDays.length - 1] = workoutDays[
          workoutDays.length - 1
        ].filter((d) => d !== dayNumber);
        //console.log(workoutDays);
      }
      //If the date has not been selected
      else {
        day.classList.add("workout");
        workoutDays[workoutDays.length - 1].push(dayNumber);
        console.log(workoutDays);
      }
    }
    //If the user is clicking the dates in next current month
    else {
      //Week 1
      if (dayNumber > 0 && dayNumber <= chunkedTotalDays[0][6]) {
        //If the date has been selected
        if (day.classList.contains("workout")) {
          day.classList.remove("workout");
          //Remove the element from the array
          workoutDays[0] = workoutDays[0].filter((d) => d !== dayNumber);
          //console.log(workoutDays);
        }
        //If the date has not been selected
        else {
          workoutDays[0].push(dayNumber);
          day.classList.add("workout");
          //console.log(workoutDays);
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
          //console.log(workoutDays);
        }
        //If the date has not been selected
        else {
          workoutDays[1].push(dayNumber);
          day.classList.add("workout");
          //console.log(workoutDays);
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
          //console.log(workoutDays);
        }
        //If the date has not been selected
        else {
          workoutDays[2].push(dayNumber);
          day.classList.add("workout");
          //console.log(workoutDays);
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
          //console.log(workoutDays);
        }
        //If the date has not been selected
        else {
          workoutDays[3].push(dayNumber);
          day.classList.add("workout");
          //console.log(workoutDays);
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
          //console.log(workoutDays);
        }
        //If the date has not been selected
        else {
          workoutDays[4].push(dayNumber);
          day.classList.add("workout");
          //console.log(workoutDays);
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
          //console.log(workoutDays);
        }
        //If the date has not been selected
        else {
          workoutDays[workoutDays.length - 1].push(dayNumber);
          day.classList.add("workout");
          //console.log(workoutDays);
        }
      }
    }
    checkAchievement();
    checkAchievementWeekly();
  }

  //Check if the target is reached
  function checkAchievement() {
    //console.log(targetDays);
    //Check if the target is reached in every weeks
    if (workoutDays.every((a) => a.length >= targetDays)) {
      achievement.style.display = "block";
      achievement.innerHTML = `🎉Congratulations! You've reached your target for ${getMonthName()}!🎉`;
    } else {
      achievement.style.display = "none";
    }
  }

  var weeklyAchievement = document.getElementsByClassName("weekly-achievement");
  function checkAchievementWeekly() {
    //Check every week
    for (var i = 0; i < workoutDays.length; i++) {
      //Check the target days with the days selected
      if (workoutDays[i].length >= targetDays) {
        weeklyAchievement[i].innerHTML = `You've reached your target for Week${
          i + 1
        }! Keep going!`;
      } else {
        weeklyAchievement[i].innerHTML = "";
      }
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

  //For testing different months
  function getMonth(int) {
    //If the month is not set
    if (!int) {
      //return today
      return new Date();
    } else {
      var now = new Date();
      var year = now.getFullYear();
      var date = now.getDate();
      //return a new date with the set month
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
