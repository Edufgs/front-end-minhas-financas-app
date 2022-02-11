import React from "react"
import Card from "../components/card"
import FormGruop from "../components/form-group"
//importando withRouter que vai retornar o componente decorado
//Esse withRouter ele pega um componete e retorna com mais funcionalidades
//Uma funcionalidade improtante é navegar para outros componentes
import {withRouter} from 'react-router-dom'

import UsuarioService from "../app/service/usuarioService"

//Como é para importar varias funções então faz desse jeito:
//Assim é só colocar o nome da função que quer ser importada
import { mensagemErro } from '../components/toastr'
import { AuthContext } from "../main/provedorAutenticacao"

class Login extends React.Component{

    //Duas variaveis de estado, uma para email e outra para senha
    state = {
        email: '',
        senha: '',
    }

    constructor(){
        super();
        //ES não precisa colocar:
        //UsuarioService service = new UsuarioService()
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email:this.state.email,
            senha: this.state.senha
        }).then( response => { //Recebe a resposta do servidor (exemplo: ok, BadRequest, Created,... e dados)
            //Agora as variaveis de contexto vai ficar nessa variavel context assim acessa os metodos do provedor de autenticacao
            this.context.iniciarSessao(response.data)
            //Manda para a tela home
            this.props.history.push('home')
        }).catch(erro => { //Se der erro
            //Mostra o erro usando toastr para mostrar as mensagens
            mensagemErro(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        //history.push('/cadastro-usuarios') = ele recebe como parametro a rota que desejo navegar
        //Não precisa colocar #/ pois ele ja estra dentro de HashRouter lá em Rotas.js
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return(
            <div>
                <div className="row">
                    {/* O style a baixo fica igual esse mas de forma diferente: style=" position: relative;left: 300px;" */}
                    <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                        <div className="bs-docs-section">
                            {/*Deposi de uma classe, é possivel adicionar como tag */}
                            {/* Quando adiciona uma "variavel" como title que recebe algo,é adicionado no props e então é só usar o codigo {this.props.title} que pela o recebimento desse props*/}
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            {/* Usa-se para agrupar dados semelhantes */ }
                                            <fieldset>
                                                <FormGruop label="Email: *" htmlFor="exampleInputEmail1">
                                                    <input type="email" 
                                                            value = {this.state.email}
                                                            onChange={e => this.setState({email: e.target.value})} //Sempre quando digitar um caractere ele vai salvar usando o setState no state. Onde ele vai modificar o email, e.target é o campo selecionado o valor do campo
                                                            className="form-control" 
                                                            id="exampleInputEmail1" 
                                                            aria-describedby="emailHelp" 
                                                            placeholder="Digite o Email">                                                        
                                                    </input>
                                                </FormGruop>
                                                <FormGruop label="Senha: *" htmlFor="exampleInputPassword1">
                                                    <input type="password" 
                                                            value={this.state.senha}
                                                            onChange = {e => this.setState({senha: e.target.value})}
                                                            className="form-control" 
                                                            id="exampleInputPassword1" 
                                                            placeholder="Password">
                                                    </input>
                                                </FormGruop>

                                                <button onClick={this.entrar} 
                                                        className="btn btn-success">
                                                        {/** Icone do PrimeReact */}
                                                        <i className="pi pi-sign-in mr-2"></i> Entrar
                                                </button>

                                                <button onClick={this.prepareCadastrar} 
                                                        type="button" 
                                                        className="btn btn-danger">
                                                        {/** Icone do PrimeReact */}
                                                        <i className="pi pi-plus mr-2"></i> Cadastrar
                                                </button>

                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

//Assim o componente de classe vai se inscrever no contexto do provedorAutenticacao assim vai ter acesso as propriedades exportadas do provedor de autenticação
//Agora as variaveis de contexto vai ficar nessa variavel context assim acessa os metodos do provedor de autenticacao
//Essa forma só funciona para componentes de classe
Login.contextType = AuthContext

//Esse withRouter ele pega um componete e retorna com mais funcionalidades
//Uma funcionalidade improtante é navegar para outros componentes
export default withRouter(Login)