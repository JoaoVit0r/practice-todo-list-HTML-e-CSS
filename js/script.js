
const bottonAdd = document.querySelector("#buttonAdd");
const inputDescription = document.querySelector(".description");
const Itens = document.querySelectorAll(".itens");
const listaToDo = document.querySelector("#to-do");
const listaDoing = document.querySelector("#doing");
const listaDone = document.querySelector("#done");

const save = () => {
    let statusTransformado = Array.from(Itens).map(status => {
            return {
                nomeStatus: status.getAttribute('id'),
                itens: Array.from(status.children)
                    .map(filho => {
                        const [descricao] = filho.querySelectorAll('p')
                        return {
                            descricao: descricao.textContent
                        }
                    })
            }
        })

    localStorage.setItem('status', JSON.stringify(statusTransformado))
}

const load = () => {
    let topics = JSON.parse(localStorage.getItem('status'))
    console.log(topics);
    if (topics) {
        topics.forEach(topic => {
            let topicElemento = document.querySelector(`#${topic.nomeStatus}`)
            topic.itens.forEach(item => {
                const li = criarItem(item.descricao, listaToDo)
                if(topic.nomeStatus != "to-do"){
                    moverItem (li, topicElemento, false)
                }
            })

        })

    }

}


const criarItem = (descricao, toDo) => {

    const li = document.createElement('li')
    const button = document.createElement('button')
    const pDescricao = document.createElement('p')

    button.setAttribute('class', 'fas fa-chevron-circle-right')

    button.onclick = () => moverItem (li, listaDoing, true)

    pDescricao.textContent = descricao
    
    li.append(pDescricao, button)

    toDo.appendChild(li)
    
    return li
}

const moverItem = (li, lista, motion) => {
    let animation
    if(motion){
        animation = li.animate([{
            opacity: '1',
            transform: 'scale(1)'
        }, {
            opacity: '0',
            transform: 'scale(0.8)'
        }], 200)
    }
    else{
        animation = li.animate([{
            opacity: '1',
            transform: 'scale(1)'
        }, {
            opacity: '1',
            transform: 'scale(1)'
        }], 0)
    }
        
    animation.onfinish = () => {
        
        if (lista == listaDoing ){
            lista.appendChild(li)
            
            let i =(lista.childElementCount - 1);
            
            while(lista.childNodes[i] != li && i>=0){
                i--;
            }
             lista.childNodes[i].querySelector('button').onclick = () => moverItem (li, listaDone, true);
        }
        else{
            lista.appendChild(li)
            
            let i =(lista.childElementCount - 1);
            
            while(lista.childNodes[i] != li && i>=0){
                i--;
            }
            
            let button =            lista.childNodes[i].querySelector('button');
            
            button.onclick = () => {
                lista.removeChild(li),
                save();
            };
            
            button.classList.replace("fa-chevron-circle-right","fa-times-circle");
        }
        
        save();
    }
}

buttonAdd.onclick = () => {
    criarItem(inputDescription.value, listaToDo),
    save(),
    inputDescription.value = "";
};

load();