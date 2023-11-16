const gallery = document.querySelector(".gallery");
const btnCart = document.querySelector(".nav-carrito");
const divCart = document.querySelector(".product-detail");
const sidebar = document.querySelector(".my-order-content");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cuando inicia,o el Contenido del DOM se vuelva a cargar, actualizar el contador y cantidad total
document.addEventListener("DOMContentLoaded", () => {
  getProducts()
    .then((data) => {
      mostrarProductos(data);
    })
    .catch((err) => console.log(err));
  updateCount();
  updateTotalCart();
});

btnCart.addEventListener("click", () => {
  divCart.classList.toggle("active");
});

const hombresCheckbox = document.getElementById("hombresCheckbox");
const mujeresCheckbox = document.getElementById("mujeresCheckbox");
const niñosCheckbox = document.getElementById("niñosCheckbox");


// arrow.addEventListener("click", () => {
//   divCart.classList.toggle("active")
// })

async function getProducts() {
  const response = await fetch("./productos.json");
  const data = await response.json();
  return data;
}

const mostrarProductos = (productos) => {
  gallery.innerHTML=``
  productos.forEach((producto) => {
    gallery.innerHTML += `
      <div class="card-producto">
        <img src="${producto.img}" class="img-producto" alt="${producto.nombre}" >
        <div class="card-body">
          <h5 class="nombre-producto">${producto.nombre} </h5>
          <p class="precio-producto">${producto.precio}</p>
          <figure class="carrito-js">
          <img src="../assets/image/carrito-icon.webp" class="btn-agregar" data-id="${producto.id}" alt="agregar">
          </figure>
        </div>
      </div>
      `;
  });
  const btnAgregar = document.querySelectorAll(".btn-agregar");
  btnAgregar.forEach((e) =>
    e.addEventListener("click", (e) => {
      let cardPadre = e.target.parentElement;
      addToCart(cardPadre);
      iziToast.success({
        id: "success",
        title: "Genial!",
        message: "Producto agregado al carrito",
      });
    })
  );
};

const addToCart = (cardPadre) => {
  let producto = {
    nombre:
      cardPadre.parentElement.querySelector(".nombre-producto").textContent,
    precio: Number(
      cardPadre.parentElement.querySelector(".precio-producto").textContent
    ),
    cantidad: 1,
    image: cardPadre.parentElement.parentElement.querySelector("img").src,
    id: Number(cardPadre.querySelector("img").getAttribute("data-id")),
  };

  let productoEncontrado = cart.find((e) => e.id === producto.id);

  if (productoEncontrado) {
    productoEncontrado.cantidad++;
  } else {
    cart.push(producto);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  updateTotalCart();
  showCart();
  divCart.classList.add("active");
};

const updateCount = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = cart.reduce((acc, ite) => acc + ite.cantidad, 0);
  document.querySelector(".nav-carrito div").textContent = total;
};

const updateTotalCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = cart.reduce((acc, ite) => acc + ite.precio * ite.cantidad, 0);
  let btn = document.querySelector("#shopButton");

  if (cart.length === 0) {
    /* Si el carro esta vacio */
    document.querySelector(
      ".order"
    ).innerHTML = `<p><span>Carrito vacío, comience a comprar!</span></p>`;
    btn.setAttribute("disabled", "");
    return;
  } else {
    btn.removeAttribute("disabled");
  }

  document.querySelector(".order").innerHTML = `
    <p>
      <span>Total</span>
    </p>
    <p>$${total}</p>
    `;
  showCart();
};
const showCart = () => {
  sidebar.innerHTML = "";
  cart.forEach((element) => {
    sidebar.innerHTML += /* html */ `
      <div class="shopping-cart">
        <figure>
          <img src="${element.image}" alt="${element.nombre}">
        </figure>
        <div>
          <p>${element.nombre}</p>
          <p>Cantidad: ${element.cantidad}</p>
        </div>
        <p>$<span>${element.precio * element.cantidad}</span></p>
        <span class="btn-restar" data-id="${element.id}">&#45</span>
        <span class="btn-borrar" data-id="${element.id}">&times</span>
      </div>`;
  });
};
const restarProducto = (idProductoRestar) => {
  let productoEncontrado = cart.find(
    (element) => element.id === Number(idProductoRestar)
  );
  if (productoEncontrado) {
    productoEncontrado.cantidad--;
    if (productoEncontrado.cantidad < 1) {
      borrarProducto(idProductoRestar);
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  updateTotalCart();
  showCart();
};

const borrarProducto = (idProductoBorrar) => {
  cart = cart.filter((element) => element.id !== Number(idProductoBorrar));

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
  updateTotalCart();
  showCart();
};
// Oir eventos para los botones restar(-) y eliminar(x)
const escucharBotonesSidebar = () => {
  sidebar.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-restar")) {
      restarProducto(e.target.getAttribute("data-id"));
    }
    if (e.target.classList.contains("btn-borrar")) {
      borrarProducto(e.target.getAttribute("data-id"));
    }
  });
};
// input de busqueda
const inputSearch = document.querySelector(".barra-nav");

// Obtén referencia a los elementos checkbox
// const hombresCheckbox = document.getElementById('hombresCheckbox');
// const mujeresCheckbox = document.getElementById('mujeresCheckbox');
// const niñosCheckbox = document.getElementById('niñosCheckbox');

//  // Agrega un evento click a cada checkbox
//  hombresCheckbox.addEventListener('click', function () {
//   actualizarFiltro();
// });

// mujeresCheckbox.addEventListener('click', function () {
//   actualizarFiltro();
// });

// niñosCheckbox.addEventListener('click', function () {
//   actualizarFiltro();
// });


// Filtrar cuando se de enter
inputSearch.addEventListener("input", async () => {
  getProducts()
    .then((data) => {
      filtrarPorNombre(data);
    })
    .catch((err) => console.log(err));
});

// //Filtrar por categoria
// const filtrarPorCategoria = (productos, categoriaSeleccionada) => {
//   return productos.filter((producto) => {
//       return producto.category.includes(categoriaSeleccionada);
//   });
// };

function filterProductsByGender(productos, gender) {
  const filteredProducts = productos.filter((producto) =>
    producto.gender === gender
  );
  // Llamamos a la función mostrarProductos
  mostrarProductos(filteredProducts);
}

const inputRadios = document.querySelectorAll("input[name='gender']");

inputRadios.forEach((inputRadio) => {
  inputRadio.addEventListener("click", () => {
    // Obtenemos el valor del input radio
    const gender = inputRadio.value;

    // Filtramos los productos
    getProducts()
    .then((data) => {
      filterProductsByGender(data, gender);
    })
    .catch((err) => console.log(err));
  });
});
//Filtrar productos atravez de la busqueda
const filtrarPorNombre = async (productos) => {
  let search = inputSearch.value.toLowerCase();
  let filtered = productos.filter((product) =>
    product.nombre.toLowerCase().includes(search)
  );
  if (filtered.length > 0) {
    gallery.innerHTML = "";
    mostrarProductos(filtered);
  } else {
    gallery.innerHTML = `<p class="text-white">¡Lo sentimos! No hemos encontrado ningún resultado para tu búsqueda...</p>`;
  }
};

getProducts();
showCart();
escucharBotonesSidebar();
