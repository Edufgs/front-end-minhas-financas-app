import React from "react"

//Se for usar componente funcional é legal colocar (props)
function FormGruop(props){
    return(
        <div className="form-group mb-4">
            {/* Só utiliza this.props.label quando está em um componente de classe */}
            {/* for no react é htmlFor */}
            <label htmlFor={props.htmlFor}>{props.label}</label>
             {/* Tudo que ficar no meio das tag Card tem p nome de children*/}
            {/* Fazendo isso aqui diz que adiciona tudo que foi adicionado dentre as tag do FormGrup */}
            {props.children}
        </div>
    )
}

export default FormGruop