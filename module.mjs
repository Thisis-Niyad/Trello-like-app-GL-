export function Taskdeletion(event) {
    event.preventDefault();
    const deletetask = document.querySelector('.highlighted');
    if (deletetask!=null) {
    deletetask.remove();
    }
    dropdownContent.classList.remove('show');
}
const search = document.querySelector('#in');
search.addEventListener('keydown', (event) => {
    const taskpointer = document.querySelectorAll('.taskpointer');
    if (event.key === 'Enter') {
        taskpointer.forEach(element => {
            if (element.classList.contains('highlighted')) {
                element.classList.remove('highlighted');
            } if (element.textContent == search.value) {
                element.classList.add('highlighted');
            }
        });
        search.value = '';
    }
});
export function background(event) {
    event.preventDefault();
    let task = this;
    const taskpointer = document.querySelectorAll('.taskpointer');
    taskpointer.forEach(element => {
        if (element.classList.contains('highlighted') && element != task) {
            element.classList.remove('highlighted');
        }
    });
    if (!task.classList.contains('highlighted')) {
        task.classList.add('highlighted');
    }
    else {
        task.classList.remove('highlighted');
    }
}
export function Dalert(event) {
    event.preventDefault();
    const userConfirmed = confirm("Do you want to delete this task?");

    if (userConfirmed) {
        const parent = this.parentElement;
        const grandparent = parent.parentElement;
        grandparent.parentElement.remove();
    }

}





