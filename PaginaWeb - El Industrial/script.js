// =====================================
// VARIABLES GLOBALES
// =====================================
const listaCarrito = document.querySelector("#carrito-body");
const indicadorCarrito = document.querySelector("#carrito-indicador");
const totalPrecio = document.querySelector("#total-precio");

let carrito = []; // <- Aquí guardamos todos los productos agregados

// =====================================
// EVENT LISTENERS
// =====================================
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar-carrito")) {
        e.preventDefault();
        const productoHTML = e.target.closest(".product");  
        leerDatosProducto(productoHTML);
    }

    if (e.target.classList.contains("borrar")) {
        e.preventDefault();
        const id = e.target.getAttribute("data-id");
        eliminarProducto(id);
    }
});

// =====================================
// LEER DATOS DEL PRODUCTO DESDE HTML
// =====================================
function leerDatosProducto(productoHTML) {

    const producto = {
        imagen: productoHTML.querySelector("img").src,
        titulo: productoHTML.querySelector("h3").textContent,
        precio: productoHTML.querySelector(".precio").textContent.replace("$", "").replace(".", ""),
        id: productoHTML.querySelector(".agregar-carrito").getAttribute("data-id"),
        cantidad: 1
    };

    agregarAlCarrito(producto);
}

// =====================================
// AGREGAR O ACTUALIZAR PRODUCTO EN CARRITO
// =====================================
function agregarAlCarrito(productoNuevo) {

    // Verificamos si ya existe
    const existe = carrito.some(prod => prod.id === productoNuevo.id);

    if (existe) {
        carrito = carrito.map(prod => {
            if (prod.id === productoNuevo.id) {
                prod.cantidad++;
            }
            return prod;
        });
    } else {
        carrito.push(productoNuevo);
    }

    actualizarCarritoHTML();
    actualizarIndicador();
    actualizarTotal();
}

// =====================================
// ELIMINAR PRODUCTO
// =====================================
function eliminarProducto(id) {
    carrito = carrito.filter(prod => prod.id !== id);
    actualizarCarritoHTML();
    actualizarIndicador();
    actualizarTotal();
}

// =====================================
// RECONSTRUIR TODA LA TABLA DEL CARRITO
// =====================================
function actualizarCarritoHTML() {
    listaCarrito.innerHTML = "";

    carrito.forEach(prod => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${prod.imagen}" width="80"></td>
            <td>${prod.cantidad}</td>
            <td>${prod.titulo}</td>
            <td>$${Number(prod.precio * prod.cantidad).toLocaleString()}</td>            
            <td><a href="#" class="borrar" data-id="${prod.id}">x</a></td>
        `;

        listaCarrito.appendChild(row);
    });
}

// =====================================
// ACTUALIZAR TOTAL DEL CARRITO
// =====================================
function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => {
        return acc + (prod.precio * prod.cantidad);
    }, 0);

    totalPrecio.textContent = `$${total.toLocaleString()}`;
}

// =====================================
// INDICADOR DE CANTIDAD EN EL CARRITO
// =====================================
function actualizarIndicador() {
    const cantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);

    indicadorCarrito.textContent = cantidad;

    // Añadir animación visual
    indicadorCarrito.classList.add("activo");
    setTimeout(() => indicadorCarrito.classList.remove("activo"), 300);
}

// =====================================
// CARRUSEL
// =====================================

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

