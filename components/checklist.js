export function createChecklistSection(tasks) {
    const section = document.createElement('section')
    section.id = 'checklistSection';

    const h2 = document.createElement('h2');
    h2.textContent = 'Checklist Section';
    section.appendChild(h2);

    const ul = document.createElement('ul');
    tasks.forEach(task => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    li.appendChild(checkbox);

    const text = document.createTextNode(task.text);
    li.appendChild(text);

    ul.appendChild(li);
    });

    section.appendChild(ul);
    return section;
}
