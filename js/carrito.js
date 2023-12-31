let productoEnCarrito = localStorage.getItem("productos-en-carrito");
productoEnCarrito = JSON.parse(productoEnCarrito);

const carritoVacio = document.querySelector("#carritoVacio");
const carritoProductos = document.querySelector("#carritoProductos");
const carritoAcciones = document.querySelector("#carritoAcciones");
const carritoCompraFinal = document.querySelector("#carritoCompraFinal");
let botonEliminar = document.querySelectorAll(".carritoProductoEliminar");
const botonVaciar = document.querySelector("#carritoAccionesVaciar");
const botonComprar = document.querySelector("#carritoAccionesComprar");
const total = document.querySelector("#total");

function cargarProductosCarrito() {
    if (productoEnCarrito && productoEnCarrito.length > 0) {

        carritoVacio.classList.add("oculto");
        carritoProductos.classList.remove("oculto");
        carritoAcciones.classList.remove("oculto");

        carritoProductos.innerHTML = "";

        productoEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
            <img class="carritoProductoImagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carritoProductoTitulo">
                <small>Título</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carritoProductoCantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carritoProductoPrecio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carritoProductoSubtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carritoProductoEliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>`;
            carritoProductos.append(div);
        })
    } else {
        carritoVacio.classList.remove("oculto");
        carritoProductos.classList.add("oculto");
        carritoAcciones.classList.add("oculto");
    };
    actualizarBotonesEliminar();
    actualizarTotal();
};

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonEliminar = document.querySelectorAll(".carritoProductoEliminar");
    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
};

function eliminarDelCarrito(e) {

    Toastify({
        text: "Eliminado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #678d58, black)",
            borderRadius: "2rem",
            textTransform: "upperCase",
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
        },
        onClick: function () {}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productoEnCarrito.findIndex(producto => producto.id === idBoton);
    productoEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
};

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: "¿Estás seguro?",
        icon: "question",
        html: `Se va a vaciar todo el carrito`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Si`,
        cancelButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            productoEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito));
            cargarProductosCarrito();
        };
    });
};


function actualizarTotal() {
    const totalCalculado = productoEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
};


botonComprar.addEventListener("click", function () {
    mostrarFormulario();
});
function mostrarFormulario() {
    Swal.fire({
        title: 'Completa la compra',
        html:
            '<input id="nombre" class="swal2-input" placeholder="Nombre del comprador">' +
            '<input id="tarjeta" class="swal2-input" placeholder="Número de tarjeta" type="number">',
        focusConfirm: false,
        preConfirm: () => {
            const nombre = Swal.getPopup().querySelector('#nombre').value;
            const tarjeta = Swal.getPopup().querySelector('#tarjeta').value;

            if (!nombre || !tarjeta) {
                Swal.showValidationMessage('Completa ambos campos');
            }
            
            const datosCompra = { nombre, tarjeta };
            console.log(datosCompra);

            productoEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productoEnCarrito))
            cargarProductosCarrito();

            return datosCompra;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('¡Gracias por tu compra!', '', 'success');
        }
    });
}



/* MODO COLOR */

const colorModeButton = document.querySelector("#colorMode");
const main = document.querySelector("main");
let darkMode = localStorage.getItem("darkMode")

function activaDarkMode() {
    main.classList.toggle("darkMode");
    localStorage.setItem("darkMode", "activado");
};

function desactivarDarkMode() {
    main.classList.remove("darkMode");
    localStorage.setItem("darkMode", "desactivado");
}

if (darkMode === "activado") {
    activaDarkMode();
} else {
    desactivarDarkMode();
};

colorModeButton.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode === "activado") {
        desactivarDarkMode();
        colorModeButton.innerText = "Cambiar a DarkMode";
        localStorage.setItem("colorModeButtonText", "Cambiar a DarkMode");
    } else {
        activaDarkMode();
        colorModeButton.innerText = "Cambiar a LightMode";
        localStorage.setItem("colorModeButtonText", "Cambiar a LightMode");
    };
});