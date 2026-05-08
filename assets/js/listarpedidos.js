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
        contenedorPedidos.innerHTML += `
            <div class="card p-3 mb-3">
                <h5>Pedido #${pedido.id}</h5>
                <p>Cliente: ${pedido.cliente}</p>
                <p>Fecha: ${new Date(pedido.fecha).toLocaleString()}</p>
                <p>Productos: ${pedido.productos.join(', ')}</p>
                <p>Estado: ${pedido.estado}</p>
            </div>
        `;        
    });
}