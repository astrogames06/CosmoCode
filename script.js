let game = document.getElementById('game');
let alien = document.getElementById('alien');
let spaceship = document.getElementById('spaceship');
let moves_ul = document.getElementById('moves-ul');
let levelMessage = document.getElementById('levelMessage');
const confettiContainer = document.getElementById('confetti-container');
const trash = document.getElementById('trash');
let info = document.getElementById('info');
let amountIn = document.getElementById('amountIn');

let cubeSize = 30;
game.style.backgroundSize = `${cubeSize}px ${cubeSize}px`;

alien.style.width = `${cubeSize}px`;
alien.style.height = `${cubeSize}px`;
spaceship.style.width = `${cubeSize}px`;
spaceship.style.height = `${cubeSize}px`;

let gameW = rand(3, 10);
let gameH = rand(3, 10);


let finished = false;

game.style.width = `${gameW * cubeSize}px`;
game.style.height = `${gameH * cubeSize}px`;

spaceship.id = 'spaceship';

game.appendChild(alien);
game.appendChild(spaceship);

let alienX = 0;
let alienY = 0;
alien.style.top = `${alienX * cubeSize}px`;
alien.style.left = `${alienY * cubeSize}px`;

let spaceshipX = rand(2, gameH);
let spaceshipY = rand(2, gameW);



console.log('Constrained spaceshipX:', spaceshipX, 'Constrained spaceshipY:', spaceshipY);

spaceship.style.top = `${spaceshipX * cubeSize}px`;
spaceship.style.left = `${spaceshipY * cubeSize}px`;

info.innerHTML = `${gameW} x ${gameH}`

//alert(`sx : ${spaceshipX} ${spaceshipX * 20}, sy : ${spaceshipY} ${spaceshipY * 20}. gw : ${gameW} ${gameW * 20}, gh : ${gameH} ${gameH * 20}`)


let moveList = [];

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function clamp(number, min, max) {
    number = Math.min(Math.max(number, min), max);
}

function moveAlien(command) {
    let move = { command: command };
    let input = 1;

    if (amountIn.value !== '')
        input = parseInt(amountIn.value);

    for (var i = 0; i <= input - 1; i++) {
        switch (command) {
            case 'UP':
                move.newX = alienX;
                move.newY = alienY - cubeSize;
                break;
            case 'DOWN':
                move.newX = alienX;
                move.newY = alienY + cubeSize;
                break;
            case 'LEFT':
                move.newX = alienX - cubeSize;
                move.newY = alienY;
                break;
            case 'RIGHT':
                move.newX = alienX + cubeSize;
                move.newY = alienY;
                break;
        }
        let new_li = document.createElement('li');
        new_li.innerText = command;
        moves_ul.appendChild(new_li);
        moveList.push(move);
    }

    amountIn.value = '';
}



function startPressAndHold(command) {
    let move = { command: command };

    pressAndHoldTimer = setTimeout(function () {
        let input = window.prompt('Enter your amount:');

        if (!isNaN(input)) {
            for (var i = 0; i <= input; i++) {
                switch (command) {
                    case 'UP':
                        move.newX = alienX;
                        move.newY = alienY - cubeSize;
                        break;
                    case 'DOWN':
                        move.newX = alienX;
                        move.newY = alienY + cubeSize;
                        break;
                    case 'LEFT':
                        move.newX = alienX - cubeSize;
                        move.newY = alienY;
                        break;
                    case 'RIGHT':
                        move.newX = alienX + cubeSize;
                        move.newY = alienY;
                        break;
                }
                let new_li = document.createElement('li');
                new_li.innerText = command;
                moves_ul.appendChild(new_li);
                moveList.push(move);
            }
        }
    }, 1000);
}

function endPressAndHold() {
    // Clear the timer when the mouse button is released or leaves the element
    clearTimeout(pressAndHoldTimer);
}

let widthNums = document.getElementById("widthNums");

for (var i = 1; i <= gameW; i++) {
    widthNums.innerHTML += String(i) + ' ';
}

let heightNums = document.getElementById("heightNums");

for (var i = 1; i <= gameH; i++) {
    heightNums.innerHTML += String(i) + '<br>' + '<br>' + '<br>';
}

