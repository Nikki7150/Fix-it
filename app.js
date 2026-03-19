const startButton = document.getElementById('start-button');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const mainContent = document.getElementById('main');
const content = document.getElementById('content');
const title = document.getElementById('title');
const description = document.getElementById('description');
const gamePB = document.getElementById('game-pb');

startButton.addEventListener('click', () => {
    content.classList.add('fade-out');
    content.addEventListener('animationend', () => {
        content.style.display = 'none';
    }, { once: true });

    gamePB.style.display = 'block';
    gamePB.classList.add('fade-in');
    thoughtContainer.style.display = 'block';

    createBubble();
    
    /*const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            progressBar.style.display = 'none';
            mainContent.innerHTML = `
                <h1 id="title">Great job!</h1>
                <p id="description">You fixed it before it got worse!</p>
            `;
        } else {
            width += 1;
            progress.style.width = width + '%';
        }
    }, 50);*/
});

/*change percent as width of progress bar increases, and when it reaches 100%, show the main content with the title and description.*/

/*const fixButton = document.querySelectorAll('.fix-button');
fixButton.forEach((button) => {
    button.addEventListener('click', () => {
        // code to fix the issue and update the progress bar
        progress.classList.add('animated');
    });
});
*/
const bubbleTexts = [
    "that sounded weird",
    "why did I say that",
    "they noticed",
    "fix it",
    "no that’s worse",
    "say it better"
];

const thoughtContainer = document.getElementById('thought-container');

function createBubble() {
    // code to create a thought bubble to be fixed
    // add div  with class bubble
    const bubbleDiv = document.createElement('div');
    bubbleDiv.classList.add('bubble');
    bubbleDiv.style.display = 'block';
    bubbleDiv.classList.add('fade-in');
    

    // pick random text from list
    const randomText = bubbleTexts[Math.floor(Math.random() * bubbleTexts.length)];
    const text = document.createElement('p');
    text.textContent = randomText;
    bubbleDiv.appendChild(text);

    // create a button
    const fixButton = document.createElement('button');
    fixButton.classList.add('fix-button');
    fixButton.textContent = 'Fix it';
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
    });
}

function updateProgress() {
    // code to update the progress bar based on the number of issues fixed

}