/* Función asíncrona para cargar productos desde un archivo JSON */
async function cargarProductos() {
    try {
        const response = await fetch('../data/productos.json');
        const productos = await response.json();
        mostrarProductos(productos);

        // Filtrar productos por categoría
        const categoriaFiltro = document.getElementById('categoria');
        categoriaFiltro.addEventListener('change', () => {
            const categoriaSeleccionada = categoriaFiltro.value;
            const productosFiltrados = categoriaSeleccionada === 'todos' 
                ? productos 
                : productos.filter(producto => producto.categoria === categoriaSeleccionada);
            mostrarProductos(productosFiltrados);
        });

        // Filtrar productos por precio
        const precioFiltro = document.getElementById('precio');
        precioFiltro.addEventListener('change', () => {
            const precioSeleccionado = precioFiltro.value;
            const productosFiltrados = precioSeleccionado === 'todos'
                ? productos
                : productos.filter(producto => {
                    if (precioSeleccionado === '0-5') return producto.precio >= 0 && producto.precio <= 5;
                    if (precioSeleccionado === '5.5-10') return producto.precio > 5.5 && producto.precio <= 10;
                    if (precioSeleccionado === '10.5-15') return producto.precio > 10.5 && producto.precio <= 15;
                    if (precioSeleccionado === '15.5+') return producto.precio > 15.5;
                });
            mostrarProductos(productosFiltrados);
        });
    }  catch (error) {
        console.error('Error al cargar los productos: ', error);
    }  
}

/* Función para mostrar los productos en el DOM */
function mostrarProductos(listaProductos) {
    const contenedorProductos = document.getElementById('lista-productos');
    contenedorProductos.innerHTML = ''; // Limpiar el contenedor antes de mostrar los productos

    listaProductos.forEach(producto => {
        contenedorProductos.innerHTML += `
            <div class="card mb-4 shadow-sm">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${producto.imagen}" class="img-fluid rounded-start" alt="${producto.nombre}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">${producto.descripcion}</p>
                            <p class="fw-bold">${producto.precio.toFixed(2)} €</p>
                            <a href="producto.html?id=${producto.id}" class="btn btn-primary">Ver producto</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
}

cargarProductos();