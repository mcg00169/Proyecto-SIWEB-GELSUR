async function cargarResultados() {
    const query = new URLSearchParams(window.location.search);
    const texto = (query.get("texto") || "").toLowerCase();
    const categoria = query.get("categoria") || "";

    if (texto !== "") {
        document.getElementById("texto-resultados").textContent = "Resultados de búsqueda: " + texto;
    } else {
        if (categoria === "pan-artesanal") {
            document.getElementById("texto-resultados").textContent = "Todos los productos de pan artesanal";
        } 
        if (categoria === "pan-precocinado") {
            document.getElementById("texto-resultados").textContent = "Todos los productos de pan precocinado";
        }
        if (categoria === "bolleria") {
            document.getElementById("texto-resultados").textContent = "Todos los productos de bollería";
        }
        if (categoria === "tartas") {
            document.getElementById("texto-resultados").textContent = "Todos los productos de tartas y postres";
        }
    }

    const response = await fetch('../data/productos.json');
    const productos = await response.json();

    const filtrados = productos.filter(p => {
        const coincideTexto = texto === "" || p.nombre.toLowerCase().includes(texto);
        const coincideCategoria = categoria === "" || p.categoria === categoria;
        return coincideTexto && coincideCategoria;
    });

    mostrarResultados(filtrados);
}

function mostrarResultados(productos) {
    const contenedorProductos = document.getElementById('lista-productos');
    contenedorProductos.innerHTML = '';

    productos.forEach(producto => {
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
                            <a href="producto.html?id=${producto.id}" class="btn btn-primary">Ver producto</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

cargarResultados();