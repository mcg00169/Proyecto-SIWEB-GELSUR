document.getElementById("form-pago").addEventListener("submit", async (e) => {
    e.preventDefault();

    const cliente = document.getElementById("cliente").value;
    const numeroTarjeta = document.getElementById("numero-tarjeta").value;
    const fechaCaducidad = document.getElementById("fecha-caducidad").value;

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (!validarNumeroTarjeta(numeroTarjeta)) {
        alert("Número de tarjeta no válido. Solo se aceptan tarjetas Visa y Mastercard.");
        return;
    }
    if (numeroTarjeta.length !== 16) {
        alert("El número de tarjeta debe tener 16 dígitos.");
        return;
    }
    if (fechaCaducidad < new Date().toISOString().slice(0, 7)) {
        alert("La tarjeta ha caducado. Por favor, introduce una tarjeta válida.");
        return;
    }

    pedidos.push({
        id: pedidos.length + 1,
        cliente: cliente,
        fecha: new Date().toISOString(),
        productos: carrito,
        estado: "Pendiente"
    });

    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    localStorage.removeItem("carrito");

    alert("Pedido realizado con éxito");
    window.location.href = "../index.html";
});

function validarNumeroTarjeta(numero) {
    const numVisa = 4196; // Visa
    const numMastercard = 5100; // Mastercard

    const prefijo = parseInt(numero.substring(0, 4));
    if (prefijo === numVisa || prefijo === numMastercard) {
        return true;
    } else {
        return false;
    }
}