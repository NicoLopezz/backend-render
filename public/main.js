
const formElement = document.getElementById("formularioRegistro")

formElement.addEventListener("submit", async(event) => {
    event.preventDefault(); //evita el reload del navegador
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value
    let password = document.getElementById("passwordR").value
    let password2 = document.getElementById("password2").value
    let email = document.getElementById("emailR").value
    let datosUsuario = { Name : nombre,
                         Surname : apellido, 
                         Pass : password, 
                         Pass2 : password2,  
                         Email : email}

    let datosUsuarioJson = JSON.stringify(datosUsuario);
    const res = await fetch("http://localhost:10001/api/register", {     
        method: 'POST',
            headers:
            {
            'Content-Type': 'application/json' 
            },
            body: datosUsuarioJson
        })
        const resJson = await res.json();
        if(resJson.redirect){
            window.location.href = resJson.redirect;
          }
})




////////////PARA DIRECCIONAR TENGO QUE IR AL MAINJS !! 






