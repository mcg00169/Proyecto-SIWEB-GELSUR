async function cargarNoticias() {
    const response = await fetch("../data/noticias.json");
    const noticias = await response.json();

    const contenedor = document.getElementById("lista-noticias");

    noticias.forEach(n => {
        contenedor.innerHTML += `
            <div class="card mb-4 p-3 shadow-sm">
                <h3>${n.titulo}</h3>
                <p class="text-muted">Publicado el ${new Date(n.fecha).toLocaleDateString()}</p>
                <p>${n.contenido}</p>
            </div>
        `;
    });
}

cargarNoticias();