let game = document.getElementById('game');
let alien = document.getElementById('alien');
let spaceship = document.getElementById('spaceship');
let moves_ul = document.getElementById('moves-ul');
let levelMessage = document.getElementById('levelMessage');
const confettiContainer = document.getElementById('confetti-container');

let gameW = 10;
let gameH = 10;

let finished = false;

game.style.width = `${gameW*20}px`;
game.style.height = `${gameH*20}px`;

spaceship.id = 'spaceship';

game.appendChild(alien);
game.appendChild(spaceship);

let alienX = 0;
let alienY = 0;
alien.style.top = `${alienX * 20}px`;
alien.style.left = `${alienY * 20}px`;

let spaceshipX = 2;
let spaceshipY = 2;
spaceship.style.top = `${spaceshipX * 20}px`;
spaceship.style.left = `${spaceshipY * 20}px`;

let moveList = [];

function clamp(number, min, max) {
    number = Math.min(Math.max(number, min), max);
}

function moveAlien(command) {
    let move = { command: command };

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

function replayMoves() {
    moveList.forEach((move, index) => {
        setTimeout(() => {
            switch (move.command) {
                case 'UP':
                    alienY -= 20;
                    break;
                case 'DOWN':
                    alienY += 20;
                    break;
                case 'LEFT':
                    alienX -= 20;
                    break;
                case 'RIGHT':
                    alienX += 20;
                    break;
            }
            moves_ul.getElementsByTagName('li')[index-(index !== 0)].style.color = "#000000";
            moves_ul.getElementsByTagName('li')[index].style.color = "#34eb3d";
            
            alien.style.top = alienY + 'px';//clamp(alienY, 0, (gameW*20)-20)  + 'px';
            alien.style.left = alienX + 'px';//clamp(alienX, 0, (gameH*20)-20)  + 'px';
            
            // Check if the alien reached the spaceship
            if (alien.style.left === spaceship.style.left && alien.style.top === spaceship.style.top) {
                //alert('Alien reached the spaceship!');
                alien.style.opacity = 0;
                spaceship.src = "ufo.png";
                spaceship.style.width = "20px";
                spaceship.style.height = "25.6px";
                spaceship.className = "fly";

                setTimeout(() => {
                    levelMessage.className = 'visible';
                    celebrate();
                }, 2000);
            }
        }, index * 500);
    });
}

const jsConfetti = new JSConfetti();
function celebrate()
{
    jsConfetti.addConfetti({
        emojis: ['👍', '😂', '🎉', '🔥', '🥳', '😎', '👌', '💪', '🤩', '🦄', '💩'],
    });
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