const formElement2 = document.getElementById("formularioLogin");

formElement2.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const password = document.getElementById("passwordL").value;
    const email = document.getElementById("emailL").value;
    const datosUsuario = { email: email, password: password };
    
    const errorMessageElement = document.getElementById("error-message");
    if (errorMessageElement) {
        errorMessageElement.textContent = "";
        errorMessageElement.style.display = "none";
    }
    
    try {
        const res = await fetch("http://localhost:10001/api/login", {     
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(datosUsuario)
        });

        const resJson = await res.json();
        console.log("Respuesta del servidor:", resJson);

        if (resJson.status === "logged") {
            console.log("Login exitoso");
            if (resJson.user) {
                console.log("Usuario:", resJson.user);
            }
            window.location.href = "/dashboard.html";
        } else if (resJson.status === "2fa_required") {
            console.log("2FA requerido");
            if (errorMessageElement) {
                errorMessageElement.textContent = "Se ha enviado un código de verificación a tu email. Por favor, verifica tu correo.";
                errorMessageElement.style.display = "block";
            }
        } else if (resJson.status === "Error") {
            console.log("Error en login:", resJson.message);
            if (errorMessageElement) {
                errorMessageElement.textContent = resJson.message || "Something went wrong. Please try again.";
                errorMessageElement.style.display = "block";
            }
        } else {
            console.log("Respuesta inesperada:", resJson);
            if (errorMessageElement) {
                errorMessageElement.textContent = "Something went wrong. Please try again.";
                errorMessageElement.style.display = "block";
            }
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        const errorMessageElement = document.getElementById("error-message");
        if (errorMessageElement) {
            errorMessageElement.textContent = "Something went wrong. Please try again.";
            errorMessageElement.style.display = "block";
        }
    }
});
