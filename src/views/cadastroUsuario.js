import React from "react"
import Card from "../components/card"
import FormGruop from "../components/form-group"
//importando withRouter que vai retornar o componente decorado
//Esse withRouter ele pega um componete e retorna com mais funcionalidades
//Uma funcionalidade improtante é navegar para outros componentes
import {withRouter} from 'react-router-dom'

import UsuarioService from "../app/service/usuarioService"
import {mensagemSucesso, mensagemErro} from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super()
        //ES não precisa colocar:
        //UsuarioService service = new UsuarioService()
        this.service = new UsuarioService
    }

    //cadastra o usuario
    cadastrar = () => {
        /**
         * Operador destructuring, desestrutura algo em varias propriedades filho.
         * Nesse caso esta desestruturando o state e tambem é colocado oq quer extrair da propriedade state
         *  */ 
        const{ nome, email, senha,  senhaRepeticao } = this.state
        //Agora é só passar para o lancamento como o mesmo nome
        const usuario = { nome, email, senha, senhaRepeticao }

        try{
            this.service.validar(usuario)
        }catch(erro){
            const msg = erro.mensagens
            msg.forEach(msg => mensagemErro(msg))
            return false;
        }

        this.service.salvar(usuario)
            .then(response => {
                //Se der certo o login então imprime a mensagem de sucesso
                mensagemSucesso('Usuario cadastrado com sucesso! Faça o login para acessar o sistema.')
                //Redireciona para tela de login
                this.props.history.push('/login')
            }).catch(error => {
                //Pega o erro que foi lançado no back-end e imprime para o usuario
                mensagemErro(error.response.data)
            })

    }

    cancelar = () => {
        //history.push('/login') = ele recebe como parametro a rota que desejo navegar
        //Não precisa colocar #/ pois ele ja estra dentro de HashRouter lá em Rotas.js
        this.props.history.push('/login')
    }

    render(){
        return(
            <div>
                <Card title="Cadastro de Usúario">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGruop label="Nome: *" htmlFor="inputNome">
                                    <input type="text" 
                                            className="form-control"
                                            id="inputNome" 
                                            name="nome"
                                            onChange={e => this.setState({nome: e.target.value})}>                                                
                                    </input>
                                </FormGruop>
                                <FormGruop label="Email: *" htmlFor="inputEmail">
                                    <input type="text" 
                                            className="form-control"
                                            id="inputEmail" 
                                            name="email"
                                            onChange={e => this.setState({email: e.target.value})}>                                                
                                    </input>
                                </FormGruop>
                                <FormGruop label="Senha: *" htmlFor="inputSenha">
                                    <input type="password" 
                                            className="form-control"
                                            id="inputSenha" 
                                            name="senha"
                                            onChange={e => this.setState({senha: e.target.value})}>                                                
                                    </input>
                                </FormGruop>
                                <FormGruop label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                    <input type="password" 
                                            className="form-control"
                                            id="inputRepitaSenha" 
                                            name="senha"
                                            onChange={e => this.setState({senhaRepeticao: e.target.value})}>                                                
                                    </input>
                                </FormGruop>
                                <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                                <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                            </div>
                        </div>                            
                    </div>                        
                </Card>
            </div>           
        )
    }
}

//Esse withRouter ele pega um componete e retorna com mais funcionalidades
//Uma funcionalidade improtante é navegar para outros componentes
export default withRouter(CadastroUsuario)
