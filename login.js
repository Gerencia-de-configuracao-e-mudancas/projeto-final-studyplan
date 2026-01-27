document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", function (event) {
            event.preventDefault(); 

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            
            if (email && password) {   
                alert("Login realizado com sucesso!");
                
                
                window.location.href = "Principal/pagina_principal.html"; 
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }
});