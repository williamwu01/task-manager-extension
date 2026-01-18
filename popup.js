let inView = 'board'

const checklistBtn = document.getElementById('checklist');
const boardBtn = document.getElementById('board');

const checklistSection = document.getElementById('checklistSection');
const boardSection = document.getElementById('boardSection');

checklistBtn.addEventListener('click', ()=>setView('checklist'))
boardBtn.addEventListener('click', ()=>setView('board'))

function setView(mode){
    inView = mode 

    checklistBtn.setAttribute('aria-pressed', mode === 'checklist');
    boardBtn.setAttribute('aria-pressed', mode === 'board');

    document.getElementById('checklist').classList.toggle('hidden', mode !== 'checklist')
    document.getElementById('board').classList.toggle('hidden', mode !== 'board')

    document.getElementById('checklistSection').classList.toggle('hidden', mode !== 'checklistSection');
    document.getElementById('boardBtn').classList.toggle('hidden', mode !== 'boardBtn');
    // saving on chrome specifc storage 
    chrome.storage.local.set({ inView });
}

// add an area layer - when we press note button it will open a note pad section 

