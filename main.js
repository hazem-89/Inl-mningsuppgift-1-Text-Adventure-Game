
const optionsButtonElement = document.getElementById('options-btn');
const textFieldElement = document.getElementById('text-field');
let state = {};
const storyNode =[ 
    {
        id: 0,
        text: 'Lets play!',
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
                text: 'Try to scape',
                nextScene: 2,
            }, {
                text: 'Fight',
                nextScene: 4,
            }
        ]
    },  {
        id: 2,
        text: 'While you trying to scape, you could chose one thing to take with you',
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
        text: 'chose a weapon',
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
                text: 'keep exploring',
                nextScene: 7,
            }
        ]
    },  {
        id: 6,
        text: 'A groupe of zombies besiege you! You lose!',
        options: [
            {
                text: 'Restart',
                nextScene: -1,
            }
        ]
    },  {
        id: 7,
        text: 'you manged to find the maine road, you see a car',
        options: [
            {
                text: 'Drive the car',
                nextScene: 8,
            },{
                text: 'sleep in the car',
                nextScene: 17,           //
            }
        ]
    },  {
        id: 8,
        text: 'while you trying to start the car it mad a lot of noise and the zombies are heading to you now',
        options: [
            {
                text: 'take the sword and fight',
                requiredState: (currentState) => currentState.sword,
                nextScene: 9,
            }, {
                text: 'take the sword and fight',
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
                text: 'keep exploring',
                nextScene: 11,
            }
        ]
    },  {
        id: 10,
        text: 'The zombies where too many you don not have enough bullets, Game over',
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
                text: 'take the sword and fight',
                requiredState: (currentState) => currentState.gun,
                nextScene: 13,
            }, {
                text: 'keep hiding',
                nextScene: 14,
            }
        ]
    },  {
        id: 13,
        text: 'With your help you manged to kill them all, the people you helped were really grateful and they want to join them',
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
    

function startGame() {
    state = {};
    showStoryNode(0)
}


/**
 * blocking up the index for the object and add the options buttons
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
function showOption(option) {
        return option.requiredState == null || option.requiredState(state);
}
function selectOption(option) {
    const nextSceneNodeId = option.nextScene;
    if (nextSceneNodeId < 0) {
       return startGame()
    }
    state = Object.assign(state, option.setState)
    showStoryNode(nextSceneNodeId)
}

startGame()