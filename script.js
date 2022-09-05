let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let showScore = document.getElementById("score")
let showRecord = document.getElementById("record")
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let score = 0;

if(!localStorage.record) {
    localStorage.record = 0
}


let food = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
}

function criarBG() {
    context.fillStyle = "#2f3640";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "#27ae60";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "#e74c3c";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            if(score > localStorage.getItem("record")) {
                localStorage.record = score;
            }
            //alert('Game Over')
            window .location.reload();
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
        score += 10
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    
    showScore.innerHTML = `${score}` 
    showRecord.innerHTML = `${localStorage.record}` 
}

let jogo = setInterval(iniciarJogo, 80);
