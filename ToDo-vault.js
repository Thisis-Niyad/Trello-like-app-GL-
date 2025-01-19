import { Taskdeletion, background, Dalert, movetouch, endtouch, dropevent, dragStarted, starttouch } from "./ToDo-vaultModule.mjs";
document.addEventListener('DOMContentLoaded', () => {
    function createDropdownContent() {
        const dropdownContent = document.createElement('div');
        dropdownContent.id = 'dropdownContent';
        dropdownContent.className = 'dropdown-content';

        const deletion = document.createElement('div');
        deletion.onclick = Taskdeletion;

        const cancelIcon = document.createElement('i');
        cancelIcon.className = 'fas fa-2x fa-times add-card-cancel';
        deletion.innerText = 'Delete selected task';

        const move = document.createElement('div');

        const moveIcon = document.createElement('i');
        moveIcon.className = 'fas fa-arrows-alt';
        move.innerText = 'Move selected task';
        move.onclick = () => { dropdownContent.classList.remove('show') };

        const div = document.createElement('div')
        const hselect = document.createElement('select');
        const option = document.querySelectorAll('.task-list-title');
        option.forEach(element => {
            let opt = document.createElement('option');
            opt.textContent = element.textContent;
            hselect.appendChild(opt);
        });
        div.appendChild(hselect);

        const save = document.createElement('div');
        save.onclick = saveBoard;
        const saveIcon = document.createElement('i');
        saveIcon.className = 'fas fa-save';
        save.innerText = 'Save Board';
        save.style.width = '-webkit-fill-available';

        move.appendChild(moveIcon);
        deletion.appendChild(cancelIcon);
        save.appendChild(saveIcon);

        dropdownContent.appendChild(deletion);
        dropdownContent.appendChild(move);
        dropdownContent.appendChild(div);
        dropdownContent.appendChild(save);

        return dropdownContent;
    }
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = createDropdownContent();
    dropdown.appendChild(dropdownContent);

    const dropdownButton = document.getElementById('dropdownButton');
    dropdownButton.addEventListener('click', () => {
        dropdownContent.classList.toggle('show');
    });

    dropdownContent.addEventListener('click', (event) => {
        if (event.target.matches('div[data-value]')) {
            const selectedValue = event.target.getAttribute('data-value');
            dropdownButton.textContent = event.target.textContent;
            dropdownContent.classList.remove('show');
        }
    });
});

