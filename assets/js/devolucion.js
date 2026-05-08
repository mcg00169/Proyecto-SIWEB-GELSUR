document.getElementById("form-devolucion").addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Solicitud de devolución enviada correctamente. Nos pondremos en contacto contigo.");
    window.location.href = "../index.html";
});