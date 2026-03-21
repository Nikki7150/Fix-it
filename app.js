const startButton = document.getElementById('start-button');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const mainContent = document.getElementById('main');
const content = document.getElementById('content');
const title = document.getElementById('title');
const description = document.getElementById('description');
const gamePB = document.getElementById('game-pb');

// ----------------------------------------------------------------------------------------------------------------
// START BUTTON
// ----------------------------------------------------------------------------------------------------------------
startButton.addEventListener('click', () => {
    content.classList.add('fade-out');
    content.addEventListener('animationend', () => {
        content.style.display = 'none';
    }, { once: true });
    mainContent.style.backgroundImage = "none";
    mainContent.style.backgroundColor = "rgba(204, 237, 248, 0.672)";
    gamePB.style.display = 'block';
    gamePB.classList.add('fade-in');
    progress.style.display = 'block';
    progress.style.width = '0%';
    thoughtContainer.style.display = 'block';

    createBubble();
});

// ----------------------------------------------------------------------------------------------------------------
// BUBBLE CREATION
// ----------------------------------------------------------------------------------------------------------------
const bubbleTexts = [
    "that sounded weird",
    "why did I say that",
    "they noticed",
    "fix it",
    "no that’s worse",
    "say it better"
];

const progressTexts = [
    "Fixed!",
    "getting there...", 
    "almost there...",
    "so close...",
    "maybe one more..?"
];

const fixTexts = [
    "fix it properly",
    "try again",
    "no, not like that",
    "again", 
    "bruh get it right"
];

const thoughtContainer = document.getElementById('thought-container');

function createBubble() {
    // code to create a thought bubble to be fixed
    // add div  with class bubble
    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('bubble');
    bubbleDiv.style.display = 'block';
    bubbleDiv.classList.add('fade-in');
    
    bubbleDiv.style.opacity = Math.random() * 0.5 + 0.5;

    // pick random text from list
    const randomBubbleText = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
    const text = document.createElement('p');
    text.textContent = randomBubbleText;
    bubbleDiv.appendChild(text);
    bubbleDiv.style.zIndex = Math.floor(Math.random() * 100);

    // create a button
    const fixButton = document.createElement('button');
    const randomFixText = fixTexts[Math.floor(Math.random() * fixTexts.length)];
    fixButton.classList.add('fix-button');
    fixButton.textContent = randomFixText;
    bubbleDiv.appendChild(fixButton);

    // position randomly
    const padding = 20; // so that the bubble doesn't go off the edge of the container

    const x = Math.random() * (thoughtContainer.clientWidth - 150 - padding);
    const y = Math.random() * (thoughtContainer.clientHeight - 100 - padding);

    bubbleDiv.style.left = x + 'px';
    bubbleDiv.style.top = y + 'px';

    // add to container - appendCHild
    thoughtContainer.appendChild(bubbleDiv);

    // add event listener to button to fix and update progress
    fixButton.addEventListener('click', () => {
        bubbleDiv.remove();
        updateProgress();

        if (progressWidth < 100) {
            const bubblesCreate = Math.floor(Math.random() * 3) + 1; // create 1-5 more bubbles to fix
            setTimeout(() => {
                for (let i = 0; i < bubblesCreate; i++) {
                    createBubble();
                }
            }, 200);
        }
    });

    // thoughts get meaner
    if(progressWidth > 60) {
        bubbleTexts.push(
            "they're laughing at you",
            "this is wrong",
            "you’re overthinking again",
            "not good enough",
            "fix it properly",
            "why can't you get it right" );
    }

    // bubbles start shaking and getting intense
    if (progressWidth > 80) {
        bubbleDiv.style.animation = "shake 0.5s infinite";
    }
}

let progressWidth = 0;

// ----------------------------------------------------------------------------------------------------------------
// UPDATE PROGRESS
// ----------------------------------------------------------------------------------------------------------------

function updateProgress() {
    progressWidth += Math.floor(Math.random() * 10) + 1;
    progressWidth = Math.min(progressWidth, 100);

    progress.style.width = progressWidth + '%';
    // change vignette size based on progress
    document.documentElement.style.setProperty('--vignette-size', (progressWidth * 0.8) + 'px');

    document.getElementById('progress-percent').textContent = progressWidth + '%';
    const randomProgressText = progressTexts[Math.floor(Math.random() * progressTexts.length)];
    document.getElementById('progress-text').textContent = randomProgressText;  

    if (progressWidth > 60) {
        progress.style.boxShadow = "0 0 20px rgba(229, 62, 62, 1)";
    }

    if (progressWidth > 85) {
        progress.style.boxShadow = "0 0 30px rgba(229, 62, 62, 1)";
    }
    if (progressWidth > 70) {
        progress.style.background = "linear-gradient(90deg, #ff6a6a, #ff0000)";
    }

    if (progressWidth >= 96) {
        progressWidth -= Math.floor(Math.random() * 80) + 50;
        progressWidth = Math.max(0, progressWidth);
        progress.style.width = progressWidth + '%';
        document.getElementById('progress-percent').textContent = progressWidth + '%';
        document.getElementById('progress-text').textContent = "uh oh...";  
        // after a few seconds, show the realization container
        setTimeout(() => {
            showRealization();
        }, 200);
    }
}

// ----------------------------------------------------------------------------------------------------------------
// REALIZATION CONTAINER
// ----------------------------------------------------------------------------------------------------------------
const realizationCont = document.getElementById('realization-cont');

function showRealization() {
    realizationCont.style.display = 'block';
}

const restartButton = document.getElementById('restart-button');
const noButton = document.getElementById('no-button');

restartButton.addEventListener('click', () => {
    // reset everything
    progressWidth = 0;
    progress.style.width = '0%';
    document.getElementById('progress-percent').textContent = '0%';
    document.getElementById('progress-text').textContent = '';
    realizationCont.style.display = 'none';
    thoughtContainer.innerHTML = '';
    // change vignette size based on progress
    document.documentElement.style.setProperty('--vignette-size', 0 + 'px');
    createBubble();
});

noButton.addEventListener('click', () => {
    alert("Denial isn't just a river in Egypt...");
    realizationCont.style.display = 'none';
});

// ----------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------END HERE-----------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------