function saveBoard(event) {
    event.preventDefault();
    const dragdrop = document.querySelectorAll('.dragdrop');
    const title = document.querySelectorAll('.task-list-title');
    jsonData.taskLists = [];
    dragdrop.forEach(element => {
        let no = element.id;
        const head = title[no].textContent;
        const newTask = {
            name: `${head}`,
            tasks: []
        };
        const lastTasktitle = jsonData.taskLists;
        lastTasktitle.push(newTask);

        for (let index = 0; index < element.childElementCount; index++) {
            let value = element.children[index].textContent;
            let newtask = { name: `${value}` }
            jsonData.taskLists[no].tasks.push(newtask);
        }
    });
    const jsonString = JSON.stringify(jsonData);
    localStorage.setItem('JsonData', jsonString);
    dropdownContent.classList.remove('show');
}
if (localStorage.JsonData) {
    const retrievedString = localStorage.getItem('JsonData');
    var jsonData = JSON.parse(retrievedString);
} else {
    var jsonData = {
        name: 'Type Here(Board Name)',
        taskLists: []
    };
}
const Boardtitle = document.querySelector('.Board-title')
const Bname = document.createElement('input');
Boardtitle.appendChild(Bname);
Bname.placeholder = `${jsonData.name}`;
Bname.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        jsonData.name = Bname.value;
        Bname.placeholder = `${jsonData.name}`;
        Bname.value = '';
    }
});
if (0 != jsonData.taskLists.length) {
    var j = 0;
    for (let index = 0; index < jsonData.taskLists.length; index++) {
        const board = document.querySelector('.Board');

        const taskListWarpper = document.createElement('div');
        taskListWarpper.className = 'task-list-wrapper';

        const taskList = document.createElement('div');
        taskList.className = 'task-list';

        const taskListTitleContainer = document.createElement('div');
        taskListTitleContainer.className = 'task-list-title-container';

        const taskListTitle = document.createElement('h3');
        taskListTitle.className = 'task-list-title';

        const taskListMore = document.createElement('i');
        taskListMore.className = 'task-list-more pointer';
        taskListMore.className = 'fa-duotone fa-solid fa-trash';
        taskListMore.onclick = Dalert;

        const dragdrop = document.createElement('div');
        dragdrop.className = 'dragdrop';
        dragdrop.id = `${index}`;

        dragdrop.addEventListener("pointerdown", starttouch, { passive: false });
        dragdrop.addEventListener('touchmove', movetouch, { passive: false });
        dragdrop.addEventListener('touchend', endtouch);
        dragdrop.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        dragdrop.addEventListener('drop', dropevent);

        taskListTitleContainer.appendChild(taskListTitle);
        taskListTitleContainer.appendChild(taskListMore);
        taskList.appendChild(taskListTitleContainer);
        taskList.appendChild(dragdrop);
        taskListWarpper.appendChild(taskList);
        board.appendChild(taskListWarpper);

        document.querySelectorAll(".task-list-title")[index].innerHTML = jsonData.taskLists[index].name;

        for (var i = 0; i < jsonData.taskLists[index].tasks.length; i++, j++) {

            const taskPointer = document.createElement('div');
            taskPointer.className = 'taskpointer';
            taskPointer.id = `${index} ${i}`;
            taskPointer.draggable = 'true';
            taskPointer.onclick = background;

            const taskEdit = document.createElement('i');
            taskEdit.className = 'task-edit fas fa-pencil-alt pointer';
            taskEdit.onclick = taskEdtior;

            taskPointer.addEventListener('dragstart', dragStarted);
            taskPointer.addEventListener('dragend', (e) => {
                e.target.style.opacity = '';
                e.target.classList.remove('highlighted');

            });
            dragdrop.appendChild(taskPointer);

            document.querySelectorAll(".taskpointer")[j].innerHTML = jsonData.taskLists[index].tasks[i].name;
            taskPointer.appendChild(taskEdit);
        }
        const addCard = document.createElement('div');
        addCard.className = 'add-card-message pointer addList';
        addCard.textContent = '+ Add another card';
        addCard.id = `${index}`;
        addCard.onclick = addAnotherList;
        taskList.appendChild(addCard);
        if (index == jsonData.taskLists.length - 1) {
            update(index)
        };
    }
}
else {
    update(-1);
}
function update(index) {
    const taskListWarpper = document.createElement('div');
    taskListWarpper.className = 'task-list-wrapper';

    const taskList = document.createElement('div');
    taskList.className = 'task-list';

    const addCard = document.createElement('div');
    addCard.className = 'add-card-message pointer addList';
    if (index == -1) {
        addCard.textContent = '+ Add List';
    } else {
        addCard.textContent = '+ Add another card';
    }
    addCard.id = `${index}`;
    addCard.onclick = form;

    taskList.appendChild(addCard);
    const board = document.querySelector('.Board');
    taskListWarpper.appendChild(taskList);
    board.appendChild(taskListWarpper);
}
function form(event) {
    event.preventDefault();
    var num = this.id;
    var addcardid = Number(num) + 1;
    this.classList.remove('add-card-message');
    this.classList.remove('pointer');

    if (!this.querySelector('.add-card-form')) {
        const form = document.createElement('form');
        form.className = 'add-card-form';
        form.id = `form${addcardid}`;
        this.textContent = '';

        const textarea = document.createElement('textarea');
        textarea.rows = 3;
        textarea.id = `box${addcardid}`;
        textarea.placeholder = 'Enter a title for this card...';
        textarea.className = 'full-width-input';

        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.className = 'button';
        addButton.textContent = 'Add Card';
        addButton.id = `${addcardid}`;
        addButton.onclick = card;

        const cancelIcon = document.createElement('i');
        cancelIcon.className = 'fas fa-2x fa-times add-card-cancel';
        cancelIcon.onclick = close;
        cancelIcon.id = `${addcardid}`

        form.appendChild(textarea);
        form.appendChild(addButton);
        form.appendChild(cancelIcon);

        this.insertAdjacentElement('afterend', form);
        const parentElement = this.parentNode;
        parentElement.insertBefore(form, this.nextSibling);

        this.remove(this.parentElement);
    }
}
function card(event) {
    event.preventDefault();
    const cardno = this.id;
    const textarea = document.querySelector(`#box${cardno}`);

    if (textarea.value.trim() !== "") {
        const value = textarea.value;

        const taskListTitleContainer = document.createElement('div');
        taskListTitleContainer.className = 'task-list-title-container';

        const taskListTitle = document.createElement('h3');
        taskListTitle.className = 'task-list-title';

        const taskListMore = document.createElement('i');
        taskListMore.className = 'task-list-more pointer';
        taskListMore.className = 'fa-duotone fa-solid fa-trash';
        taskListMore.onclick = Dalert;

        const dragdrop = document.createElement('div');
        dragdrop.className = 'dragdrop';
        dragdrop.id = `${cardno}`;

        dragdrop.addEventListener("pointerdown", starttouch, { passive: false });
        dragdrop.addEventListener('touchmove', movetouch, { passive: false });
        dragdrop.addEventListener('touchend', endtouch);
        dragdrop.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        dragdrop.addEventListener('drop', dropevent);

        let add = document.querySelectorAll(".task-list")[cardno];
        taskListTitleContainer.appendChild(taskListTitle);
        taskListTitleContainer.appendChild(taskListMore);
        add.appendChild(taskListTitleContainer);
        add.appendChild(dragdrop);

        document.querySelectorAll(".task-list-title")[cardno].innerHTML = value;

        const formId = document.querySelector(`#form${cardno}`);
        formId.remove();
        const addCard = document.createElement('div');
        addCard.className = 'add-card-message pointer addList';
        addCard.textContent = '+ Add another card';
        addCard.id = `${cardno}`;
        addCard.onclick = addAnotherList;

        add.appendChild(addCard);
        update(cardno);
        textarea.value = "";
    } else {
        alert("Please add a value to the item.");
    }
}
function close() {
    const btnid = this.id;
    const formId = document.querySelector(`#form${btnid}`);
    formId.remove();
    let add = document.querySelectorAll(".task-list")[btnid];
    const addCard = document.createElement('div');
    addCard.className = 'add-card-message pointer addList';
    addCard.textContent = '+ Add another card';
    addCard.id = `${btnid}`;
    addCard.onclick = addAnotherList;

    add.appendChild(addCard);
}
function addAnotherList(event) {
    event.preventDefault();
    var addcardid = this.id;
    if (!this.querySelector('.add-card-form')) {
        const form = document.createElement('form');
        form.className = 'add-card-form';
        form.id = `form${addcardid}`;
        this.textContent = '';

        const textarea = document.createElement('textarea');
        textarea.rows = 3;
        textarea.id = `box${addcardid}`;
        textarea.placeholder = 'Enter a title for this card...';
        textarea.className = 'full-width-input';

        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.className = 'button';
        addButton.textContent = 'Add Card';
        addButton.id = `${addcardid}`;
        addButton.onclick = addListFunction;

        const cancelIcon = document.createElement('i');
        cancelIcon.className = 'fas fa-2x fa-times add-card-cancel';
        cancelIcon.onclick = close;
        cancelIcon.id = `${addcardid}`

        form.appendChild(textarea);
        form.appendChild(addButton);
        form.appendChild(cancelIcon);

        this.insertAdjacentElement('afterend', form);
        const parentElement = this.parentNode;
        parentElement.insertBefore(form, this.nextSibling);

        this.remove(this.parentElement);
    }
}
function addListFunction(event) {
    event.preventDefault();
    const cardno = this.id;
    const textarea = document.querySelector(`#box${cardno}`);

    if (textarea.value.trim() !== "") {
        const value = textarea.value;

        const taskPointer = document.createElement('div');
        taskPointer.className = 'taskpointer';
        taskPointer.innerText = value;
        taskPointer.onclick = background;
        taskPointer.draggable = 'true';

        const taskEdit = document.createElement('i');
        taskEdit.className = 'task-edit fas fa-pencil-alt pointer';
        taskEdit.onclick = taskEdtior;

        const tasklit = document.querySelectorAll('.dragdrop')[cardno];
        taskPointer.appendChild(taskEdit);
        tasklit.appendChild(taskPointer);

        taskPointer.addEventListener('dragstart', dragStarted);

        taskPointer.addEventListener('dragend', (e) => {
            e.target.style.opacity = '';
            e.target.classList.remove('highlighted');
        });

        const formId = document.querySelector(`#form${cardno}`);
        formId.remove();
        let add = document.querySelectorAll(".task-list")[cardno];
        const addCard = document.createElement('div');
        addCard.className = 'add-card-message pointer addList';
        addCard.textContent = '+ Add another card';
        addCard.id = `${cardno}`;
        addCard.onclick = addAnotherList;

        add.appendChild(addCard);
        textarea.value = "";
    } else {
        alert("Please add a value to the item.");
    }
}
function taskEdtior(event) {
    event.stopPropagation();
    const paren = this.parentElement;
    const value = this.parentElement.textContent;
    paren.textContent = '';
    let tid = paren.id;

    const form = document.createElement('form');
    form.className = 'add-card-form';

    const textarea = document.createElement('textarea');
    textarea.rows = 3;
    textarea.textContent = `${value}`;
    textarea.placeholder = 'Enter a title for this card...';
    textarea.className = 'full-width-input';

    const addButton = document.createElement('button');
    addButton.type = 'submit';
    addButton.className = 'button';
    addButton.innerText = 'Update Task';
    addButton.id = `btn${tid}`;
    addButton.onclick = listEdit;

    const cancelIcon = document.createElement('i');
    cancelIcon.className = 'fas fa-2x fa-times add-card-cancel';
    cancelIcon.onclick = formclose;

    form.appendChild(textarea);
    form.appendChild(addButton);
    form.appendChild(cancelIcon);
    paren.appendChild(form);
}
function formclose(event) {
    event.preventDefault();
    let value = this.parentElement.firstChild.textContent;
    const parent = this.parentElement.parentElement;
    parent.textContent = value;
    this.parentElement.remove();
    const taskEdit = document.createElement('i');
    taskEdit.className = 'task-edit fas fa-pencil-alt pointer';
    taskEdit.onclick = taskEdtior;
    parent.appendChild(taskEdit);
}
function listEdit(event) {
    const value = this.parentElement.firstChild.value;
    if (value !== "") {
        const par = this.parentElement;
        const grand = par.parentElement;

        par.remove()
        grand.textContent = value;
        const taskEdit = document.createElement('i');
        taskEdit.className = 'task-edit fas fa-pencil-alt pointer';
        taskEdit.onclick = taskEdtior;
        grand.appendChild(taskEdit);
    } else {
        alert("Please add a value to the item.");
    }
}