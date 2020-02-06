let btnAddTarefa = document.querySelector("#adicionar-tarefa");

let tarefas = document.querySelector("#tarefas")

let inputTarefa = document.querySelector("#tarefa-digitada")

let listaTarefa = localStorage.getItem("listaTarefa") ? JSON.parse(localStorage.getItem("listaTarefa")) : []


const salvarLocalStorage = tarefas => {
    let tarefasEmJson = JSON.stringify(tarefas)
    localStorage.setItem("listaTarefa", tarefasEmJson)
    console.log("lista de tarefas com sucesso!")
}

const mostrarNaTela = (arrayTarefa) => {

    arrayTarefa.forEach(textoTarefa => {
        let tarefaNova = `<div class="col-md-4">
    <div class="card-tarefa">                       
        <div class="texto-tarefa" >
        ${textoTarefa}
        </div>
        <div class="botao-tarefa">
            <img src="img/check-icon-png-clip-art.png" width="32" alt="botão para finalizar tarefa"
                title="botão para finalizar tarefas"/>
        </div>
    </div>
</div>`

        tarefas.insertAdjacentHTML("beforeend", tarefaNova);

        let objTarefaNova = tarefas.lastElementChild
        let btnCheckTarefaNova = objTarefaNova.lastElementChild.lastElementChild
        btnCheckTarefaNova.onclick = (event) => {
            tarefas.removeChild(event.target.parentNode.parentNode.parentNode)
            listaTarefa = listaTarefa.filter(valor => valor != textoTarefa)

            salvarLocalStorage(listaTarefa)
        }
    });
}

mostrarNaTela(listaTarefa)


const criarTarefaComEnter = (event) => {

    if (event.keyCode == 13 || event.type == "click") {

        let valorDigitado = inputTarefa.value
        if (valorDigitado == "") {
            alert("você não digitou nada na aba tarefa");
            return
        }
        listaTarefa.push(valorDigitado);
        salvarLocalStorage(listaTarefa)
        inputTarefa.value = ""
        let tarefaNova = `<div class="col-md-4">
                    <div class="card-tarefa">                       
                        <div class="texto-tarefa" >
                        ${valorDigitado}
                        </div>
                        <div class="botao-tarefa">
                            <img src="img/check-icon-png-clip-art.png" width="32" alt="botão para finalizar tarefa"
                                title="botão para finalizar tarefas"/>
                        </div>
                    </div>
                </div>`


        tarefas.insertAdjacentHTML("beforeend", tarefaNova)
        let objTarefaNova = tarefas.lastElementChild
        let btnCheckTarefaNova = objTarefaNova.lastElementChild.lastElementChild
        btnCheckTarefaNova.onclick = (event) => {
            tarefas.removeChild(event.target.parentNode.parentNode.parentNode)
            listaTarefa = listaTarefa.filter(valor => valor != valorDigitado)

            salvarLocalStorage(listaTarefa)


        }
        // tarefas.forEach((tarefa) => {
        //     tarefa.onclick = () => alert("clicke") 
        // });

        // let objTarefaNova = tarefas.parentElement;
        // console.log(objTarefaNova)
    }
}
inputTarefa.addEventListener('keypress', criarTarefaComEnter)
btnAddTarefa.addEventListener("click", criarTarefaComEnter)

