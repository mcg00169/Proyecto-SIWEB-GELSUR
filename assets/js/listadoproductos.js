/* Función asíncrona para cargar productos desde un archivo JSON */
async function cargarProductos() {
    try {
        const response = await fetch('../data/productos.json');
        const productos = await response.json();
        mostrarProductos(productos);

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
                            <p class="card-text">${producto.descripcion_larga}</p>
                            <p class="fw-bold">${producto.precio.toFixed(2)} €</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
}

cargarProductos();