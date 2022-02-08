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

    //Verifica os dados
    validar(){
        //Vetor para colocar as mensagens
        const msgs = []

        //Verifica o nome
        //Se for false ou nulo ou vazio então ele entra
        if(!this.state.nome){
            msgs.push('O campo nome é obrigatório.')
        }

        //Verifica email
        if(!this.state.email){  
            msgs.push('O campo email é obrigatório.')

            /**
             * Se o email não passar na expressão regurar/regex (Verifica se uma string está dentro de um padrão) então não vai ser valido
             * O padrão vai ser 'usuario@dominio.com' mas usando regex
             * Esse é o padrão que aceita alguns email: /^[a-z0-9]+@[a-z0-9]+\.[a-z]/
             * Outro regex que aceita mais email é: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
             * O regex a  cima foi encontrada o site: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
             * Explicação sobre regex: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
             */
        }else if(!this.state.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)){
            msgs.push('Informe um email valido.')
        }

        //Verifica se a senha e senhaRepeticao foi inserida
        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha duas vezes.')

            //Verifica se a senha é diferente da senhaRepeticao
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não batem.')
        }

        return msgs
    }

    //cadastra o usuario
    cadastrar = () => {

        const msgs = this.validar()

        //Se tiver mensagens mostra as mensagens para o usuario
        if(msgs && msgs.length > 0){
            /**
             * Faz uma interação dentro do array de mensagens
             * Passa dois parametros para arrow function que é a mensagem (Elemento na posição) e o indice (posição)
             */
            msgs.forEach( (msg, index) => {
                mensagemErro(msg)
            })
            
            //Para a execução da função
            return false;
        }

        //Melhor pratica é criar o objeto do que passar o state criado a cima
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
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
