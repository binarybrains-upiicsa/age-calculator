import { CURRENT_DATE, MAX_AGE, MAX_DATE, MIN_YEAR } from "../utils/constants";
import { AgeCalculatorResult } from "./age-calculator-result";
import { DateTime } from "luxon";

export class AgeCalculatorForm extends HTMLElement {
    #birthdayMax = MAX_DATE.toISOString().split("T")[0];
    #birthdayMin = `${MIN_YEAR}-01-01`;

    #birthdayInput;
    #birthdayError;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    validateBirthDay(birthday) {
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
            return {
                value: null,
                error: `Please select a date after ${MIN_YEAR}`,
            };
        }

        const age = CURRENT_DATE.getFullYear() - birthDate.getFullYear();
        if (age > MAX_AGE) {
            return {
                value: null,
                error: `Please select a date less than ${MAX_AGE} years`,
            };
        }

        return { value: birthday, error: null };
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const { birthday } = Object.fromEntries(formData);

        const { value, error } = this.validateBirthDay(birthday);

        if (error) {
            this.#birthdayError.textContent = error;
            return;
        }

        this.#birthdayError.textContent = "";
        event.target.reset();

        const end = DateTime.fromISO(CURRENT_DATE.toISOString().split("T")[0]);
        const start = DateTime.fromISO(value);

        const diffObj = end.diff(start, ["months", "years"]).toObject();

        const months = Math.floor(diffObj.months);
        const years = Math.floor(diffObj.years);
        
        const ageCalculatorResult = new AgeCalculatorResult(months, years);
        
        const app = document.getElementById("app");
        app.innerHTML = "";
        app.append(ageCalculatorResult);
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <form id="ageCalculatorForm">
                <input type="date" id="birthdayInput" name="birthday" min="${this.#birthdayMin}" max="${this.#birthdayMax}" />
                <div id="birthdayError"></div>

                <button type="submit">Calculate</button>
            </form>
        `;

        this.#birthdayInput = this.shadowRoot.getElementById("birthdayInput");
        this.#birthdayError = this.shadowRoot.getElementById("birthdayError");

        this.shadowRoot.getElementById("ageCalculatorForm").addEventListener(
            "submit",
            this.handleSubmit.bind(this),
        );
    }
}

customElements.define("age-calculator-form", AgeCalculatorForm);
