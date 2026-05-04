// Función para cargar los componentes del sitio
function loadComponents(id, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar el componente: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => {
            console.error(`Error al cargar el componente: ${error.message}`);
        });
}

// Cargar el navbar y el footer al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    loadComponents("navbar-container", "../components/navbar.html");
    loadComponents("footer-container", "../components/footer.html");
});