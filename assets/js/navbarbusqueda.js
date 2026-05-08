document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("form-busqueda").addEventListener("submit", function(e) {
        e.preventDefault();

        const texto = document.getElementById("input-busqueda").value.trim();

        if (texto !== "") {
            window.location.href = `./pages/buscar.html?texto=${encodeURIComponent(texto)}`;
        }
    });
});