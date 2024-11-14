// Configuração do Jogo de Arremesso de Basquete
const gameCanvas = document.getElementById('gameCanvas');
const ctx = gameCanvas.getContext('2d');
let ballX = 50, ballY = 350, ballSpeedX = 0, ballSpeedY = 0;
let hoopX = 500, hoopY = 150, hoopRadius = 30;
let isBallThrown = false;
let score = 0;

// Função para desenhar o aro
function drawHoop() {
    ctx.beginPath();
    ctx.arc(hoopX, hoopY, hoopRadius, 0, Math.PI * 2);
    ctx.strokeStyle = '#1a73e8';
    ctx.lineWidth = 5;
    ctx.stroke();
}

// Função para desenhar a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, 15, 0, Math.PI * 2);
    ctx.fillStyle = 'orange';
    ctx.fill();
}

// Função para mover a bola
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ballSpeedY += 0.2; // gravidade
}

// Função para verificar a colisão com o aro
function checkCollision() {
    const distance = Math.sqrt((ballX - hoopX) ** 2 + (ballY - hoopY) ** 2);
    if (distance < hoopRadius + 15) {
        score += 1;
        alert(`Você acertou o arremesso! 🏀 Pontuação: ${score}`);
        resetGame();
    }
}

// Função para resetar o jogo após cada tentativa
function resetGame() {
    ballX = 50;
    ballY = 350;
    ballSpeedX = 0;
    ballSpeedY = 0;
    isBallThrown = false;
}

// Função para lançar a bola com base no ângulo e força
function throwBall() {
    if (!isBallThrown) {
        const force = document.getElementById('force').value;
        const angle = document.getElementById('angle').value * (Math.PI / 180); // Convertendo para radianos
        
        ballSpeedX = Math.cos(angle) * force;
        ballSpeedY = -Math.sin(angle) * force; // Invertido para cima
        isBallThrown = true;
    }
}

// Loop do jogo
function gameLoop() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawHoop();
    drawBall();
    if (isBallThrown) {
        moveBall();
        checkCollision();
    }
    requestAnimationFrame(gameLoop);
}

// Iniciar o loop do jogo
gameLoop();
