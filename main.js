const cantPreguntas = Number(prompt("¿Cuantas notas deseas ingresar?"));
let sumaNotas = 0;

function validarNota(input) {
  let nota;
  switch (true) {
    case input === "":
      alert("Por favor, ingrese un número válido.");
      break;
    case isNaN(input):
      alert("Por favor, ingrese un número válido.");
      break;
    default:
      nota = Number(input);
      break;
  }
  return nota;
}

for (let i = 0; i < cantPreguntas; i++) {
  let nota;
  do {
    const input = prompt("Ingrese la nota");
    nota = validarNota(input);
  } while (isNaN(nota));
  sumaNotas = sumaNotas + nota;
}

const promedio = sumaNotas / cantPreguntas;
alert(`El promedio de las ${cantPreguntas} notas ingresadas es: ${promedio}`);
