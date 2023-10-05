// Seleciona todas as células do tabuleiro.
const celulas = document.querySelectorAll('.celula');

// Seleciona o elemento com o ID 'mensagem'.
const mensagem = document.getElementById('mensagem');

// Define a variável 'jogadorAtual' com o valor inicial 'X'.
let jogadorAtual = 'X';

// Inicializa a variável 'jogoEncerrado' como 'false'. Ela será usada para verificar se o jogo terminou.
let jogoEncerrado = false;

// Cria um array 'tabuleiro' para representar o estado do jogo. Inicializa com nove elementos vazios.
let tabuleiro = ['', '', '', '', '', '', '', '', ''];

// Função que verifica se há um vencedor ou empate no jogo.
function verificarVencedor() {
    // Define as combinações vitoriosas no jogo.
    const combinacoesVitoria = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Percorre todas as combinações vitoriosas.
    for (const combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;

        // Verifica se há um vencedor na combinação atual.
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            // Define 'jogoEncerrado' como 'true' para indicar que o jogo terminou.
            jogoEncerrado = true;

            // Exibe uma mensagem indicando o jogador vencedor.
            mensagem.textContent = `O jogador ${jogadorAtual} venceu!`;

            // Adiciona a classe 'vencedor' às células vencedoras para destacá-las.
            celulas[a].classList.add('vencedor');
            celulas[b].classList.add('vencedor');
            celulas[c].classList.add('vencedor');
        }
    }

    // Verifica se o tabuleiro está completamente preenchido (empate).
    if (!tabuleiro.includes('') && !jogoEncerrado) {
        // Define 'jogoEncerrado' como 'true' para indicar que o jogo terminou.
        jogoEncerrado = true;

        // Exibe uma mensagem de empate.
        mensagem.textContent = 'Empatou!';
    }
}

// Função que permite ao jogador fazer uma jogada em uma célula específica.
function fazerJogada(indiceCelula) {
    // Verifica se o jogo não está encerrado e se a célula está vazia.
    if (!jogoEncerrado && tabuleiro[indiceCelula] === '') {
        // Define o valor do tabuleiro na célula clicada como o jogador atual ('X' ou 'O').
        tabuleiro[indiceCelula] = jogadorAtual;

        // Exibe o símbolo do jogador na célula clicada.
        celulas[indiceCelula].textContent = jogadorAtual;

        // Adiciona uma classe à célula para estilizar com o símbolo do jogador.
        celulas[indiceCelula].classList.add(jogadorAtual);

        verificarVencedor();

        // Alterna para o próximo jogador ('X' se era 'O' e vice-versa).
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';

    }
}

// Função para reiniciar o jogo.
function reiniciarJogo() {
    // Reinicia o tabuleiro (limpa todas as células).
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    celulas.forEach((celula) => {
        celula.textContent = '';
        celula.classList.remove('X', 'O', 'vencedor');
    });

    // Limpa a mensagem de resultado.
    mensagem.textContent = '';

    // Retorna ao jogador inicial 'X' e define que o jogo não está encerrado.
    jogadorAtual = 'X';
    jogoEncerrado = false;
}

// Adiciona um evento de clique a cada célula para permitir jogadas.
celulas.forEach((celula, indice) => {
    celula.addEventListener('click', () => fazerJogada(indice));
});

// Inicia o jogo chamando a função de reiniciar.
reiniciarJogo();