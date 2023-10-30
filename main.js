const MARCA_ZAPATILLAS = {
  NIKE: "nike",
  JORDAN: "jordan",
  ADIDAS: "adidas",
};

alert("Bienvenidos a ALLROD Originals");

// Productos
const ArrayNike = [
  { id: 1, nombre: "Air Force", precio: 350 },
  { id: 2, nombre: "Zoom", precio: 250 },
  { id: 3, nombre: "Air Max", precio: 375 },
  { id: 4, nombre: "Air Precision", precio: 300 },
  { id: 5, nombre: "Nike Dunk", precio: 320 },
];

const ArrayJordan = [
  { id: 1, nombre: "Jordan 1 xDior", precio: 450 },
  { id: 2, nombre: "Jordan for Travis Scott", precio: 350 },
  { id: 3, nombre: "JORDAN 34 ZION WILLIAMSON", precio: 475 },
  { id: 4, nombre: "Jordan 5 Retro SE", precio: 500 },
  { id: 5, nombre: "Jordan 1 Retro Buy Off-White x Air ", precio: 520 },
];

const ArrayAdidas = [
  { id: 1, nombre: "Forum Mid", precio: 250 },
  { id: 2, nombre: "Hyperturf", precio: 350 },
  { id: 3, nombre: "Terrex", precio: 275 },
  { id: 4, nombre: "Forum Low Bad Bunny Back to School", precio: 280 },
  { id: 5, nombre: "Adidas HOOPS 3.0 MID", precio: 260 },
];

//Inicialización de variables
let marca;
let carrito = [];

do {
  marca = prompt(
    "Escribe el nombre por favor \n Estas son las 3 marcas con las que trabajamos:\n 1. Nike \n 2. Jordan \n 3. Adidas \n "
  );

  let productos = [];

  if (marca === MARCA_ZAPATILLAS.NIKE) {
    alert("Haz elegido la marca Nike. A continuación, se mostrarán todos los productos:");
    productos = ArrayNike;
  } else if (marca === MARCA_ZAPATILLAS.JORDAN) {
    alert("Haz elegido la marca Jordan. A continuación, se mostrarán todos los productos:");
    productos = ArrayJordan;
  } else if (marca === MARCA_ZAPATILLAS.ADIDAS) {
    alert("Haz elegido la marca Adidas. A continuación, se mostrarán todos los productos:");
    productos = ArrayAdidas;
  } else {
    alert("Por favor, elige entre Nike, Jordan o Adidas.");
    continue;
  }

  if (productos.length > 0) {
    let listaProductos = "Productos disponibles:\n";
    productos.forEach((producto, index) => {
      listaProductos += `${index + 1}. Modelo: ${producto.nombre} Precio: $${producto.precio}\n`;
    });
    listaProductos += "0. Salir.No deseo mas cosas";

    while (true) {
      const seleccion = parseInt(prompt(listaProductos));
      if (seleccion === 0) {
        break;
      } else if (seleccion >= 1 && seleccion <= productos.length) {
        const cantidad = parseInt(prompt(`¿Cuántas unidades de ${productos[seleccion - 1].nombre} deseas comprar?`));
        if (!isNaN(cantidad) && cantidad > 0) {
          const productoSeleccionado = {
            ...productos[seleccion - 1],
            cantidad: cantidad,
          };
          carrito.push(productoSeleccionado);
          alert(`Has agregado ${cantidad} unidad(es) de ${productos[seleccion - 1].nombre} al carrito.`);
        } else {
          alert("Cantidad no válida. Introduce un número válido.");
        }
      } else {
        alert("Selección no válida. Introduce un número válido.");
      }
    }
  }

  const seguirComprando = confirm("¿Deseas seguir comprando?");
  if (!seguirComprando) {
    break;
  }
} while (true);

// Calcular el total del carrito
let total = 0;
for (const producto of carrito) {
  total += producto.precio * producto.cantidad;
}

// Mostrar el carrito y el total
if (carrito.length > 0) {
  alert("Carrito de compras:");
  for (const producto of carrito) {
    alert(`Modelo: ${producto.nombre}, Precio: $${producto.precio}, Cantidad: ${producto.cantidad}`);
  }
  alert(`Total a pagar: $${total}`);
} else {
  alert("No has comprado ningún producto.");
}
