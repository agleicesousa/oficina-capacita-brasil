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
        transactionHistory.push({ type: "deposit", value: amount });
        message.textContent = `Depósito de R$ ${amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} realizado com sucesso.`;
        updateBalanceDisplay();
    } else {
        message.textContent = "Digite um valor válido para depositar.";
    }
    amountInput.value = "";
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
        transactionHistory.push({ type: "withdraw", value: amount });
        message.textContent = `Saque de R$ ${amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} realizado com sucesso.`;
        updateBalanceDisplay();
    }
    amountInput.value = "";
}

function showHistory() {
    const historySection = document.getElementById("transaction-history");
    const historyList = document.getElementById("history-list");

    historyList.innerHTML = "";
    transactionHistory.forEach(transaction => {
        const listItem = document.createElement("li");

        if (transaction.type === "deposit") {
            listItem.style.color = "green";
            listItem.textContent = `Depósito: R$ ${transaction.value.toFixed(2)}`;
        } else if (transaction.type === "withdraw") {
            listItem.style.color = "red";
            listItem.textContent = `Saque: R$ ${transaction.value.toFixed(2)}`;
        }

        historyList.appendChild(listItem);
    });

    const currentBalanceItem = document.createElement("li");
    currentBalanceItem.style.color = "black";
    currentBalanceItem.textContent = `Saldo Atual: R$ ${balance.toFixed(2)}`;
    historyList.appendChild(currentBalanceItem);

    historySection.style.display = "block";
}