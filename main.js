const cantPreguntas = Number(prompt("¿Cuantas notas deseas ingresar?"));
let sumaNotas = 0;

for (let i = 0; i < cantPreguntas; i++) {
  const nota = Number(prompt("Ingrese la nota"));
  sumaNotas += nota;
}

const promedio = sumaNotas / cantPreguntas;
alert(`El promedio de las ${cantPreguntas} notas ingresadas es: ${promedio}`);
