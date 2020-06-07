const cnvs = document.getElementById("snake");
const cntx = cnvs.getContext("2d");

// create the unit
const unit = 32;

// load images
//const ground = new Image();
// ground.src = "img/ground.png"
// const foodImg = new Image();
// foodImg.src = "img/food.png";

// load audio files
let dead = new Audio();
let eat = new Audio()
let move = new Audio();
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
move.src = "audio/move.mp3";

// create the snake
let snake = []
snake[0] = {
    x : 9 * unit,
    y : 10 * unit
};

// create the food
let food = {
    x : Math.floor(Math.random()*17 + 1) * unit,
    y : Math.floor(Math.random()*15 + 3) * unit
};

// create the score
let score = 0
// control the snake
let d;

ft_direction = (ev) => {
    let key = ev.keyCode;
    if (key == 37 && d != "Right"){
        move.play();
        d = "Left"
    }
    else if(key == 38 && d != "Down"){
        d = "Up";
        move.play();
    }
    else if(key == 39 && d != "Left"){
        d = "Right";
        move.play();
    }
    else if(key == 40 && d != "Up"){
        d = "Down";
        move.play();
    }
}

document.addEventListener("keydown", ft_direction);

// check collision
collision = (head, arr) =>
{
    for (let i = 0; i < arr.length; i++){
        if (head.x == arr[i].x && head.y == arr[i].y){
            return true;
        }
    }
    return false;
}

// draw function 
draw = () => {
    //cntx.drawImage(ground, 0, 0);
    cntx.fillStyle = "black";
    cntx.fillRect(0, 0, 608, 608);
    for (let i = 0; i < snake.length; i++)
    {
        cntx.fillStyle = (i == 0) ? "yellow" : "white";
        cntx.fillRect(snake[i].x, snake[i].y, unit, unit);
        cntx.strokeStyle = "red";
        cntx.strokeRect(snake[i].x, snake[i].y, unit, unit);
    }
    // cntx.drawImage(foodImg, food.x, food.y);
    // old head position
    cntx.fillStyle = "red";
    cntx.fillRect(food.x, food.y, unit, unit);
    let snake_x = snake[0].x;
    let snake_y = snake[0].y;
    // direction
    if (d == "Left")
        snake_x -= unit;
    if( d == "Up")
        snake_y -= unit;
    if( d == "Right")
        snake_x += unit;
    if( d == "Down")
        snake_y += unit;
    // if the snake eats the food
    if (snake_x == food.x && snake_y == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * unit,
            y : Math.floor(Math.random()*15+3) * unit
        }
    }
    else
        snake.pop();
    // add new head
    let newHead = {
        x : snake_x,
        y : snake_y
    }
    // game over
    if(snake_x < 0 || snake_x > 18 * unit || snake_y < 0
        || snake_y > 18*unit || collision(newHead,snake))
    {
        clearInterval(game);
        dead.play();
    }
    snake.unshift(newHead);
    cntx.font = "40px changa one";
    cntx.fillText("Score: ", 10, 2 * unit);
    cntx.fillStyle = "white";
    cntx.font = "45px changa one"
    cntx.fillText(score, 4 * unit, 2 * unit);
}

// call draw function every 100 ms
let game = setInterval(draw, 100);