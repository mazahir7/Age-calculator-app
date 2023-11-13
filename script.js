"use strict";

const dayEl = document.getElementById("day");
const monthEl = document.getElementById("month");
const yearEl = document.getElementById("year");
const btn = document.querySelector(".btn");


// TO SHOW ERROR MESSAGES
const inputEl = document.querySelector(".age-input");
const dayErrorEl = document.getElementById("day-error");
const monthErrorEl = document.getElementById("month-error");
const yearErrorEl = document.getElementById("year-error");

// ERROR MESSAGES TO BE DISPLAYED AS PER THE TYPE OF ERROR
const emptyErrorMessage = "This field is required";
const dayErrorMessage = "Must be a valid day";
const monthErrorMessage = "Must be a valid month";
const yearErrorMessage = "Must be a valid year";
const pastErrorMessage = "Must be in past";

// TO SHOW TIME SPENT / GONE
const displayDay = document.querySelector(".display-day");
const displayMonth = document.querySelector(".display-month");
const displayYear = document.querySelector(".display-year");

const currentDate = new Date();

btn.addEventListener("click", demo);


function demo() {

  const userDay = Number(dayEl.value);
  // DATE() object take month from 0 to 11
  const userMonth = Number(monthEl.value) - 1;
  const userYear = Number(yearEl.value);

  // const userBirthDate = new Date(userYear, userMonth, userDay);

  // checkDate(userDay, userMonth, userYear);
  const calcTimeSpent = checkDate(userDay, userMonth, userYear);

  if (calcTimeSpent) {

    const userBirthDate = new Date(userYear, userMonth, userDay);

    // returns timestamp
    const diff = currentDate - userBirthDate;

    // YEARS GONE
    const yearsGone = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    const daysRemain = Math.floor(diff % (1000 * 60 * 60 * 24 * 365.25))

    const monthsGone = Math.floor(daysRemain / (1000 * 60 * 60 * 24 * 30.44));

    const daysRemainInCurrentMonth = Math.floor(daysRemain % (1000 * 60 * 60 * 24 * 30.44));

    const daysGone = Math.floor(daysRemainInCurrentMonth / (1000 * 60 * 60 * 24));

    displayYear.textContent = yearsGone;
    displayMonth.textContent = monthsGone;
    displayDay.textContent = daysGone;


    // console.log(yearsGone);
    // console.log(monthsGone);
    // console.log(daysGone);
    /*
    yearsGone = Math.floor(totalDays / 365.25);
    
    console.log(totalDays - (yearsGone * 365));

    console.log("Years gone > " + Math.floor(yearsGone));
    // displayYear.textContent = yearsGone;

    // MONTHS GONE -- months passed in the current year
    // const currentYear = new Date(userBirthDate.getFullYear() + yearsGone, 0);
    const currentYear = new Date(currentDate.getFullYear(), 0);
    monthsGone = Math.floor((currentDate - currentYear) / 1000 / 60 / 60 / 24 / 30);
    console.log("Months gone > " + (monthsGone - userMonth));
    // displayMonth.textContent = monthsGone;

    // DAYS GONE -- days passed in the current month

    // THIS WILL GIVE THE DAY 1 OF CURRENT MONTH
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth());
    daysGone = Math.ceil((currentDate - currentMonth) / 1000 / 60 / 60 / 24);
    console.log("Days gone > " + (daysGone - userDay));
    // displayDay.textContent = daysGone;
    */

  }
  else {
    displayYear.textContent = "- -";
    displayMonth.textContent = "- -";
    displayDay.textContent = "- -";
  }
}

function checkDate(day, month, year) {

  // DAY CHECKING
  if (day === 0) {
    showError(dayErrorEl, emptyErrorMessage);
  }
  else if (day >= 1 && day <= 31) {
    hideError(dayErrorEl);
  }
  else {
    showError(dayErrorEl, dayErrorMessage);
  }

  // MONTH CHECKING
  if (month === -1) {
    showError(monthErrorEl, emptyErrorMessage);
  }
  // DATE() object take month from 0 to 11
  else if (month >= 0 && month <= 11) {
    hideError(monthErrorEl);
  }
  else {
    showError(monthErrorEl, monthErrorMessage);
  }

  // YEAR CHECKING
  if (year === 0) {
    showError(yearErrorEl, emptyErrorMessage);
    return 0;
  }
  else if (year < 1000) {
    showError(yearErrorEl, yearErrorMessage);
    return 0;
  }
  else {
    if (year <= new Date().getFullYear()) {
      // checking for future date
      if ((currentDate - new Date(year, month, day)) > 0) {
        hideError(yearErrorEl);
        // checkLeap(year);
        return checkMonthDays(year, month, day);
      }
      else {
        showError(yearErrorEl, pastErrorMessage);
        return 0;
      }
    }
    else {
      showError(yearErrorEl, pastErrorMessage);
      // yearErrorEl.textContent = error;
      return 0;
    }
  }
}


// CHECKS IF THE DATE IS VALID OR NOT, BY TAKING INTO ACCOUNT (LEAP YEAR, DAYS OF MONTH(28, 29, 30, 31) )
function checkMonthDays(year, month, date) {

  if ((month > 0) && (month % 2 !== 0)) {

    if (month === 1) {
      return chechFeb(year, date);
    }
    else {
      if ((date <= 30)) {
        hideError(dayErrorEl);
        return 1;
      }
      else {
        showError(dayErrorEl, dayErrorMessage);
        return 0;
      }
    }
  }
  else {
    return 1;
  }
}

// HANDELS FEBURARY MONTH => CHECKS IF THE DAYS ARE ACCORDING TO THE LEAP YEAR OF NOT
const chechFeb = (year, date) => {

  if (checkLeap(year)) {
    if (date <= 29) {
      hideError(dayErrorEl);
      return 1;
    }
    else {
      showError(dayErrorEl, dayErrorMessage);
      return 0;
    }
  }
  else {
    if (date <= 28) {
      hideError(dayErrorEl);
      return 1;
    }
    else {
      showError(dayErrorEl, dayErrorMessage);
      return 0;
    }
  }
}

// CHECKS FOR LEAP YEAR
const checkLeap = (year) => {
  if ((year % 400 === 0) || ((year % 4 === 0) && (year % 100 !== 0))) {
    return 1;
  }
  else {
    return 0;
  }
}

// SHOWS CUSTOM ERROR MESSAGES BY ACCEPTING TARGET ELEMENT AND ERROR MESSAGE
const showError = (el, message) => {
  el.style.opacity = 1;
  el.textContent = message;
}

// HIDES ERROR MESSAGE OF THE TARGET ELEMENT 
const hideError = (el) => {
  el.style.opacity = 0;
}