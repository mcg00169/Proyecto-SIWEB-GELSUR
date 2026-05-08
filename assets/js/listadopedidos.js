async function cargarPedidos() {
    try {
        const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
        mostrarPedidos(pedidos);

    }  catch (error) {
        console.error('Error al cargar los pedidos: ', error);
    }  
}

/* Función para mostrar los pedidos en el DOM */
function mostrarPedidos(listaPedidos) {
    const contenedorPedidos = document.getElementById('lista-pedidos');
    contenedorPedidos.innerHTML = ''; // Limpiar el contenedor antes de mostrar los pedidos

    listaPedidos.forEach(pedido => {
        if (pedido.estado === "Pendiente") {
            contenedorPedidos.innerHTML += `
                <div class="card p-3 mb-3">
                    <h5>Pedido #${pedido.id}</h5>
                    <p>Cliente: ${pedido.cliente}</p>
                    <p>Fecha: ${new Date(pedido.fecha).toLocaleString()}</p>
                    <p>Productos: ${pedido.productos.join(', ')}</p>
                    <p>Estado: ${pedido.estado}</p>
                    <button class="btn btn-success btn-sm" onclick="cambiarEstado(${pedido.id}, 'Enviado')">Listo para enviar</button>
                </div>
            `;
        } 
        if (pedido.estado === "Enviado") {
            contenedorPedidos.innerHTML += `
                <div class="card p-3 mb-3">
                    <h5>Pedido #${pedido.id}</h5>
                    <p>Cliente: ${pedido.cliente}</p>
                    <p>Fecha: ${new Date(pedido.fecha).toLocaleString()}</p>
                    <p>Productos: ${pedido.productos.join(', ')}</p>
                    <p>Estado: ${pedido.estado}</p>
                    <button class="btn btn-success btn-sm" onclick="cambiarEstado(${pedido.id}, 'Entregado')">Entregado</button>
                    <button class="btn btn-warning btn-sm" onclick="cambiarEstado(${pedido.id}, 'Retrasado')">Pedido retrasado</button>
                </div>
            `;
        } 
        if (pedido.estado === "Entregado") {
            contenedorPedidos.innerHTML += `
                <div class="card p-3 mb-3">
                    <h5>Pedido #${pedido.id}</h5>
                    <p>Cliente: ${pedido.cliente}</p>
                    <p>Fecha: ${new Date(pedido.fecha).toLocaleString()}</p>
                    <p>Productos: ${pedido.productos.join(', ')}</p>
                    <p>Estado: ${pedido.estado}</p>
                    <button class="btn btn-danger btn-sm" onclick="eliminarPedido(${pedido.id})">Eliminar</button>
                </div>
            `;
        }
        if (pedido.estado === "Retrasado") {
            contenedorPedidos.innerHTML += `
                <div class="card p-3 mb-3">
                    <h5>Pedido #${pedido.id}</h5>
                    <p>Cliente: ${pedido.cliente}</p>
                    <p>Fecha: ${new Date(pedido.fecha).toLocaleString()}</p>
                    <p>Productos: ${pedido.productos.join(', ')}</p>
                    <p>Estado: ${pedido.estado}</p>
                    <button class="btn btn-success btn-sm" onclick="cambiarEstado(${pedido.id}, 'Entregado')">Entregado</button>
                    <button class="btn btn-danger btn-sm" onclick="cambiarEstado(${pedido.id}, 'Entrega imposible de realizar')">Entrega imposible de realizar</button>
                </div>
            `;
        }
        if (pedido.estado === "Entrega imposible de realizar") {
            contenedorPedidos.innerHTML += `
                <div class="card p-3 mb-3">
                    <h5>Pedido #${pedido.id}</h5>
                    <p>Cliente: ${pedido.cliente}</p>
                    <p>Fecha: ${new Date(pedido.fecha).toLocaleString()}</p>
                    <p>Productos: ${pedido.productos.join(', ')}</p>
                    <p>Estado: ${pedido.estado}</p>
                    <button class="btn btn-danger btn-sm" onclick="eliminarPedido(${pedido.id})">Eliminar</button>
                </div>
            `;
        }
    })
}

function eliminarPedido(id) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidos = pedidos.filter(p => p.id !== id);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    cargarPedidos(); // Recargar la lista de pedidos después de eliminar
}

function cambiarEstado(id, nuevoEstado) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const pedido = pedidos.find(p => p.id === id);
    if (pedido) {
        pedido.estado = nuevoEstado;
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
        cargarPedidos(); // Recargar la lista de pedidos después de cambiar el estado
    }
}

cargarPedidos();