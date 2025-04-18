import './style.css'
import { DateTime } from "luxon";
import datepicker from 'js-datepicker'
import 'js-datepicker/dist/datepicker.min.css';

document.querySelector('#app').innerHTML = `
    <body>
        <div id="main">
            <h3>age calculator :)</h3>
            <div id="input-container">
                <label for="fecha" id="fecha-label">Enter your birth date</label>
                <input id="fecha" type="text">
            </div>
            <div id="line">
                <p></p>
            </div>
            <div id="result-container">
                <ul>
                    <li id="years">years</li>
                    <li id="months">months</li>
                </ul>
            </div>
        </div>
    </body>
`

const picker = datepicker('#fecha', {
    onSelect: (instance, date) => {
        if (!date) return; // Check if there is a date
        const birthDate = DateTime.fromJSDate(date);
        const today = DateTime.now();
        const age = today.diff(birthDate, ['years', 'months']).toObject(); // Get the difference and format it to an object

        const years = Math.floor(age.years);
        const months = Math.floor(age.months);  

        showAge(years, months);
    }
})

function showAge(years, months) {
    const yearsResult = document.getElementById("years");
    const monthsResult = document.getElementById("months");
    
    yearsResult.textContent = `${years} years`; 
    monthsResult.textContent = `${months} months`;
}




