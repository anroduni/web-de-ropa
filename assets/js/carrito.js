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
// Cargar productos del carrito y mostrarlos
document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoContainer = document.getElementById("carrito-container");

    // Limpiar contenedor antes de agregar productos
    carritoContainer.innerHTML = ""; 

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        carritoContainer.innerHTML = `
            <div class="empty-cart">
                <img src="assets/img/vacio-carrito-de-compras.png" alt="Carrito vacío" class="empty-cart-img">
                <p>Tu carrito está vacío. ¡Agrega algunos productos!</p>
            </div>`;
        return; // Salir de la función si no hay productos
    }

    // Si el carrito tiene productos, llama a la función para mostrarlos
    mostrarCarritos(productos, carrito);
});



// Mostrar los productos del carrito
function mostrarCarritos(productos, carrito) {
    const contenedor = document.getElementById("carrito-container");
    let total = 0;
    contenedor.innerHTML = ""; // Limpiar contenedor antes de agregar productos

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="empty-cart">
                <img src="assets/img/vacio-carrito-de-compras.png" alt="Carrito vacío" class="empty-cart-img">
                <p>Tu carrito está vacío. ¡Agrega algunos productos!</p>
            </div>`;
        return; // Salir de la función si no hay productos
    }

    // Mostrar productos si el carrito no está vacío
    carrito.forEach((producto, index) => { // Agregamos `index` como segundo parámetro
        total += producto.precio;
        contenedor.innerHTML += `
            <div class="cell medium-4">
                <div class="card">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img">
                    <div class="card-section">
                        <h4>${producto.nombre}</h4>
                        <p>${producto.categoria}</p>
                        <p><strong>Precio: $${producto.precio}</strong></p>
                        <button onclick="eliminarDelCarritos(${index})">Eliminar</button>
                    </div>
                </div>
            </div>`;
    });

    // Mostrar el total
    contenedor.innerHTML += `
        <div class="cell medium-12">
            <h3>Total: $${total}</h3>
        </div>`;
}



    function eliminarDelCarritos(index) {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1); // Eliminar el producto por índice
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar el carrito actualizado
        mostrarCarritos(carrito, carrito); // Actualizar la vista del carrito
    }
    
// Vaciar carrito (opcional)
document.getElementById("checkout-button")?.addEventListener("click", () => {
    console.log(localStorage);


//    localStorage.removeItem("carrito");
   // alert("Gracias por tu compra.");
   // window.location.href = "index.html"; // Redirige a la página de inicio tras el pago
   
});
