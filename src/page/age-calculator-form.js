import { CURRENT_DATE, MAX_AGE, MAX_DATE, MIN_YEAR } from "../utils/constants";
import { AgeCalculatorResult } from "./age-calculator-result";
import { DateTime } from "luxon";
import "../styles/app.css";

export class AgeCalculatorForm extends HTMLElement {
    #birthdayMax = MAX_DATE.toISOString().split("T")[0];
    #birthdayMin = `${MIN_YEAR}-01-01`;

    #birthdayInput;
    #birthdayError;
    #birthdayErrorText;

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
            this.#birthdayErrorText.textContent = error;
            this.#birthdayError.style.display = "flex";
            return;
        }

        this.#birthdayErrorText.textContent = "";
        this.#birthdayError.style.display = "none";
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
            <style>
                :host {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    width: 100vw;
                }
                :root {
                    --card-background: #dcebfe;
                    --box-shadow: 4px;
                    --border-radius: 5px;
                    --border-size: 2px;
                }
                .card {
                    background-color:var(--card-background);
                    box-shadow: black var(--box-shadow) var(--box-shadow);
                    border-radius: var(--border-radius);
                    border: var(--border-size) solid black;

                    padding: 1.5rem;
                    width: min(100%, 640px);
                }

                #form-container {
                    height: min-content;
                }

                .btn {
                    padding: 0.5rem 1rem;
                    outline: none;
                    border: var(--border-size) solid #000;
                    border-radius: var(--border-radius);
                    box-shadow: black var(--box-shadow) var(--box-shadow);
                    text-align: center;
                    line-height: 20px;
                    transition: box-shadow ease-in 150ms;
                    transform: translateY(0);
                    font-weight: 700;
                    gap: 0.5rem;

                    display: inline-flex;
                    justify-items: center;
                    align-items: center;
                    background-color: var(--primary-color);
                    width: min-content;

                    &:is(:hover, :active) {
                        --box-shadow: 0;
                        transform: translateY(calc(var(--border-size) * 1));

                        &.reverse {
                        --box-shadow: 4px;
                        transform: translateY(calc(var(--border-size) * -1));
                        }
                    }

                    &.reverse {
                        --box-shadow: 0;
                        transform: translateY(0);
                    }

                    &.no-shadow {
                        --box-shadow: 0;
                        transform: translateY(0);
                    }

                    &.neutral {
                        --primary-color: white;
                    }
                }

                .form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }
                #birthdayError {
                    background-color: #FF0B55;
                    display: none;
                    color: black;

                    font-weight: 600;
                    padding: 0.5rem 1rem;
                    border: var(--border-size) solid #000;
                    border-radius: var(--border-radius);
                    box-shadow: black var(--box-shadow) var(--box-shadow);

                    align-items: center;

                    gap: 0.5rem;

                    font-size: 14px;

                    & .error-text {
                        display: flex;
                        flex-direction: column;
                        gap: 0.025rem;
                        & #birthdayErrorText {
                            margin-right: 4px;
                            font-weight: 400;
                        }
                    }
                }

                #birthdayInput {
                    padding: 0.5rem 1rem;
                    border: var(--border-size) solid #000;
                    border-radius: var(--border-radius);
                    box-shadow: black var(--box-shadow) var(--box-shadow);
                }
            </style>
            <div class="card">
                <form id="ageCalculatorForm" class="form">
                    <h2 style="margin: 0;">Age Calculator</h2>
                    <div id="birthdayError">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>

                        <div class="error-text">
                            <span>Something went wrong</span>
                            <span id="birthdayErrorText"></span>
                        </div>
                    </div>
                    <input type="date" id="birthdayInput" name="birthday" min="${this.#birthdayMin}" max="${this.#birthdayMax}" />

                    <button type="submit" class="btn" style="align-self: end;">Calculate</button>
                </form>
            </div>
        `;

        this.#birthdayInput = this.shadowRoot.getElementById("birthdayInput");
        this.#birthdayError = this.shadowRoot.getElementById("birthdayError");
        this.#birthdayErrorText = this.shadowRoot.getElementById(
            "birthdayErrorText",
        );

        this.shadowRoot.getElementById("ageCalculatorForm").addEventListener(
            "submit",
            this.handleSubmit.bind(this),
        );
    }
}

customElements.define("age-calculator-form", AgeCalculatorForm);
