
const optionsButtonElement = document.getElementById('options-btn');
const textFieldElement = document.getElementById('text-field');
let state = {};

/** Create the story Object */
const storyNode =[ 
    {
        id: 0,
        text: 'Welcome To ZombieLand',
        options: [
            {
                text: 'Start',
                nextScene: 1,
            }
        ]
    },  {
        id: 1,
        text: 'Alert, Alert, the zombies had broken into your house! ',
        options: [
            {
                text: 'Try to escape',
                nextScene: 2,
            }, {
                text: 'Fight',
                nextScene: 4,
            }
        ]
    },  {
        id: 2,
        text: 'While you trying to escape, you could chose one thing to take with you',
        options: [
            {
                text: 'your gun',
                setState: {gun: true},
                nextScene: 5,
            }, {
                text: 'you sword',
                setState: {sword: true},
                nextScene: 5,
            }
        ]
    },  {
        id: 4, //
        text: 'Please chose a weapon',
        options: [
            {
                text: 'A Sword',
                setState: {sword: true},
                nextScene: 19,
            },{
                text: 'A gun',
                setState: {gun: true},
                nextScene: 10,
            }
        ]
    },  {
        id: 5,
        text: 'Its dark soon and you are super tired',
        options: [
            {
                text: 'Sleep under a tree',
                nextScene: 6,
            },{
                text: 'Keep exploring',
                nextScene: 7,
            }
        ]
    },  {
        id: 6,
        text: 'A groupe of zombies besiege you! You lost!',
        options: [
            {
                text: 'Restart',
                nextScene: -1,
            }
        ]
    },  {
        id: 7,
        text: 'You managed to find the main road, you see a car',
        options: [
            {
                text: 'Drive the car',
                nextScene: 8,
            },{
                text: 'Sleep in the car',
                nextScene: 17,           //
            }
        ]
    },  {
        id: 8,
        text: 'While you trying to start the car it made a lot of noise and the zombies are heading to you now',
        options: [
            {
                text: 'Take the sword and fight',
                requiredState: (currentState) => currentState.sword,
                nextScene: 9,
            }, {
                text: 'Take the gun and fight',
                requiredState: (currentState) => currentState.gun,
                nextScene: 10,
            } ,{
                text: 'Run',
                nextScene: 11,
            }
        ]
    },  {
        id: 9,
        text: 'Wow you really good with sword, you killed them all',
        options: [
            {
                text: 'Take a rest and sleep in the car',
                nextScene: 17,
            },{
                text: 'Keep exploring',
                nextScene: 11,
            }
        ]
    },  {
        id: 10,
        text: 'The zombies where too many you do not have enough bullets, Game over',
        options: [
            {
                text: 'Restart the game',
                nextScene: -1,
            }
        ]  
        },  {
        id: 11,
        text: 'while you running away, you hear someone calling for help',
        options: [
            {
                text: 'Go to them',
                nextScene: 12,
            },{
                text: 'Ignore and keep running away',
                nextScene: 17,
            }
        ]
    },  {
        id: 12,
        text: 'You found three people who are fighting a huge groups of zombies',
        options: [
            {
                text: 'take the sword and fight',
                requiredState: (currentState) => currentState.sword,
                nextScene: 13,
            }, {
                text: 'take the gun and fight',
                requiredState: (currentState) => currentState.gun,
                nextScene: 13,
            }, {
                text: 'keep hiding',
                nextScene: 14,
            }
        ]
    },  {
        id: 13,
        text: 'With your help you managed to kill them all, the people you helped were really grateful and they want to join them',
        options: [
            {
                text: 'Accept',
                nextScene: 15,
            }, {
                text: 'Ignore',
                nextScene: 16,
            }
        ]
    },  {
        id: 14,
        text: 'The zombies killed them, and they found you, Game over!',
        options: [
            {
                text: 'Accept',
                nextScene: -1,
            }
        ]
    },  {
        id: 15,
        text: 'With your new friends you manged to reach a safe zoon where no zombies YET! congrats',
        options: [
            {
                text: 'Play again?',
                nextScene: -1,
            }
        ]
    },  {
        id: 16,
        text: 'You should accept there offer, you were an easy target, the ZOMBIES are every where! Game over',
        options: [
            {
                text: 'Restart the game!',
                nextScene: -1,
            }
        ]
    },  {
        id: 17,
        text: ' you were an easy target, the ZOMBIES are every where! Game over',
        options: [
            {
                text: 'Restart the game!',
                nextScene: -1,
            }
        ]
    },  {
        id: 19,
        text: 'Wow you really good with sword, you killed them all',
        options: [
            {
                text: 'stay in your house',
                nextScene: 20,
            },{
                text: 'search for a new house',
                nextScene: 11,
            }
        ]
    },  {
        id: 20,
        text: 'The house has no more defences, the break in to it while you were sleeping. Game over!',
        options: [
            {
                text: 'Restart',
                nextScene: -1,
            }
        ]
    }
        ]
/** the game Start */    
function startGame() {
    state = {};
    showStoryNode(0)
}

/** Selecting the index for the story node and creating the options buttons
 * 
 * @param {Index} sceneIndex 
 */
function showStoryNode(sceneIndex) {
    const sceneNode = storyNode.find(sceneNode => sceneNode.id === sceneIndex)
    textFieldElement.innerHTML = sceneNode.text;

    optionsButtonElement.innerHTML = '';
    sceneNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerHTML = option.text
            button.classList.add('btn-primary')
            button.addEventListener('click', () => selectOption(option));
            optionsButtonElement.appendChild(button)
        }
    });
}

/**showing option depending on the state if it
 * 
 * @param {Array} option 
 * @returns 
 */
function showOption(option) {
        return option.requiredState == null || option.requiredState(state);
}

/**selecting the option based on the next scene id
 * @param {Array} option 
 * @returns 
 */
function selectOption(option) {
    const nextSceneNodeId = option.nextScene;
    if (nextSceneNodeId < 0) {
       return startGame()
    }
    state = Object.assign(state, option.setState)
    showStoryNode(nextSceneNodeId)
}

// Game background slider
let activeImageIndex = 0;

/** starting the background slide
 *
 */
function startSlider() {
    setInterval(fadeToNextImage, 15000)
}

/** creating the background slide function
 * 
 */
function fadeToNextImage() {
//  select all the images in the slid div
  const images =  document.querySelectorAll('.slider > img');

// select the active image
  const activeImage = images[activeImageIndex];
  if (activeImageIndex >= images.length - 1) {
      activeImageIndex = 0;
  } else {
      activeImageIndex += 1; 
  } 
// selecting the next image in the slide
  const nextImage = images[activeImageIndex + 1];

  // toggle the show class between active and next images
  activeImage.classList.toggle('show');
  nextImage.classList.toggle('show');
}
startSlider()
startGame()
