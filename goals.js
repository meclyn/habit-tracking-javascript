const localStorageName = 'dadosgoals';

function validateNewGoal(){
    let values = JSON.parse(localstorage.getItem(localStorageName) || '[]');
    let inputValue = document.getElementsById('inputgoals').value;
    let exists = values.find(x=> x.name === inputValue);
    return exists ? true : false;

}

function goals(){
    let input = document.getElementsById('inputgoals');
    input.style.border = '';

    // validacao
    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Preencha o campo');
    } else if (validateNewGoal()) {
        alert('Essa meta já existe');
    } else {
        //adicionando ao localstorage
        let values = JSON.parse(localstorage.getItem(localStorageName) || '[]');
        values.push({ goal: input.value, time: new Date().toISOString() });
        localstorage.setItem(localStorageName,JSON.stringify(values));
        showValues();
        updateProgressBar();
    }
    input.value = '';
}

function toggleTaskCompletion(taskGoal) {
    let values = JSON.parse(localStorage.getItem(localStorageName) || '[]');
    let taskCompleted = false;
    values = values.map(task => {
        if (task.goal === taskGoal) {
            task.time = !task.time;
            taskTime = task.time;
        }
        return task;
    });
    localStorage.setItem(localStorageName, JSON.stringify(values));
    showValues();
    updateProgressBar();  
}
function showValues(){
    let values = JSON.parse(localstorage.getItem(localStorageName) || '[]');
    let list = document.getElementById('listgoals');
    list.innerHTML = '';
    for (let i = 0; i < values.length; i++) {
        const task = values[i];
        list.innerHTML +=`
            <li>
            <button class="btn_removegoal" onclick="removegoal('${task.goal}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0"/>
                </svg>
            </button>
            ${task.goal}
            <button id='btn_${i}' class='buttongoals ${task.time ? 'time' : ''}' onclick='toggleTaskCompletion("${task.goal}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
            </button>
        </li>
        `;
    }
}

function removegoal(taskGoal){
    let values = JSON.parse(localstorage.getItem(localStorageName) || '[]');
    let index = values.findIndex(x => x.goal == taskGoal);
    if (index !== -1){
        values.splice(index, 1);
        localStorage.setItem(localStorageName, JSON.stringify(values));
        showValues();
        updateProgressBar();
    }

}
