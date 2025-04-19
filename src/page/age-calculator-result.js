import { counterAnimation } from "../utils/counter";
import { ANIMATION_DELAY } from "../utils/constants";
import { AgeCalculatorForm } from "./age-calculator-form";

export class AgeCalculatorResult extends HTMLElement {
    #months;
    #years;
    #yearsElement;
    #monthsElement;
    #calculateButton;
    constructor(months, years) {
        super();

        this.attachShadow({ mode: "open" });

        this.#months = months;
        this.#years = years;
    }

    animateResult() {
        const monthText = this.#months === 1 ? "month" : "months";
        const yearText = this.#years === 1 ? "year" : "years";

        this.#yearsElement.textContent = `0 ${yearText}`;
        this.#monthsElement.textContent = `0 ${monthText}`;

        counterAnimation(this.#years, (current, _target) => {
            this.#yearsElement.textContent = `${current} ${yearText}`;
        }, {
            delay: ANIMATION_DELAY,
            onFinish: () => {
                counterAnimation(this.#months, (current, _target) => {
                    this.#monthsElement.textContent = `${current} ${monthText}`;
                }, {
                    delay: ANIMATION_DELAY,
                });
            },
        });
    }


    handleCalculate() {
        const app = document.getElementById("app");
        app.innerHTML = "";
        app.append(new AgeCalculatorForm());
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
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
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

                .age-container {
                    display: flex;
                    gap: 1rem;
                }

                .age-item {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .age-item-label {
                    font-weight: 600;

                    font-size: 18px;
                }

                .age-item-value {
                    font-weight: 700;
                    font-size: 36px;
                }
            </style>
            <div class="card">
                <div class="age-container">
                    <div class="age-item">
                        <span class="age-item-label">Years</span>
                        <span id="years" class="age-item-value"></span>
                    </div>
                    <div class="age-item">
                        <span class="age-item-label">Months</span>
                        <span id="months" class="age-item-value"></span>
                    </div>
                </div>
                <button class="btn" type="button" id="calculateButton">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-reload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" /><path d="M20 4v5h-5" /></svg>
                    Calculate other age
                </button>
            </div>
        `;

        this.#yearsElement = this.shadowRoot.getElementById("years");
        this.#monthsElement = this.shadowRoot.getElementById("months");
        this.#calculateButton = this.shadowRoot.getElementById("calculateButton");

        this.animateResult();
        this.#calculateButton.addEventListener("click", this.handleCalculate.bind(this));
    }
}

customElements.define("age-calculator-result", AgeCalculatorResult);
