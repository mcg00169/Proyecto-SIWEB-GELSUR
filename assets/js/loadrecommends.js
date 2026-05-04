/* Función asíncrona para cargar los productos recomendados en la página de inicio */
async function cargarRecomendados() {
    try {
        const response = await fetch('./data/productos.json');
        const productos = await response.json();
        mostrarRecomendados(productos);
    } catch (error) {
        console.error('Error al cargar los productos recomendados: ', error);
    }
}

/* Función para mostrar los productos recomendados en el DOM */
function mostrarRecomendados(productos) {
    const contenedorRecomendados = document.getElementById('productos-recomendados');
    contenedorRecomendados.innerHTML = ''; // Limpiar el contenedor antes de mostrar los productos

    const recomendados = productos.sort(() => 0.5 - Math.random()).slice(0, 4); // Seleccionar 4 productos aleatorios
    recomendados.forEach(producto => {
        contenedorRecomendados.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
                <div class="card h-100 shadow-sm">
                    <img
                        class="img-fluid rounded"
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                    />
                    <div class="card-body">
                        <h2 class="card-title">${producto.nombre}</h2>
                        <p class="card-text">
                            ${producto.descripcion}
                        </p>
                        <p class="fw-bold">
                            ${producto.precio.toFixed(2)} €
                        </p>
                        <a
                            class="btn text-primary"
                            href="./pages/producto.html?id=${producto.id}"
                            role="button"
                        >
                            Detalles »
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
}

cargarRecomendados();