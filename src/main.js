import "./styles/app.css";
import { DateTime } from "luxon";
import { counterAnimation } from "./utils/counter";
import {
  ANIMATION_DELAY,
  CURRENT_DATE,
  MAX_AGE,
  MAX_DATE,
  MIN_YEAR,
} from "./utils/constants";

const birthDayInput = document.getElementById("birthdayInput");

const ageCalculatorForm = document.getElementById("ageCalculatorForm");
const birthdayError = document.getElementById("birthdayError");

const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const yearsRange = document.getElementById("yearsRange");
const monthsRange = document.getElementById("monthsRange");

birthDayInput.max = MAX_DATE.toISOString().split("T")[0];
birthDayInput.min = `${MIN_YEAR}-01-01`;

const validateBirthDay = (birthday) => {
  if (!birthday) {
    return { value: null, error: "Please select a date" };
  }

  if (!Date.parse(birthday)) {
    return { value: null, error: "Please enter a valid date" };
  }

  if (birthday === MAX_DATE.toISOString().split("T")[0]) {
    return { value: null, error: "Please select a date in the past" };
  }

  const birthDate = new Date(birthday);
  if (birthDate > CURRENT_DATE) {
    return { value: null, error: "Please select a date in the past" };
  }

  if (birthDate.getFullYear() < MIN_YEAR) {
    return { value: null, error: `Please select a date after ${MIN_YEAR}` };
  }

  const age = CURRENT_DATE.getFullYear() - birthDate.getFullYear();
  if (age > MAX_AGE) {
    return {
      value: null,
      error: `Please select a date less than ${MAX_AGE} years`,
    };
  }

  return { value: birthday, error: null };
};

ageCalculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const { birthday } = Object.fromEntries(formData);

  const { value, error } = validateBirthDay(birthday);

  if (error) {
    birthDayInput.classList.add("error");
    birthdayError.textContent = error;
    return;
  }

  birthDayInput.classList.remove("error");
  birthdayError.textContent = "";

  event.target.reset();

  const end = DateTime.fromISO(CURRENT_DATE.toISOString().split("T")[0]);
  const start = DateTime.fromISO(value);

  const diffObj = end.diff(start, ["months", "years"]).toObject();

  const months = Math.floor(diffObj.months);
  const years = Math.floor(diffObj.years);

  const monthText = months === 1 ? "month" : "months";
  const yearText = years === 1 ? "year" : "years";

  yearsElement.textContent = `0 ${yearText}`;
  monthsElement.textContent = `0 ${monthText}`;

  counterAnimation(years, (current, _target) => {
    yearsElement.textContent = `${current} ${yearText}`;
    yearsRange.value = current;
  }, {
    delay: ANIMATION_DELAY,
    onFinish: () => {
      counterAnimation(months, (current, _target) => {
        monthsElement.textContent = `${current} ${monthText}`;
        monthsRange.value = current;
      }, {
        delay: ANIMATION_DELAY,
      });
    },
  });
});
