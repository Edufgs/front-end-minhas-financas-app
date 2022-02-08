import React from "react";

/* Esse é um jeito mas tem outro usando arrow function
//Se for usar componente funcional é legal colocar (props)
function SelectMenu(props){
    return(
        
    )
}

export default SelectMenu;*/

//Usando Arrow function
export default (props) =>{
    /**
     * Objeto chamado lista com o label (nome que vai aparecer na tela) e value (que é o valor dele)
     * Map recebe o valor e interage sobre cada um e faz algo
     * Então ele vai receber a lista que cada um dos itens vai ficar com nome de option em cada interação e retornar um <option>
     */
    const options = props.lista.map( (option, index) => {
        return(
            /**
             * Cria um option com o value e o label recebido
             * Precisa ter key nos filhos pq o dom virtual do react tem que saber exatamente qual é o componente que precisa atualizar
             * Assim a key serve para ele saber
             */
            <option key={index} value={option.value}>{option.label}</option>
        )
    })

    return (
        //{...props} = pega todas as outras propriedades que for passada para o componente e vai espalhar para o select
        <select {...props}>
            {options}
        </select>
    )
}