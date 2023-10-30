const gallery = document.querySelector(".gallery")
const btnCart = document.querySelector(".nav-carrito")
const divCart = document.querySelector(".product-detail")
const sidebar = document.querySelector(".my-order-content")
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cuando inicia,o el Contenido del DOM se vuelva a cargar, actualizar el contador y cantidad total
document.addEventListener('DOMContentLoaded', () => {
  updateCount();
  updateTotalCart();
})

btnCart.addEventListener("click", () => {
  divCart.classList.toggle("active");
});

// arrow.addEventListener("click", () => {
//   divCart.classList.toggle("active")
// })



  function getProducts() {
    let url= "./productos.json"
    fetch(url)
      .then((response) => response.json())
      .then((data) => mostrarProductos(data))
      .catch(error => console.log(error))
      }

const mostrarProductos = (productos) => {
  productos.forEach((producto) => {
    gallery.innerHTML += `
      <div class="card" style="width: 18rem;">
        <img src="${producto.img}" class="" alt="${producto.nombre}" >
        <div class="card-body">
          <h5 class="card-title">${producto.nombre} </h5>
          <p class="card-text">${producto.precio}</p>
          <button class="btn btn-primary btn-agregar" data-id="${producto.id}" alt="agregar">+</button>
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
          id: 'success',
          title: 'Genial!',
          message: 'Producto agregado al carrito'
        });
      })
    )
};
const addToCart = (cardPadre) => {
  let producto = {
    nombre: cardPadre.querySelector(".card-title").textContent,
    precio: Number(cardPadre.querySelector(".card-text").textContent),
    cantidad: 1,
    image: cardPadre.parentElement.querySelector("img").src,
    id: Number(cardPadre.querySelector("button").getAttribute("data-id")),
  };

  let productoEncontrado = cart.find((e) => e.id === producto.id);

  if (productoEncontrado) {
    productoEncontrado.cantidad++;
  } else {
    cart.push(producto);
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCount();
  updateTotalCart()
  showCart();
  divCart.classList.add("active")
}

const updateCount = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = cart.reduce((acc, ite) => acc + ite.cantidad, 0);
  document.querySelector(".nav-carrito div").textContent = total;
}

const updateTotalCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = cart.reduce((acc, ite) => acc + (ite.precio * ite.cantidad), 0)
  let btn = document.querySelector("#shopButton")

  if (cart.length === 0) {/* Si el carro esta vacio */
    document.querySelector(".order").innerHTML = `<p><span>Carrito vacío, comience a comprar!</span></p>`;
    btn.setAttribute('disabled','');
    return
  } else {
    btn.removeAttribute('disabled');
  }

  document.querySelector(".order").innerHTML = `
    <p>
      <span>Total</span>
    </p>
    <p>$${total}</p>
    `;
  showCart()
}
const showCart = () => {
  sidebar.innerHTML = "";
  cart.forEach((element) => {
    console.log(element.id,element.nombre)
    sidebar.innerHTML += /* html */`
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
      </div>`
  })

}
const restarProducto = (idProductoRestar) => {
  let productoEncontrado = cart.find(
    (element) => element.id === Number(idProductoRestar)
  );
  if (productoEncontrado) {
    productoEncontrado.cantidad--;
    if (productoEncontrado.cantidad < 1) {
      borrarProducto(idProductoRestar)
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCount()
  updateTotalCart()
  showCart();
};

const borrarProducto = (idProductoBorrar) => {

  cart = cart.filter(element => element.id !== Number(idProductoBorrar));

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCount()
  updateTotalCart()
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



getProducts();
showCart();
escucharBotonesSidebar();



