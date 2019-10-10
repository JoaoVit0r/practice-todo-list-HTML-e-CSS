const bottonAdd = document.querySelector("#buttonAdd");
const inputDescription = document.querySelector(".description");
const listaToDo = document.querySelector("#to-do");
const listaDoing = document.querySelector("#doing");
const listaDone = document.querySelector("#done");

//window.console.log(botao);

/*
const load = () => {
    let listas = JSON.parse(localStorage.getItem('lista'))
    if (listas) {
        listas.forEach(lista => {
            let listaElemento = document.querySelector(`#${lista.nomeLista}`)
            lista.itens.forEach(item => {
                criarItem(item.descricao, item.nota, listaElemento)
            })

        })

    }

}*/


const criarItem = (descricao, toDo) => {

    const li = document.createElement('li')
    const button = document.createElement('button')
    const pDescricao = document.createElement('p')


    button.setAttribute('class', 'fas fa-chevron-circle-right')

    //li.appendChild(buttonImg)

    button.onclick = () => moverItem (li, listaDoing)

    

    pDescricao.textContent = descricao

    //pDescricao.classList.add('descricao')
    
    li.append(pDescricao, button)

    toDo.appendChild(li)
}

const moverItem = (li, lista) => {
    let animation = li.animate([{
        opacity: '1',
        transform: 'scale(1)'
    }, {
        opacity: '0',
        transform: 'scale(0.8)'
    }], 200)
            
    animation.onfinish = () => {
        
        if (lista == listaDoing ){
            lista.appendChild(li)
            
            let i =(lista.childElementCount - 1);
            
            while(lista.childNodes[i] != li && i>=0){
                i--;
            }
            
            lista.childNodes[i].childNodes[1].onclick = () => moverItem (li, listaDone);
        }
        else{
            lista.appendChild(li)
            
            let i =(lista.childElementCount - 1);
            
            while(lista.childNodes[i] != li && i>=0){
                i--;
            }

            lista.childNodes[i].childNodes[1].onclick = () => {
                lista.removeChild(li);
                //save()
            };
        }
    }
}

//console.log(listaDone);

buttonAdd.onclick = () => criarItem(inputDescription.value, listaToDo)