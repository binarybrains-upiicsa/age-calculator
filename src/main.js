import './style.css'
import datepicker from 'js-datepicker'
import 'js-datepicker/dist/datepicker.min.css';

document.querySelector('#app').innerHTML = `
    <body>
        <div id="main">
            <h3>age calculator :)</h3>
            <div id="input">
                <label for="fecha">Enter your birth date</label>
                <input id="fecha" type="text">
            </div>
        </div>
    </body>
`
const picker = datepicker('#fecha')


