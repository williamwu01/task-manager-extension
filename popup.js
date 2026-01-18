import { createBoardSection } from './board.js';
import { createChecklistSection } from './checklist.js';

// state
let tasks = [
    { text: 'Task 1', done: false },
    { text: 'Task 2', done: true }
];
let view = 'board';

// buttons
const boardBtn = document.getElementById('board');
const checklistBtn = document.getElementById('checklist');

// create sections
const boardSection = createBoardSection(tasks);
const checklistSection = createChecklistSection(tasks);

// append sections to body AFTER buttons exist
document.body.appendChild(boardSection);
document.body.appendChild(checklistSection);

// toggle logic
function setView(mode) {
    view = mode;

    boardSection.classList.toggle('hidden', mode !== 'board');
    checklistSection.classList.toggle('hidden', mode !== 'checklist');

    boardBtn.setAttribute('aria-pressed', mode === 'board');
    checklistBtn.setAttribute('aria-pressed', mode === 'checklist');
}

// event listeners
boardBtn.addEventListener('click', () => setView('board'));
checklistBtn.addEventListener('click', () => setView('checklist'));

// initial view
setView(view);