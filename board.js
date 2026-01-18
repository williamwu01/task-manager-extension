// board.js
export function createBoardSection(tasks) {
    const section = document.createElement('section');
    section.id = 'boardSection';

    const h2 = document.createElement('h2');
    h2.textContent = 'Board Section';
    section.appendChild(h2);

    const ul = document.createElement('ul');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        ul.appendChild(li);
    });

    section.appendChild(ul);
    return section;
}