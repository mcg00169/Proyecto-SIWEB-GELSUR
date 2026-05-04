/* Función para obtener los datos del carrito desde localStorage y mostrarlos en el DOM */
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

/* Función para guardar un producto en el carrito en localStorage */
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
    const carrito = obtenerCarrito();
    carrito.push(id);
    guardarCarrito(carrito);
    alert("Producto añadido al carrito");
}

/* Función asíncrona para mostrar los datos del carrito en el DOM */
async function cargarCarrito() {
    const response = await fetch('../data/productos.json');
    const productos = await response.json();

    const carrito = obtenerCarrito();
    const contenedorCarrito = document.getElementById('carrito-lista');

    contenedorCarrito.innerHTML = ""; // Limpiar el contenedor antes de mostrar los productos

    let subtotal = 0;

    carrito.forEach(id => {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;

        subtotal += producto.precio;

        contenedorCarrito.innerHTML += `
            <div class="card mb-3 shadow-sm p-3">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
                    </div>
                    <div class="col-md-9">
                        <h5>${producto.nombre}</h5>
                        <p>${producto.descripcion}</p>
                        <p class="fw-bold">${producto.precio.toFixed(2)} €</p>
                        <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Resumen del pedido
    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    
    const envio = subtotal > 20 ? 0 : 3.99; // Envío gratuito para pedidos superiores a 20€
    document.getElementById("envio").textContent = envio.toFixed(2);

    const total = subtotal + envio;

    document.getElementById("total").textContent = total.toFixed(2);
    
    mostrarRelacionados(productos);
}

/* Función para eliminar un producto del carrito */
function eliminarDelCarrito(id) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item !== id);
    guardarCarrito(carrito);
    cargarCarrito(); // Recargar el carrito para actualizar la vista
}

/* Función para mostrar los productos relacionados con el carrito */
function mostrarRelacionados(productos) {
    const contenedorRelacionados = document.getElementById("relacionados");
    contenedorRelacionados.innerHTML = ""; // Limpiar el contenedor antes de mostrar los productos relacionados

    const relacionados = productos.sort(() => 0.5 - Math.random()).slice(0, 4); // Seleccionar 4 productos aleatorios
    relacionados.forEach(producto => {
        contenedorRelacionados.innerHTML += `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="fw-bold">${producto.precio.toFixed(2)} €</p>
                        <a href="producto.html?id=${producto.id}" class="btn btn-primary">Ver producto</a>
                    </div>
                </div>
            </div>
        `;
    })
}

cargarCarrito();