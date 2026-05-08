document.getElementById("form-login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("password").value;

    const response = await fetch("../data/usuarios.json");
    const usuarios = await response.json();

    const encontrado = usuarios.find(u => u.nickname === user && u.password === pass);

    if (encontrado) {
        window.location.href = `../pages/admin.html?u=${encontrado.nickname}`;
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});