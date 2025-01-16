document.getElementById('ano-atual').textContent = new Date().getFullYear();

const inputNumero = document.getElementById('input-numero');
const botaoEnviar = document.getElementById('botao-enviar');
const mensagem = document.getElementById('mensagem');

let pontos = 0;
let tentativas = 0;
const maxTentativas = 5;

const gerarNumeroAleatorio = () => Math.floor(Math.random() * 10) + 1;
let numeroComputador = gerarNumeroAleatorio();

botaoEnviar.addEventListener('click', () => {
    const numeroEscolhido = parseInt(inputNumero.value, 10);

    if (isNaN(numeroEscolhido) || numeroEscolhido < 1 || numeroEscolhido > 10) {
        mensagem.textContent = 'Por favor, insira um número válido entre 1 e 10.';
        mensagem.style.color = 'red';
        return;
    }

    tentativas++;
    let resultado;

    if (numeroEscolhido === numeroComputador) {
        pontos++;
        resultado = 'Acertou';
        mensagem.textContent = `Parabéns! Você acertou! O número era ${numeroComputador}.`;
        numeroComputador = gerarNumeroAleatorio();
    } else {
        pontos--;
        resultado = 'Errou';
        mensagem.textContent = `Você errou! O número era ${numeroComputador}.`;
    }
    
    inputNumero.value = '';
    inputNumero.focus();
});