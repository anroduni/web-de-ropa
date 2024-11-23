document.addEventListener("DOMContentLoaded", () => {
    const productosDestacados = document.getElementById("productos-destacados");
    const carritoIcono = document.getElementById("carrito-icono");
    const carrito = [];

    // Renderizar productos destacados
    const renderizarProductos = (categoria = null) => {
        productosDestacados.innerHTML = "";
        const productosFiltrados = categoria 
            ? productos.filter(p => p.categoria === categoria)
            : productos;

        productosFiltrados.forEach(producto => {
            const productoHTML = `
                <div class="card" style="width: 300px;">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img-top">
                    <div class="card-section">
                        <h4>${producto.nombre}</h4>
                        <p>$${producto.precio.toFixed(2)}</p>
                        <button class="button small" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                    </div>
                </div>`;
            productosDestacados.innerHTML += productoHTML;
        });
    };

    const agregarAlCarrito = (id) => {
        const producto = productos.find(p => p.id === id);
        if (producto) {
            carrito.push(producto);
            actualizarCarrito();
        }
    };

    const actualizarCarrito = () => {
        carritoIcono.innerText = `Carrito (${carrito.length})`;
    };

    // Inicializar
    renderizarProductos();
    window.agregarAlCarrito = agregarAlCarrito; // Exponer la función globalmente
});
