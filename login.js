document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("formLogin");

    if (formLogin) {
        formLogin.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o recarregamento da página

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Validação simples (apenas checa se não estão vazios)
            if (email && password) {   
                alert("Login realizado com sucesso!");
                
                // Redireciona para a página principal do projeto
                window.location.href = "index.html"; 
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        });
    }
});