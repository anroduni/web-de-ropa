// Datos de productos
const productos = [
    { categoria: "dama", nombre: "Vestido Floral", precio: 35, imagen: "https://images.unsplash.com/photo-1618354690043-3bcd5c9e9d58" },
    { categoria: "dama", nombre: "Blusa Casual", precio: 20, imagen: "https://images.unsplash.com/photo-1618354693078-472b11b1a6f7" },
    { categoria: "dama", nombre: "Pantalones Elegantes", precio: 40, imagen: "https://images.unsplash.com/photo-1593031861430-2a6cb7e51084" },
    { categoria: "caballero", nombre: "Camisa Formal", precio: 25, imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { categoria: "caballero", nombre: "Pantalones de Mezclilla", precio: 30, imagen: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
    { categoria: "ninos", nombre: "Playera Divertida", precio: 15, imagen: "https://images.unsplash.com/photo-1522337660859-02fbefca4702" },
    { categoria: "bebe", nombre: "Mameluco Suave", precio: 18, imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f" },
];

// Función para cargar productos dinámicamente
function cargarProductos() {
    const secciones = {
        dama: document.getElementById("productos-dama"),
        caballero: document.getElementById("productos-caballero"),
        ninos: document.getElementById("productos-ninos"),
        bebe: document.getElementById("productos-bebe"),
    };

    productos.forEach((producto) => {
        const productoHTML = `
            <div class="producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito('${producto.nombre}')">Agregar al carrito</button>
            </div>
        `;

        if (secciones[producto.categoria]) {
            secciones[producto.categoria].innerHTML += productoHTML;
        }
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombreProducto) {
    // Encuentra el producto por nombre
    const producto = productos.find(p => p.nombre === nombreProducto);

    if (producto) {
        // Recupera el carrito de localStorage o inicialízalo si está vacío
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Agrega el producto al carrito
        carrito.push(producto);

        // Guarda el carrito actualizado en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Muestra el carrito actualizado
        mostrarCarrito();
        alert(`${producto.nombre} fue agregado al carrito.`);
    } else {
        console.error("Producto no encontrado:", nombreProducto);
    }
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carritoContainer = document.getElementById("carrito-contenido");
    
    // Recupera el carrito de localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carritoContainer.innerHTML = "";

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        let total = 0;
        carrito.forEach((producto, index) => {
            total += producto.precio;
            carritoContainer.innerHTML += `
                <div class="carrito-llevo">
                <span>${producto.nombre}</span>
                    <span>$${producto.precio.toFixed(2)}</span>
                    <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
        });

        // Mostrar total
        carritoContainer.innerHTML += `<h3>Total: $${total.toFixed(2)}</h3>`;
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); // Elimina el producto por índice

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Muestra el carrito actualizado
    mostrarCarrito();
}

// Cargar productos al cargar la página
document.addEventListener("DOMContentLoaded", cargarProductos);
mostrarCarrito();
// Función para ir al carrito (opcional)
function irAlCarrito() {
    window.location.href = "/carrito.html"; // Cambia la URL a la página del carrito
}
