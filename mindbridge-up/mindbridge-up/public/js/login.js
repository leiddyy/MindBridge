document.getElementById('formLogin').addEventListener('submit', async function (event) {
    const email = document.getElementById('username').value
    const senha = document.getElementById('password').value

    const dados = {
        email,
        senha
    }

    try {
        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert(resultado.mensagem); 
            localStorage.setItem("usuario", JSON.stringify(resultado.usuario)); 
            window.location.href = "tela_inicial.html"; 
        } else {
            alert(resultado.mensagem || "Email ou senha inválidos"); 
        }
    } catch (erro) {
        console.error("Erro ao enviar dados", erro);
    }
});