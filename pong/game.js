// Pong Game JavaScript Logic

const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Paddle settings
const paddleWidth = 10, paddleHeight = 100;
const player = { x: 0, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: 'WHITE', score: 0 };
const computer = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2, width: paddleWidth, height: paddleHeight, color: 'WHITE', score: 0 };

// Ball settings
const ballSize = 10;
const ball = { x: canvas.width / 2, y: canvas.height / 2, radius: ballSize, speed: 4, velocityX: 4, velocityY: 4, color: 'WHITE' };

// Draw everything
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Player paddle
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
    // Computer paddle
    context.fillStyle = computer.color;
    context.fillRect(computer.x, computer.y, computer.width, computer.height);
    // Ball
    context.fillStyle = ball.color;
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Update game objects
function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Ball collision with top and bottom
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Ball collision with player paddle
    if (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
        ball.velocityX = -ball.velocityX;
        ball.x = player.x + player.width + ball.radius; // Prevent sticking
    }
    // Ball collision with computer paddle
    if (ball.x + ball.radius > computer.x && ball.y > computer.y && ball.y < computer.y + computer.height) {
        ball.velocityX = -ball.velocityX;
        ball.x = computer.x - ball.radius; // Prevent sticking
    }

    // Simple AI for computer
    computer.y += ((ball.y - (computer.y + computer.height / 2))) * 0.06;

    // Ball out of bounds
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        resetBall();
    }
}

// Move player paddle with mouse
canvas.addEventListener('mousemove', evt => {
    const rect = canvas.getBoundingClientRect();
    player.y = evt.clientY - rect.top - player.height / 2;
    player.y = Math.max(Math.min(player.y, canvas.height - player.height), 0);
});

// Reset the ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
}

// Game loop
function game() {
    draw();
    update();
    requestAnimationFrame(game);
}

game();
