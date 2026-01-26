export function createNoteSection(tasks) {
    const section = document.createElement('section');
    section.id = 'notesView';

    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Write your notes here...';
    textarea.style.width = '100%';
    textarea.style.height = '200px';

    //add persistance 
    textarea.addEventListener('input', () => {
        chrome.storage.local.set({notes: textarea.value})
    })

    chrome.storage.local.get('notes', data => {
    textarea.value = data.notes || '';
    });

    section.appendChild(textarea);

    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear notes';

    clearBtn.addEventListener('click', () => {
    chrome.storage.local.remove('notes', () => {
        textarea.value = '';
    });
    });

section.appendChild(clearBtn);
    return section;
}