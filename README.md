# Age calculator
El objetivo de este proyecto es ayudarte a aprender a utilizar paquetes externos usando npm. El usuario introduce su fecha de nacimiento a través de un JavaScript Datepicker, y la aplicación calcula y muestra su edad exacta, incluyendo años y meses usando [Luxon](https://www.npmjs.com/package/luxon).

![age-calculator-do1un](https://github.com/user-attachments/assets/a7a0dbce-545d-4d46-a5e6-637ba78809b4)


## Requisitos

Se requiere desarrollar una calculadora de edad con las siguientes características:

- Un formulario que permita a los usuarios introducir su fecha de nacimiento mediante un selector de fechas JavaScript (evite el selector de fechas HTML predeterminado)
- Utilice la biblioteca [Luxon](https://www.npmjs.com/package/luxon) para calcular la edad exacta en años, meses y días
- Muestre el resultado en la misma página después de que el usuario envíe el formulario
- Implemente una validación básica para garantizar que la fecha de nacimiento es válida
- Utilice un estilo sencillo para que la calculadora sea visualmente atractiva y receptiva.

> [!NOTE]
> Este proyecto es obtenido de la página de <a href="https://roadmap.sh/projects/age-calculator">roadmap.sh</a>

## Como ejecutarlo?
Para poder ejecutar este proyecto, deberás tener instalado Docker en tu computadora, y tienes dos opciones. Los pasos son los siguientes:

### Opción #1
1. Clona el proyecto en tu computadora.
2. En la terminal ingresa a la carpeta del proyecto.
3. Corre el comando ```docker build -t age-calculator .```
4. Corre el comando ```docker run -dp 5153:5153 age-calculator```
5. Ingresa a ```http://localhost:5153``` y podrás ver y hacer uso de la app c:

### Opción #2
1. Clona el proyecto en tu computadora.
2. En la terminal ingresa a la carpeta del proyecto.
3. Corre el comando ```docker pull tu_usuario/age-calculator```
4. Corre el comando ```docker run -dp 5153:5153 tu_usuario/age-calculator```
5. Ingresa a ```http://localhost:5153``` y podrás ver y hacer uso de la app c:


## Soluciones hechas por la comunidad
|Usuario|Repositorio| Website | Figma|
|<a href="https://github.com/mendodevv">mendodevv</a>|<a href="https://github.com/mendodevv/age-calculator/tree/mendodev/solution">Repositorio</a>|---------|<a href="https://www.figma.com/proto/L11QQlvwGuXb5lepZRm6MM/Age-Calculator?node-id=74-7&t=S4vXdSlM09ms5JFj-1">Prototype</a>|
