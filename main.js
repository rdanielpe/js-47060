let nameComplete = prompt("Ingresa tu nombre");
alert("Bienvenido " + nameComplete);

let age = Number(prompt("Ingresa tu edad"));

if (age >= 100) {
  alert("Deberías estar muerto");
} else if (age >= 18) {
  alert("Eres mayor de edad");
} else {
  alert("Eres menor de edad");
}
