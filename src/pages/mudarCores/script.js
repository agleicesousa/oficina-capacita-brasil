// Atualiza o ano atual no rodapé
document.getElementById('ano-atual').textContent = new Date().getFullYear();

// Função para mudar o tema
function changeTheme(theme) {
    document.body.className = theme;
    document.querySelector('header').className = theme;
    document.querySelector('main').className = theme;
    document.querySelector('footer').className = theme;
}

// Define o tema padrão (Tema Claro) quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    changeTheme('light-theme');
});

// Adiciona eventos de clique aos botões de tema
document.querySelectorAll('button[data-theme]').forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        changeTheme(theme);
    });
});
