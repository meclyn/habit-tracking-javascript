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
        let values = JSON.parse(localstorage.getItem(localStorageName) || '[]')
        values.push({ goal: input.value, })

    }
}