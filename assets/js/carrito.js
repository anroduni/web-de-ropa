// Archivo: carrito.js

// Ruta al archivo JSON con los datos de los productos
const productosUrl = "./assets/data/productos.json";

// Cargar productos del carrito y mostrarlos
document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length > 0) {
        fetch(productosUrl)
            .then((response) => response.json())
            .then((productos) => {
                mostrarCarrito(productos, carrito);
            })
            .catch((error) => console.error("Error al cargar productos:", error));
    } else {
        document.getElementById("carrito-container").innerHTML = "<p>Tu carrito está vacío</p>";
    }
});

// Mostrar los productos del carrito
function mostrarCarrito(productos, carrito) {
    const contenedor = document.getElementById("carrito-container");
    let total = 0;

    carrito.forEach((id) => {
        const producto = productos.find((p) => p.id === id);
        if (producto) {
            total += producto.precio;
            contenedor.innerHTML += `
                <div class="cell">
                    <div class="card">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <div class="card-section">
                            <h4>${producto.nombre}</h4>
                            <p>${producto.descripcion}</p>
                            <p><strong>Precio: $${producto.precio}</strong></p>
                        </div>
                    </div>
                </div>`;
        }
    });

    contenedor.innerHTML += `<h3>Total: $${total}</h3>`;
}

// Vaciar carrito (opcional)
document.getElementById("checkout-button")?.addEventListener("click", () => {
    localStorage.removeItem("carrito");
    alert("Gracias por tu compra");
    location.reload();
});
