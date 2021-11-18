
const optionsButtonElement = document.getElementById('options-btn');
const textFieldElement = document.getElementById('text-field');
let state = {};
const storyNode = [
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
                text: 'your bag',
                nextScene: 3,
            }, {
                text: 'you sword',
                nextScene: 3,
            }, {
                text: 'your phone!',
                nextScene: 3,
            }
        ]
    },  {
        id: 3,
        text: ' you manged to scape from them. now What? ',
        options: [
            {
                text: 'Scape to the wood',
                nextScene: 5,
            }, {
                text: 'Search for another safe house',
                nextScene: 6,
            }
        ]
    },  {
        id: 4,
        text: 'chose a weapon',
        options: [
            {
                text: 'A Sword',
                nextScene: 0,
            },{
                text: 'A gun',
                nextScene: 0,
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
                nextScene: 0,
            }
        ]
    },  {
        id: 6,
        text: 'A groupe of zombies has found you! You lose!',
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
        return true;
}
function selectOption(option) {
    const nextSceneNodeId = option.nextScene;
    if (nextSceneNodeId < 0) {
       return startGame()
    }
    showStoryNode(nextSceneNodeId)
}

startGame()