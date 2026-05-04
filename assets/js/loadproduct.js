/* Función para cargar los detalles del producto seleccionado */
async function cargarProducto() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const response = await fetch('../data/productos.json');
    const productos = await response.json();

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        document.getElementById('detalles-producto').innerHTML = '<h3 class="text-center text-danger">Producto no encontrado</h3>';
        return;
    }

    document.getElementById('nombre-producto').textContent = producto.nombre;

    document.getElementById('detalles-producto').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
            </div>
            <div class="col-md-6">
                <h1>${producto.nombre}</h1>
                <p>${producto.descripcion}</p>
                <p class="fw-bold">${producto.precio.toFixed(2)} €</p>
                <button class="btn btn-success" onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
            </div>
        </div>
    `;

    mostrarProductosRelacionados(productos);
}

/* Función para mostrar productos relacionados */
function mostrarProductosRelacionados(productos) {
    const contenedorRelacionados = document.getElementById('productos-relacionados');
    contenedorRelacionados.innerHTML = "";

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

cargarProducto();