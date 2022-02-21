import React from "react"

import UsuarioService from "../app/service/usuarioService"
import { AuthContext } from "../main/provedorAutenticacao"

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
        //Agora as variaveis de contexto vai ficar nessa variavel "context" assim acessa os metodos e propriedade do provedor de autenticacao
        const usuarioLogado = this.context.usuarioAutenticado

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
                <p className="lead">
                    <a className="btn btn-primary btn-lg" 
                        href="#/cadastro-usuarios" 
                        role="button">
                        <i className="pi pi-users"></i> Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg" 
                        href="https://bootswatch.com/flatly/#" 
                        role="button">
                        <i className="pi pi-money-bill"></i> Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

//Assim o componente de classe vai se inscrever no contexto do provedorAutenticacao assim vai ter acesso as propriedades exportadas do provedor de autenticação
//Agora as variaveis de contexto vai ficar nessa variavel context assim acessa os metodos do provedor de autenticacao
//Essa forma só funciona para componentes de classe
Home.contextType = AuthContext
//Esse withRouter ele pega um componete e retorna com mais funcionalidades
//Uma funcionalidade improtante é navegar para outros componentes
export default Home