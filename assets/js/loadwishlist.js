function obtenerWishlist() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function guardarWishlist(lista) {
    localStorage.setItem("wishlist", JSON.stringify(lista));
}

async function cargarWishlist() {
    const response = await fetch("../data/productos.json");
    const productos = await response.json();

    const wishlist = obtenerWishlist();
    const contenedor = document.getElementById("lista-deseos");

    contenedor.innerHTML = "";

    wishlist.forEach(id => {
        const producto = productos.find(p => p.id === id);
        if (!producto) return;

        contenedor.innerHTML += `
            <div class="card mb-3 shadow-sm p-3">
                <div class="row g-0">
                    <div class="col-md-3">
                        <img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}">
                    </div>
                    <div class="col-md-9">
                        <h5>${producto.nombre}</h5>
                        <p>${producto.descripcion_larga}</p>
                        <p class="fw-bold">${producto.precio.toFixed(2)} €</p>
                        <button class="btn btn-danger btn-sm" onclick="eliminarDeseo(${producto.id})">Eliminar</button>
                        <a href="producto.html?id=${producto.id}" class="btn btn-primary btn-sm">Ver producto</a>
                    </div>
                </div>
            </div>
        `;
    });
}

function agregarDeseo(id) {
    const lista = obtenerWishlist();
    if (!lista.includes(id)) {
        lista.push(id);
        guardarWishlist(lista);
        alert("Añadido a la lista de deseos");
    }
}

function eliminarDeseo(id) {
    let lista = obtenerWishlist();
    lista = lista.filter(item => item !== id);
    guardarWishlist(lista);
    cargarWishlist();
}

cargarWishlist();