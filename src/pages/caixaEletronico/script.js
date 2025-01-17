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
        showMessage("Muitas tentativas incorretas. Tente novamente mais tarde.", "login-message");
        return;
    }

    if (password === "1234") {
        toggleVisibility("login-screen", false);
        toggleVisibility("atm-screen", true);
        showMessage("", "login-message", 0);
    } else {
        failedAttempts++;
        showMessage(`Senha incorreta! Tentativa ${failedAttempts}/3.`, "login-message");
    }
}

function logout() {
    toggleVisibility("atm-screen", false);
    toggleVisibility("transaction-history", false);
    toggleVisibility("login-screen", true);
    document.getElementById("password").value = "";
    showMessage("", "message", 0);
}

function deposit() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);

    if (amount > 0) {
        balance += amount;
        transactionHistory.push({ type: "deposit", value: amount });
        showMessage(`Depósito de ${formatCurrency(amount)} realizado com sucesso.`, "message");
        updateBalanceDisplay();
    } else {
        showMessage("Digite um valor válido para depositar.", "message");
    }
    amountInput.value = "";
}

function withdraw() {
    const amountInput = document.getElementById("amount");
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        showMessage("Valor inválido. Tente novamente.", "message");
    } else if (amount > balance) {
        showMessage("Saldo insuficiente para realizar o saque.", "message");
    } else {
        balance -= amount;
        transactionHistory.push({ type: "withdraw", value: amount });
        showMessage(`Saque de ${formatCurrency(amount)} realizado com sucesso.`, "message");
        updateBalanceDisplay();
    }
    amountInput.value = "";
}

function showHistory() {
    const historySection = document.getElementById("transaction-history");
    const historyList = document.getElementById("history-list");

    historyList.innerHTML = transactionHistory
        .map(transaction =>
            `<li style="color:${transaction.type === 'deposit' ? 'green' : 'red'};">
                ${transaction.type === 'deposit' ? 'Depósito' : 'Saque'}: ${formatCurrency(transaction.value)}
            </li>`)
        .join("");

    historyList.innerHTML += `<li style="color:black;">Saldo Atual: ${formatCurrency(balance)}</li>`;
    historySection.style.display = "block";
}

function formatCurrency(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function toggleVisibility(elementId, isVisible) {
    document.getElementById(elementId).style.display = isVisible ? "block" : "none";
}

function updateBalanceDisplay() {
    const balanceDisplay = document.getElementById("balance");
    balanceDisplay.textContent = formatCurrency(balance);
}