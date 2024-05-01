box.style.display = "none";
let posX = 1;
let posY = 1;
let isGameOver = false;
const colors = ["blue", "yellow", "purple", "black"];
let currentColorIndex = 0;
let points = 0;
let shrinkRate = 30;
let radius = 50;
let t;
const gunshotSound = new Audio("./shot.mp3");


startButton.onclick = e => {
    isGameOver = false;
    points = 0;
    radius = 50;
    shrinkRate = 30;
    document.getElementById("score").innerHTML = `Score: ${points}`;
    newCircle();
}

function newCircle() {
    radius = 50;
    box.style.width = `${2 * radius}px`;
    box.style.height = `${2 * radius}px`;
    posX = Math.random()*400+50;
    posY = Math.random()*400+50;
    box.style.left = `${posX}px`;
    box.style.top = `${posY}px`;
    box.style.display = "block";
    t = setInterval(shrink,100);
}



function changeColor() {
    if (currentColorIndex===colors.length) {
        currentColorIndex = 0;
    }
    box.style.backgroundColor = colors[currentColorIndex];
    currentColorIndex++;
}

function shrink() {

        radius -= shrinkRate / 30;

        if (radius <= 0) {
            clearInterval(t);
            document.getElementById("score").innerHTML = `Score: ${points}. Game over!`;
            isGameOver = true;
            box.style.display = "none";
        }

        box.style.width = `${2 * radius}px`;
        box.style.height = `${2 * radius}px`;

}

box.onclick = e => {
    if (!isGameOver) {
        clearInterval(t);
        shrinkRate = shrinkRate + 3;
        changeColor();
        points += 10;
        document.getElementById("score").innerHTML = `Score: ${points}`;
        gunshotSound.currentTime = 0;
        gunshotSound.play()
    .then(() => {
            newCircle();
        })
            .catch(error => {
                console.error('Error playing gunshot sound:', error);
                newCircle();
            });
    }
};
