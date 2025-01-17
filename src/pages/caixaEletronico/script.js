// Atualiza o ano atual no rodapé
document.getElementById('ano-atual').textContent = new Date().getFullYear();

let balance = 0;
let transactionHistory = [];

function login() {
    const password = document.getElementById("password").value;
    const loginMessage = document.getElementById("login-message");

    if (password === "1234") {
        toggleVisibility("login-screen", false);
        toggleVisibility("atm-screen", true);
        loginMessage.textContent = "";
    } else {
        loginMessage.textContent = "Senha incorreta! Tente novamente.";
    }
}

function logout() {
    toggleVisibility("atm-screen", false);
    toggleVisibility("transaction-history", false);
    toggleVisibility("login-screen", true);
    document.getElementById("password").value = "";
    document.getElementById("message").textContent = "";
}

function deposit() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);
    const message = document.getElementById("message");

    if (amount > 0) {
        balance += amount;
        transactionHistory.push(`Depósito: R$ ${amount.toFixed(2)}`);
        message.textContent = `Depósito de R$ ${amount.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
        )} realizado com sucesso.`;
        updateBalanceDisplay();
    } else {
        message.textContent = "Valor inválido. Tente novamente.";
    }
    amountInput.value = "";
}

function toggleVisibility(elementId, isVisible) {
    document.getElementById(elementId).style.display = isVisible ? "block" : "none";
}

function updateBalanceDisplay() {
    document.getElementById("balance").textContent = balance.toFixed(2);
}

function withdraw() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);
    const message = document.getElementById("message");

    if (isNaN(amount) || amount <= 0) {
        message.textContent = "Valor inválido. Tente novamente.";
    } else if (amount > balance) {
        message.textContent = "Saldo insuficiente para realizar o saque.";
    } else {
        balance -= amount;
        transactionHistory.push(`Saque: R$ ${amount.toFixed(2)}`);
        message.textContent = `Saque de R$ ${amount.toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
        )} realizado com sucesso.`;
        updateBalanceDisplay();
    }
    amountInput.value = "";
}