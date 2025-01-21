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

// Função para exibir mensagens
function exibirMensagem(texto, cor = 'black') {
    mensagem.textContent = texto;
    mensagem.style.color = cor;
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
    exibirMensagem('Novo jogo iniciado! Tente adivinhar o número.', 'black');
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
        exibirMensagem('Por favor, insira um número válido entre 1 e 10.', 'red');
        return;
    }

    tentativas++;
    let resultado;

    // Verifica se o número escolhido é igual ao do computador
    if (numeroEscolhido === numeroComputador) {
        pontos++;
        resultado = 'Acertou';
        exibirMensagem(`Parabéns! Você acertou o número era ${numeroComputador}. Reiniciando o jogo...`, 'green');

        // Reinicia o jogo após 2 segundos
        setTimeout(reiniciarJogo, 2000);
        return;
    } else {
        pontos--;
        resultado = 'Errou';
        exibirMensagem('Você errou! Tente novamente.', 'black');
    }

    // Atualiza o histórico de jogadas
    adicionarLinhaHistorico(tentativas, numeroEscolhido, resultado);

    // Verifica se o jogo acabou por tentativas ou pontos
    if (tentativas >= maxTentativas || pontos <= -maxTentativas) {
        botaoEnviar.disabled = true;
        exibirMensagem(
            `Fim do jogo! O número correto era ${numeroComputador}. Reiniciando o jogo...`,
            'red'
        );

        // Reinicia o jogo após 2 segundos
        setTimeout(reiniciarJogo, 2000);
        return;
    }

    // Limpa o campo de entrada
    inputNumero.value = '';
    inputNumero.focus();
});