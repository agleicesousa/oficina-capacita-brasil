document.getElementById('ano-atual').textContent = new Date().getFullYear();

let balance = 0;
let transactionHistory = [];
let failedAttempts = 0;

function showMessage(message, elementId, timeout = 3000) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;

    setTimeout(() => {
        messageElement.textContent = "";
    }, timeout);
}

function login() {
    const password = document.getElementById("password").value.trim();
    const loginMessage = document.getElementById("login-message");

    if (failedAttempts >= 3) {
        loginMessage.textContent = "Limite de tentativas atingido!";
        return;
    }

    if (password === "senha123") {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("atm-screen").style.display = "flex";
    } else {
        failedAttempts++;
        loginMessage.textContent = "Senha incorreta, tente novamente.";
        showMessage("Senha incorreta, tente novamente.", "login-message");
    }
}

function formatInputValue(input) {
    let value = input.value.replace(/\D/g, "");
    value = (value / 100).toFixed(2);
    value = value.replace(".", ",");

    input.value = "R$ " + value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function deposit() {
    const amount = parseFloat(document.getElementById("amount").value.replace("R$ ", "").replace(".", "").replace(",", "."));

    if (isNaN(amount) || amount <= 0) {
        showMessage("Por favor, insira um valor válido!", "message");
        return;
    }

    balance += amount;
    transactionHistory.push({ date: new Date().toLocaleString(), type: "Depósito", value: `R$ ${amount.toFixed(2)}` });
    updateBalance();
    updateTransactionHistory();
}

function withdraw() {
    const amount = parseFloat(document.getElementById("amount").value.replace("R$ ", "").replace(".", "").replace(",", "."));

    if (isNaN(amount) || amount <= 0) {
        showMessage("Por favor, insira um valor válido!", "message");
        return;
    }

    if (amount > balance) {
        showMessage("Saldo insuficiente!", "message");
        return;
    }

    balance -= amount;
    transactionHistory.push({ date: new Date().toLocaleString(), type: "Saque", value: `R$ ${amount.toFixed(2)}` });
    updateBalance();
    updateTransactionHistory();
}

function logout() {
    document.getElementById("login-screen").style.display = "flex";
    document.getElementById("atm-screen").style.display = "none";
    failedAttempts = 0;
}

function updateBalance() {
    document.getElementById("balance").textContent = `R$ ${balance.toFixed(2)}`;
}

function updateTransactionHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = '';

    transactionHistory.forEach(transaction => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>${transaction.value}</td>
        `;
        historyList.appendChild(row);
    });
}