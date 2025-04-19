import { counterAnimation } from "../utils/counter";
import { ANIMATION_DELAY } from "../utils/constants";

export class AgeCalculatorResult extends HTMLElement {
    #months;
    #years;
    #yearsElement;
    #monthsElement;
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
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <span id="years"></span>
            <span id="months"></span>
        `;

        this.#yearsElement = this.shadowRoot.getElementById("years");
        this.#monthsElement = this.shadowRoot.getElementById("months");

        this.animateResult();
    }
}

customElements.define("age-calculator-result", AgeCalculatorResult);
