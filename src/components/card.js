import React from "react"

//Vira uma tag para ficar organizado
class Card extends React.Component{
    render(){
        return(
            <div className="card mb-3">
                {/*Cabeçalho*/}
                <h3 className="card-header">{this.props.title}</h3>
                {/*Corpo do card*/}
                <div className="card-body">
                    {/* Tudo que ficar no meio das tag Card tem p nome de children*/}
                    {/* Fazendo isso aqui diz que adiciona tudo que foi adicionado dentre as tag do Card */}
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Card