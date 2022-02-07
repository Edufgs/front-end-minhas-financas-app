import React from "react"

import LocalStorageService from "../app/service/localstorageService"

import UsuarioService from "../app/service/usuarioService"

class Home extends React.Component{
    
    state = {
        saldo: 0
    }

    constructor(){
        super()
        //ES não precisa colocar:
        //UsuarioService usuarioService = new UsuarioService()
        this.usuarioService = new UsuarioService()
    }
    
    //É invocado imediatamente após um componente ser montado
    //Carrega dados para mostrar na view que está sendo carregada
    //Vai ser usado para puxar o saldo do servidor
    componentDidMount(){
        //recupera o id do usuario salvo no localStorage que é tipo um banco de dados no navegador e só é acessado pelo front-end
        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado")

        console.log(usuarioLogado)
        
        this.usuarioService
            .obterSaldoPorUsuario(usuarioLogado.id)
            //se der sucesso, response pode ser qualquer nome
            .then(response => {
                this.setState({saldo: response.data})
            }).catch(erro =>{
                console.log(erro.response)
            })
    }

    render(){
        return(
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4"></hr>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">'
                    <a className="btn btn-primary btn-lg" 
                        href="#/cadastro-usuarios" 
                        role="button">
                        <i className="fa fa-users"></i>
                        Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg" 
                        href="https://bootswatch.com/flatly/#" 
                        role="button">
                        <i className="fa fa-users"></i>
                        Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

export default Home