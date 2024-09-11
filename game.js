let score = 0;
let gameOver = false;
let playerTile; // Store player position
let targetTile; // Store target position
let bullets = []; // Array to store bullet elements
let bulletSpeed = 5; // Bullet movement speed

window.onload = function() {
    setGame();
};

function setGame() {
    // Set up a 3x3 grid
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
    }

    // Place player on the board
    playerTile = document.createElement("img");
    playerTile.src = "player.png"; // Your player image
    playerTile.id = "player";
    document.getElementById("4").appendChild(playerTile); // Set player in the center tile (4)

    // Set random target generation
    setInterval(setTarget, 2000); // Every 2 seconds, place a target

    // Allow player to shoot bullets
    document.addEventListener("keydown", shootBullet);
}

// Generate random target on the board
function setTarget() {
    if (gameOver) return;

    // Remove old target if any
    if (targetTile) {
        targetTile.innerHTML = "";
    }

    // Create new target
    let target = document.createElement("img");
    target.src = "target.png"; // Your target image
    target.id = "target";

    // Place target in random tile
    let randomTile = getRandomTile();
    targetTile = document.getElementById(randomTile);
    targetTile.appendChild(target);
}

// Generate random tile (0-8) for target placement
function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

// Shoot bullet in the direction
function shootBullet(event) {
    if (gameOver) return;

    let bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.top = playerTile.offsetTop + "px";
    bullet.style.left = playerTile.offsetLeft + "px";

    document.getElementById("board").appendChild(bullet);
    bullets.push(bullet);

    moveBullet(bullet);
}

// Move bullet towards the target
function moveBullet(bullet) {
    let bulletInterval = setInterval(function () {
        // Update bullet position
        bullet.style.top = parseInt(bullet.style.top) - bulletSpeed + "px";

        // Check for collision with target
        if (checkCollision(bullet, targetTile)) {
            clearInterval(bulletInterval);
            bullet.remove();
            score += 10;
            document.getElementById("score").innerText = score.toString();
            targetTile.innerHTML = ""; // Remove the target after hit
        }

        // Remove bullet if off-screen
        if (parseInt(bullet.style.top) < 0) {
            clearInterval(bulletInterval);
            bullet.remove();
        }
    }, 50);
}

// Check for collision between bullet and target
function checkCollision(bullet, targetTile) {
    let bulletRect = bullet.getBoundingClientRect();
    let targetRect = targetTile.getBoundingClientRect();

    return (
        bulletRect.left < targetRect.right &&
        bulletRect.right > targetRect.left &&
        bulletRect.top < targetRect.bottom &&
        bulletRect.bottom > targetRect.top
    );
}

