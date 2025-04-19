const { DateTime } = luxon;
//Activación del Litepicker
new Litepicker({
    element: document.getElementById('fecha'),
    format:'YYYY-MM-DD',
    lang: 'es',
    autoApply: true,
    dropdowns:{
        minYear: 1900,
        maxYear: DateTime.now().year,
        months: true,
        years: true,
    }
});

document.getElementById("formulario").addEventListener("submit",function(e){
    e.preventDefault();
    const inputFecha = document.getElementById("fecha").value;

    if(!inputFecha){
        document.getElementById("resultado").innerHTML = "Ingresa una fecha valida";
        return;
    }

    const nacimiento = DateTime.fromISO(inputFecha)
    const actual = DateTime.now();

    if(!nacimiento.isValid || nacimiento>actual){
        document.getElementById("resultado").innerHTML = "Fecha no valida";
        return;
    }
        const diferencia = actual.diff(nacimiento, ['years', 'months', 'days']).toObject();

        document.getElementById("resultado").innerHTML = `
          Tienes ${Math.floor(diferencia.years)} años, 
          ${Math.floor(diferencia.months)} meses y 
          ${Math.floor(diferencia.days)} días.
        `;
});