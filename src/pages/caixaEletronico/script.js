// Atualiza o ano atual no rodapé
document.getElementById('ano-atual').textContent = new Date().getFullYear();

let balance = 0;
let transactionHistory = [];

function login() {
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("login-message");

    if (password === "1234") { // Senha fixa para teste
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("atm-screen").style.display = "block";
        loginMessage.textContent = "";
    } else {
        loginMessage.textContent = "Senha incorreta! Tente novamente.";
    }
}