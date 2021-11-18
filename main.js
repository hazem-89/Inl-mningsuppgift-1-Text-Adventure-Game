
const optionsButtonElement = document.getElementById('options-btn');
const textFieldElement = document.getElementById('text-field');
console.log(textFieldElement)
let state = {};
const storyNode = [
    {
        id: 0,
        text: 'Lets play!',
        options: [
            {
                text: 'Start',
                setState: {Start: true},
                nextScene: 1,
            }
        ]
    },  {
        id: 1,
        text: 'Alert, Alert, the zombies had broken into your safe house! ',
        options: [
            {
                text: 'Try to scape',
                setState: {Start: true, scape: true},
                nextScene: 2,
            }, {
                text: 'Fight',
                setState: {Start: true, Fight: true},
                nextScene: 4,
            }
        ]
    },  {
        id: 2,
        text: 'While you trying to scape, you could chose one thing to take with you',
        options: [
            {
                text: 'your bag',
                setState: {Start: true},
                nextScene: 2,
            }, {
                text: 'you sword',
                setState: {Start: true},
                nextScene: 2,
            }, {
                text: 'your phone!',
                setState: {Start: true},
                nextScene: 2,
            }
        ]
    },  {
        id: 2,
        text: ' you manged to scape from them. now What? ',
        options: [
            {
                text: 'Scape to the wood',
                setState: {Start: true},
                nextScene: 2,
            }, {
                text: 'search for another safe house',
                setState: {Start: true},
                nextScene: 1,
            }
        ]
    },  {
        id: 4,
        text: 'chose a weapon',
        options: [
            {
                text: 'A Sword',
                setState: {Start: true},
                nextScene: 0,
            },{
                text: 'A gun',
                setState: {Start: true},
                nextScene: 0,
            }
        ]
    }
]

function startGame() {
    state = {};
    showStoryNode(0)
}



function showStoryNode(sceneIndex) {
    const sceneNode = storyNode.find(sceneNode => sceneNode.id === sceneIndex)
    textFieldElement.innerHTML = sceneNode.text;
}

startGame()