import React from "react";
import { withRouter } from 'react-router-dom'

//Pagina para ser a primeira a aparecer para o usuario
class LandingPage extends React.Component{

    //Manda para pagina home
    goToHomePage = () =>{
        this.props.history.push("/home")
    }

    render(){
        return(
            <div className="container text-center">
                <h2>Bem vindo ao sistema Minhas Finanças</h2>
                Este é seu sistema para controle de finanças pessoais, 
                clique no botão abaixo para acessar o sistema: <br/><br/>

                <div className="offset-md-4 col-md-4">
                    <button onClick={this.goToHomePage} className="btn btn-success" style={{width: '100%'}}>
                        <i className="pi pi-sign-in">    </i>   Acessar
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(LandingPage)