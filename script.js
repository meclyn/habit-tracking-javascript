const localStorageName = 'dados';

function validateNewTask(){
    let values = JSON.parse(localStorage.getItem(localStorageName) || '[]');
    let inputValue = document.getElementById('input_new_task').value;
    let exists = values.find(x => x.name === inputValue);
    return exists ? true : false;
}

function newTask(){
    let input = document.getElementById('input_new_task');
    input.style.border = '';

    // validação
    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Preencha o campo');
    } else if (validateNewTask()) {
        alert('Hábito já existe');
    } else {
        // adicionando ao localStorage
        let values = JSON.parse(localStorage.getItem(localStorageName) || '[]');
        values.push({ name: input.value, completed: false });
        localStorage.setItem(localStorageName, JSON.stringify(values));
        showValues();
    }
    input.value = '';
}

function toggleTaskCompletion(taskName){
    let values = JSON.parse(localStorage.getItem(localStorageName) || '[]');
    values = values.map(task => {
        if (task.name === taskName) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem(localStorageName, JSON.stringify(values));
    showValues();
}

function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageName) || '[]');
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        const task = values[i];
        list.innerHTML += `
            <li>
                ${task.name}
                <button id='btn_${i}' class='btn_ok ${task.completed ? 'completed' : ''}' onclick='toggleTaskCompletion("${task.name}")'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                    </svg>
                </button>
            </li>`;
    }
}

function removeItem(data){
    let values = JSON.parse(localStorage.getItem(localStorageName) || '[]');
    let index = valuesfin.findIndex(x => x.name == data)

    
}

document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add_task_button');
    addButton.addEventListener('click', newTask);
    showValues();
});

showValues()
