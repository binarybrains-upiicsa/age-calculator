import "./styles/app.css";

const CURRENT_DATE = new Date();
const MAX_DATE = new Date(new Date().setDate(new Date().getDate() - 1));
const MIN_YEAR = 1900;
const MAX_AGE = 120;

const birthDayInput = document.getElementById("birthdayInput");

const ageCalculatorForm = document.getElementById("ageCalculatorForm");
const birthdayError = document.getElementById("birthdayError");

birthDayInput.max = MAX_DATE.toISOString().split("T")[0];
birthDayInput.min = `${MIN_YEAR}-01-01`;

const validateBirthDay = (birthday) => {
    if (!birthday) {
        return { value: null, error: "Please select a date" };
    }

    if (!Date.parse(birthday)) {
        return { value: null, error: "Please enter a valid date" };
    }

    if (birthday === CURRENT_DATE.toISOString().split("T")[0]) {
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
});
