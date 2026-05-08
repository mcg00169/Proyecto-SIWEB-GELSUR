async function cargarUsuarios() {
    try {
        const params = new URLSearchParams(window.location.search);
        const us = params.get("u");

        const response = await fetch('../data/usuarios.json');
        const usuarios = await response.json();
        const usuarioConectado = usuarios.find(u => u.nickname === us);
        if (usuarioConectado) {
            if (usuarioConectado.rol === "empleado") {
                const contenedor = document.getElementById("lista-usuarios");
                contenedor.innerHTML += `
                    <h3 class="text-danger">Necesitas ser administrador para visualizar esto.</h3>
                `;
            } else {
                mostrarUsuarios(usuarios);
            }
        }
    }  catch (error) {
        console.error('Error al cargar los usuarios: ', error);
    }  
}

function mostrarUsuarios(listaUsuarios) {
    const contenedor = document.getElementById("lista-usuarios");

    
    listaUsuarios.forEach(u => {
        if (u.rol === "administrador") return; // Omitir administradores
        contenedor.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${u.nombre} ${u.apellidos}</h5>
                    <p class="card-text">Email: ${u.correo}</p>
                    <p class="card-text">Nickname: ${u.nickname}</p>
                </div>
            </div>
        `;
    });
}

cargarUsuarios();