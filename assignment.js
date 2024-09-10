var j = 0;
const jsonData = {
    name: 'Frontend Training',
    taskLists: [
        {
            name: 'To Do',
            tasks: [
                {
                    name: 'Learn HTML',
                    due: new Date(2019, 11, 15)
                },
                {
                    name: 'Learn CSS',
                    due: new Date(2019, 11, 25)
                },
                {
                    name: 'Learn JavaScript',
                    due: new Date(2019, 12, 14)
                }
            ]
        },
        {
            name: 'Doing',
            tasks: [
                {
                    name: 'Prepare resume',
                    due: new Date(2019, 12, 31)
                }
            ]
        },
        {
            name: 'Testing/Verifying',
            tasks: [
                {
                    name: 'Twitter app frontend',
                    due: new Date(2019, 11, 20)
                }
            ]
        },

        {
            name: 'Deploying',
            tasks: [
                {
                    name: 'Twitter app backend',
                    due: new Date(2019, 11, 18)
                }
            ]
        },
        {
            name: 'Done',
            tasks: []
        }
    ]
};
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

    const taskListMore = document.createElement('span');
    taskListMore.className = 'task-list-more pointer';
    taskListMore.textContent = '...';

    taskListTitleContainer.appendChild(taskListTitle);
    taskListTitleContainer.appendChild(taskListMore);
    taskList.appendChild(taskListTitleContainer);
    taskListWarpper.appendChild(taskList);
    board.appendChild(taskListWarpper);

    document.querySelectorAll(".task-list-title")[index].innerHTML = jsonData.taskLists[index].name;

    for (var i = 0; i < jsonData.taskLists[index].tasks.length; i++, j++) {

        const taskPointer = document.createElement('div');
        taskPointer.className = 'taskpointer';
        taskPointer.id = `${index} ${i}`;

        const taskEdit = document.createElement('i');
        taskEdit.className = 'task-edit fas fa-pencil-alt pointer';
        taskEdit.onclick = taskEdtior;

        taskList.appendChild(taskPointer);

        document.querySelectorAll(".taskpointer")[j].innerHTML = jsonData.taskLists[index].tasks[i].name;
        taskPointer.appendChild(taskEdit);
    }
    const addCard = document.createElement('div');
    addCard.className = 'add-card-message pointer addList';
    addCard.textContent = '+ Add another card';
    addCard.id = `${index}`;
    addCard.onclick = addAnotherList;

    taskList.appendChild(addCard);
    update(index);
}
function addAnotherList(event) {
    event.preventDefault();

    var addcardid = this.id;
    this.classList.remove('add-card-message');
    this.classList.remove('pointer');

    if (!this.querySelector('.add-card-form')) {    // Check if the form already exists inside the button
        const form = document.createElement('form');
        form.className = 'add-card-form'; // Add a class to identify the form
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
    }
}

function addListFunction(event) {
    event.preventDefault();

    const cardno = this.id;
    const textarea = document.querySelector(`#box${cardno}`);

    if (textarea.value.trim() !== "") {
        const value = textarea.value;

        const newTask = { name: `${value}` };

        const lastTaskList = jsonData.taskLists[cardno];
        lastTaskList.tasks.push(newTask);

        const no = jsonData.taskLists[cardno].tasks.length - 1;

        const taskPointer = document.createElement('div');
        taskPointer.className = 'taskpointer';
        taskPointer.innerText = jsonData.taskLists[cardno].tasks[no].name;
        taskPointer.id = `${cardno} ${no}`

        const taskEdit = document.createElement('i');
        taskEdit.className = 'task-edit fas fa-pencil-alt pointer';
        taskEdit.onclick = taskEdtior;

        const tasklit = document.querySelectorAll('.task-list')[cardno];
        taskPointer.appendChild(taskEdit);
        tasklit.appendChild(taskPointer);

        const formId = document.querySelector(`#form${cardno}`);
        formId.remove();
        add = document.querySelectorAll(".task-list")[cardno];
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
function close() {
    const btnid = this.id;
    const formId = document.querySelector(`#form${btnid}`);
    formId.remove();
    add = document.querySelectorAll(".task-list")[btnid];
    const addCard = document.createElement('div');
    addCard.className = 'add-card-message pointer addList';
    addCard.textContent = '+ Add another card';
    addCard.id = `${btnid}`;
    addCard.onclick = addAnotherList;

    add.appendChild(addCard);
}
function form(event) {
    event.preventDefault();
    var num = this.id;
    var addcardid = Number(num) + 1;
    this.classList.remove('add-card-message');
    this.classList.remove('pointer');

    if (!this.querySelector('.add-card-form')) {
        const form = document.createElement('form');
        form.className = 'add-card-form'; // Add a class to identify the form
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
    }
}
function card(event) {
    event.preventDefault();
    const cardno = this.id;
    const textarea = document.querySelector(`#box${cardno}`);

    if (textarea.value.trim() !== "") {
        const value = textarea.value;

        const newTask = {
            name: `${value}`,
            tasks: []
        };
        const lastTasktitle = jsonData.taskLists;
        lastTasktitle.push(newTask);

        const taskListTitleContainer = document.createElement('div');
        taskListTitleContainer.className = 'task-list-title-container';

        const taskListTitle = document.createElement('h3');
        taskListTitle.className = 'task-list-title';

        const taskListMore = document.createElement('span');
        taskListMore.className = 'task-list-more pointer';
        taskListMore.textContent = '...';

        add = document.querySelectorAll(".task-list")[cardno];

        taskListTitleContainer.appendChild(taskListTitle);
        taskListTitleContainer.appendChild(taskListMore);
        add.appendChild(taskListTitleContainer);

        document.querySelectorAll(".task-list-title")[cardno].innerHTML = jsonData.taskLists[cardno].name;

        const formId = document.querySelector(`#form${cardno}`);
        formId.remove();
        add = document.querySelectorAll(".task-list")[cardno];
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
function update(index) {
    if (index == jsonData.taskLists.length - 1) {
        const taskListWarpper = document.createElement('div');
        taskListWarpper.className = 'task-list-wrapper';

        const taskList = document.createElement('div');
        taskList.className = 'task-list';

        const taskListTitleContainer = document.createElement('div');
        taskListTitleContainer.className = 'task-list-title-container';

        const addCard = document.createElement('div');
        addCard.className = 'add-card-message pointer addList';
        addCard.textContent = '+ Add another card';
        addCard.id = `${index}`;
        addCard.onclick = form;

        taskList.appendChild(addCard);
        taskList.appendChild(taskListTitleContainer);
        const board = document.querySelector('.Board');
        taskListWarpper.appendChild(taskList);
        board.appendChild(taskListWarpper);
    }
}
function taskEdtior() {
    const paren = this.parentElement;
    const value = this.parentElement.textContent;
    paren.textContent = '';
    tid = paren.id;

    const form = document.createElement('form');
    form.className = 'add-card-form'; // Add a class to identify the form

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
    event.preventDefault();
    let btnid = this.id;
    let result = btnid.substring(3); // Start at index 4 to skip 'btn '
    const value = this.parentElement.firstChild.value;
    const parts = result.split(' ');
    const index = parts[0];
    const i = parts[1];
    if (value !== "") {
        jsonData.taskLists[index].tasks[i].name = value;

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