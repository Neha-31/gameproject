score = 0;
cross = true;

audio = new Audio('startingmusic.mp3');
audiogo = new Audio('die.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        mario = document.querySelector('.mario');
        mario.classList.add('animatemario');
        setTimeout(() => {
            mario.classList.remove('animatemario')
        }, 700);
    }
    if (e.keyCode == 39) {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = marioX + 112 + "px";
    }
    if (e.keyCode == 37) {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = (marioX - 112) + "px";
    }
}

setInterval(() => {
    mario = document.querySelector('.mario');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
     console.log(offsetX, offsetY)
    if (offsetX < 90 && offsetY <80) {
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 3000);
    }
    else if (offsetX < 180 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 5000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}