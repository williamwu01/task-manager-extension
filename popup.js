import { createBoardSection } from './board.js';
import { createChecklistSection } from './checklist.js';
import { createNoteSection } from './note.js';

// state
let tasks = [
    { text: 'Task 1', done: false },
    { text: 'Task 2', done: true }
];
let view = 'board';

// buttons
const boardBtn = document.getElementById('board');
const checklistBtn = document.getElementById('checklist');
const noteBtn = document.getElementById('notes')

// create sections
const boardSection = createBoardSection(tasks);
const checklistSection = createChecklistSection(tasks);
const noteSection = createNoteSection(tasks);

// append sections to body AFTER buttons exist
document.body.appendChild(boardSection);
document.body.appendChild(checklistSection);
document.body.appendChild(noteSection)

// toggle logic
function setView(mode) {
    view = mode;

    boardSection.classList.toggle('hidden', mode !== 'board');
    checklistSection.classList.toggle('hidden', mode !== 'checklist');
    noteSection.classList.toggle('hidden', mode !== 'notes')


    // Update toggle button state for accessibility + styling
    boardBtn.setAttribute('aria-pressed', mode === 'board');
    checklistBtn.setAttribute('aria-pressed', mode === 'checklist');
    noteBtn.setAttribute('aria-pressed', mode === 'notes');
    
}

// event listeners
boardBtn.addEventListener('click', () => setView('board'));
checklistBtn.addEventListener('click', () => setView('checklist'));
noteBtn.addEventListener('click', () => setView('notes'))


// initial view
setView(view);