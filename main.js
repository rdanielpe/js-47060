const cantPreguntas = Number(prompt("¿Cuantas notas deseas ingresar?"));
let sumaNotas = 0;

for (let i = 0; i < cantPreguntas; i++) {
 let nota
  do {
    const input = prompt("Ingrese la nota");
    if (input === "" || isNaN(input)) {
      alert("Por favor, ingrese un número válido.");
    } else {
      nota = Number(input);
    }
  } while (isNaN(nota));
  sumaNotas = sumaNotas + nota
}


const promedio = sumaNotas / cantPreguntas;
alert(`El promedio de las ${cantPreguntas} notas ingresadas es: ${promedio}`);
