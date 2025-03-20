
document.getElementById('cadastro_form').addEventListener("submit", async function (event) {

    const nome = document.getElementById('name').value
    const email = document.getElementById('email').value
    const cpf = document.getElementById('cpf').value
    const role = document.getElementById('role').value
    const senha = document.getElementById('password').value

    const dados = {
        nome,
        email,
        cpf,
        role,
        senha
    } 

    const apiUrl = role === 'profissional' ? 'http://localhost:3000/cadastro_profissional' : 'http://localhost:3000/cadastro_membro'

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        alert('Cadastro realizado com sucesso!');
        console.log(data);
    })
    .catch(error => {
        alert('Erro ao cadastrar. Tente novamente.');
        console.error(error);
    });
});