function dblMoveAlien(command) {
    let move = { command: command };
    var input = window.prompt('Enter your amount:');

    if (!isNaN(input)) {
        for (var i = 0; i <= input; i++) {
            switch (command) {
                case 'UP':
                    move.newX = alienX;
                    move.newY = alienY - 20;
                    break;
                case 'DOWN':
                    move.newX = alienX;
                    move.newY = alienY + 20;
                    break;
                case 'LEFT':
                    move.newX = alienX - 20;
                    move.newY = alienY;
                    break;
                case 'RIGHT':
                    move.newX = alienX + 20;
                    move.newY = alienY;
                    break;
            }
            let new_li = document.createElement('li');
            new_li.innerText = command;
            moves_ul.appendChild(new_li);
            moveList.push(move);
        }
    }
}

function replayMoves() {
    moveList.forEach((move, index) => {
        setTimeout(() => {
            if (!finished) {
                switch (move.command) {
                    case 'UP':
                        alienY -= cubeSize;
                        break;
                    case 'DOWN':
                        alienY += cubeSize;
                        break;
                    case 'LEFT':
                        alienX -= cubeSize;
                        break;
                    case 'RIGHT':
                        alienX += cubeSize;
                        break;
                }

                moves_ul.getElementsByTagName('li')[index - (index !== 0)].style.color = "#000000";
                moves_ul.getElementsByTagName('li')[index].style.color = "#34eb3d";
            }

            if (alienY < 0)
                alienY = 0;
            if (alienY > (gameH - 1) * cubeSize)
                alienY = (gameH - 1) * cubeSize;
            alien.style.top = alienY + 'px';//clamp(alienY, 0, (gameW*20)-20)  + 'px';

            if (alienX < 0)
                alienX = 0;
            if (alienX > (gameW - 1) * cubeSize)
                alienX = (gameW - 1) * cubeSize;
            alien.style.left = alienX + 'px';//clamp(alienX, 0, (gameH*20)-20)  + 'px';

            // Check if the alien reached the spaceship
            if (alien.style.left === spaceship.style.left && alien.style.top === spaceship.style.top) {
                //alert('Alien reached the spaceship!');
                moveList = [];
                alien.style.opacity = 0;
                spaceship.src = "ufo.png";
                spaceship.style.width = "25px";
                spaceship.style.height = "32.06px";
                spaceship.className = "fly";
                finished = true;

                setTimeout(() => {
                    levelMessage.className = 'visible';
                    celebrate();
                }, 2000);
            }
        }, index * 500);
    });
}

const jsConfetti = new JSConfetti();
function celebrate() {
    jsConfetti.addConfetti({
        emojis: ['👍', '😂', '🎉', '🔥', '🥳', '😎', '👌', '💪', '🤩', '🦄', '💩'],
    });
}

trash.addEventListener('click', () => {
    moveList.length = 0;
    moves_ul.innerHTML = '';
    alienX = 0;
    alien.style.top = 0;

    alienY = 0;
    alien.style.left = 0;
});

moves_ul.addEventListener('click', function (event) {
    // Check if the clicked element is an li
    if (event.target.tagName === 'LI') {
        // Code to execute when an li is clicked
        console.log('Clicked on:', event.target.textContent);
    }
});

function help()
{
    if (widthNums.className === "hidden")
    {
        widthNums.className = "visible";
        heightNums.className = "visible";
    }
    else
    {
        widthNums.className = "hidden";
        heightNums.className = "hidden";
    }
}

// function celebrate() {
//     const confettiContainer = document.getElementById('confetti-container');
//     confettiContainer.style.pointerEvents = "all";

//     for (let i = 0; i < 200; i++) {
//         createConfettiParticle(confettiContainer);
//     }
// }

// function createConfettiParticle(container) {
//     const colors = ['#f00', '#0f0', '#00f', '#ff0', '#0ff']; // Customize colors as needed

//     const confetti = document.createElement('div');
//     confetti.className = 'confetti';
//     confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

//     const size = Math.random() * 20 + 10; // Random size between 10 and 30 pixels
//     confetti.style.width = `${size}px`;
//     confetti.style.height = `${size}px`;

//     const left = Math.random() * 100;
//     confetti.style.left = `${left}vw`;

//     const animationDuration = Math.random() * 3 + 2; // Random duration between 2 and 5 seconds
//     confetti.style.animation = `fall ${animationDuration}s linear infinite`;

//     container.appendChild(confetti);

//     confetti.addEventListener('animationend', () => {
//         confetti.remove(); // Remove confetti after animation ends
//     });
// }