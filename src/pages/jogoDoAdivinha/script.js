// Atualiza o ano atual no rodapé
document.getElementById('ano-atual').textContent = new Date().getFullYear();

// Seleção de elementos
const inputNumero = document.getElementById('input-numero');
const botaoEnviar = document.getElementById('botao-enviar');
const mensagem = document.getElementById('mensagem');
const historicoJogadas = document.getElementById('historico-jogadas');

// Variáveis do jogo
let pontos = 0;
let tentativas = 0;
const maxTentativas = 5;
let numeroComputador = gerarNumeroAleatorio();

// Função para gerar número aleatório
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 10) + 1;
}

// Função para adicionar uma linha no histórico de jogadas
function adicionarLinhaHistorico(tentativa, numeroEscolhido, resultado) {
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${tentativa}</td>
        <td>${numeroEscolhido}</td>
        <td>${resultado}</td>
    `;
    historicoJogadas.appendChild(novaLinha);
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    pontos = 0;
    tentativas = 0;
    numeroComputador = gerarNumeroAleatorio();
    mensagem.textContent = 'Novo jogo iniciado! Tente adivinhar o número.';
    mensagem.style.color = 'black';
    historicoJogadas.innerHTML = '';
    inputNumero.value = '';
    inputNumero.focus();
    botaoEnviar.disabled = false;
}

// Evento de clique no botão "Enviar"
botaoEnviar.addEventListener('click', () => {
    const numeroEscolhido = parseInt(inputNumero.value, 10);

    // Valida o número inserido
    if (isNaN(numeroEscolhido) || numeroEscolhido < 1 || numeroEscolhido > 10) {
        mensagem.textContent = 'Por favor, insira um número válido entre 1 e 10.';
        mensagem.style.color = 'red';
        return;
    }

    tentativas++;
    let resultado;

    // Verifica se o número escolhido é igual ao do computador
    if (numeroEscolhido === numeroComputador) {
        pontos++;
        resultado = 'Acertou';
        mensagem.textContent = `Parabéns! Você acertou o número era ${numeroComputador}. Reiniciando o jogo...`;
        mensagem.style.color = 'green';

        // Reinicia o jogo após 2 segundos
        setTimeout(reiniciarJogo, 2000);
    } else {
        pontos--;
        resultado = 'Errou';
        mensagem.textContent = 'Você errou! Tente novamente.';
        mensagem.style.color = 'black';
    }

    // Atualiza o histórico de jogadas
    adicionarLinhaHistorico(tentativas, numeroEscolhido, resultado);

    // Verifica se o jogo acabou por tentativas ou pontos
    if (tentativas >= maxTentativas || pontos <= -maxTentativas) {
        botaoEnviar.disabled = true;
        mensagem.textContent += ' Fim do jogo!';
        mensagem.style.color = 'blue';
    }

    // Limpa o campo de entrada
    inputNumero.value = '';
    inputNumero.focus();
});