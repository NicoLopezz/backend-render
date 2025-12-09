const formElement2 = document.getElementById("formularioLogin");

formElement2.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita el reload del navegador
    
    let password = document.getElementById("passwordL").value;
    let email = document.getElementById("emailL").value;
    let datosUsuario = { Pass: password, Email: email };
    
    let datosUsuarioJson = JSON.stringify(datosUsuario);
    
    try {
        const res = await fetch("http://localhost:10001/api/login", {     
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: datosUsuarioJson
        });

        if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
        }

        const resJson = await res.json();
        console.log(resJson); // Verifica la respuesta del servidor

        if (resJson.redirect) {
            window.location.href = resJson.redirect;
        } else {
            console.log("Inicio de sesión fallido, verifica credenciales.");
        }
    } catch (error) {
        console.error("Hubo un problema con la solicitud:", error);
    }
});
