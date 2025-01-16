document.getElementById('ano-atual').textContent = new Date().getFullYear();

// Função para mudar o tema
function changeTheme(theme) {
    document.body.className = theme;
    document.querySelector('header').className = theme;
    document.querySelector('main').className = theme;
    document.querySelector('footer').className = theme;
}

// Adiciona um evento de clique aos botões
document.querySelectorAll('button[data-theme]').forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        changeTheme(theme);
    });
});

// Define o tema claro como padrão ao carregar a página
window.onload = () => {
    const defaultTheme = 'light-theme';
    changeTheme(defaultTheme);
};