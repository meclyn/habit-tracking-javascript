const localStorageName = 'dadosfin'

function validateNewFin(){
    let valuesfin = JSON.parse(localStorage.getItem(localStorageName) || '[]')
    let inputValueFin = document.getElementById('input_new_fin').value
    let exists = valuesfin.find(x => x.name == inputValueFin)
    return !exists ? false : true

}

function newTaskFin(){
    let input = document.getElementById('input_new_fin')
    let inputnumber = document.getElementById('input_number_fin')
    input.style.border = ''
    inputnumber.style.border = ''

    if(!input.value || !inputnumber){
        input.style.border = '1px solid red'
        inputnumber.style.border = '1px solid red'
        alert('Preencha o campo')
    } else if(validateNewFin()){
        alert('Já existente.')
    } else{
        let valuesfin = JSON.parse(localStorage.getItem(localStorageName) || '[]')
        valuesfin.push({
            name:input.value
            ,number: parseFloat(inputnumber.value)
        })
        localStorage.setItem(localStorageName,JSON.stringify(valuesfin))
        showValues()

    }

    input.value = ""
    inputnumber.value = ""

    



} 

function showValues(){
    let valuesfin = JSON.parse(localStorage.getItem(localStorageName) || '[]')
    let list = document.getElementById('financial_list')
    list.innerHTML = ''
    for (let i = 0; i < valuesfin.length; i++){
        let formattedNumber = valuesfin[i].number.toFixed(2)
        list.innerHTML += `<li>${valuesfin[i].name} - ${formattedNumber}<button id='btn_ok_fin' onclick='removeItemFin("${valuesfin[i].name}", "${valuesfin[i].number}"); soma_financial();'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg></button></li>`;

    }

}


function removeItemFin(data, number){
    let valuesfin = JSON.parse(localStorage.getItem(localStorageName) || '[]')
    let index = valuesfin.findIndex(x => x.name == data && x.number == parseFloat(number))
    valuesfin.splice(index,1)
    localStorage.setItem(localStorageName, JSON.stringify(valuesfin))
    showValues()
}

function soma_financial(){
    let valuesfin = JSON.parse(localStorage.getItem(localStorageName) || '[]')
    let total = valuesfin.reduce((sum, item) => sum + item.number, 0)
    document.getElementById('total_sum').innerText = total.toFixed(2)

}


function reset_month(){
    let valuesfin = JSON.parse(localStorage.removeItem(localStorageName) || '[]')
    showValues()
    soma_financial()


}

showValues()
soma_financial()
