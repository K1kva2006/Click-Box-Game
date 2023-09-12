const container = document.querySelector(".container");
const box = document.getElementById("box");
const scoreText = document.getElementById("scoreText");
const timeText = document.getElementById("timeText");
const highScoreText = document.getElementById("highScoreText");
const gameOverScoreText = document.getElementById("gameOverScoreText");
const gameOver = document.getElementById("gameOver");
const playAgain = document.getElementById("playAgain");
const rules = document.querySelector(".rules");
const rules2 = document.querySelector(".rules2");
const rulesPop = document.getElementById("rulesPop");

playAgain.addEventListener("click", () => window.location.reload());

const containerWidth = container.getBoundingClientRect(innerWidth).width - 100;
const containerHeight =
    container.getBoundingClientRect(innerWidth).height - 100;

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let score = 0;
let gameOverScore = 0;
let highScore = localStorage.getItem("highScore");
highScoreText.textContent = highScore;

let time = 60;

let timeDrop = setInterval(() => {
    if (score <= 10) {
        time -= 1;
    } else if (score > 10 && score <= 30) {
        time -= 2;
        timeText.style.color = "orange";
    } else if (score > 30) {
        time -= 3;
        timeText.style.color = "red";
    }
    if (score == 0) {
        time = 60;
    }
    if (time <= 0) {
        timeText.style.color = "black";
        gameOver.classList.remove("game-over-none");
        gameOver.classList.add("game-over");
        box.remove();
        clearInterval(timeDrop);
    }
    timeText.textContent = time;
}, 1000);

box.addEventListener("click", () => {
    let size = Math.floor(Math.random() * 100);
    if (size < 30) {
        size = 30 + "px";
    }

    box.style.width = size + "px";
    box.style.height = size + "px";

    box.style.background = getRandomColor();

    box.style.transform = `translate(${Math.floor(
        Math.random() * containerWidth
    )}px, ${Math.floor(Math.random() * containerHeight)}px`;

    score += 1;
    scoreText.textContent = score;

    gameOverScore += 1;
    gameOverScoreText.textContent = gameOverScore;

    time += 1;
    timeText.textContent = time;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        highScoreText.textContent = localStorage.getItem("highScore");
    }
});

rules.addEventListener("click", () => {
    rulesPop.classList.add("rulesPopActive");
});
rules2.addEventListener("click", () => {
    rulesPop.classList.remove("rulesPopActive");
})
