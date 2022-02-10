import React from "react"

import Card from "../../components/card"
import FormGroup from "../../components/form-group"
import SelectMenu from "../../components/selectMenu"

import {withRouter} from 'react-router-dom'
//importa todas os metodos das mensagens
import * as messages from '../../components/toastr'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroLancamentos extends  React.Component{

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    //Sempre é invocado imediatamente após um componente ser montado (inserido na árvore).
    //Então sempre que a pagina é recarregada é executado esse componete
    componentDidMount(){
        //this.props.match.params = recebe os dados da url da rota
        const params = this.props.match.params

        //Verifica se foi passado o id
        if(params.id){
            this.service
                    .obterPorId(params.id)
                    .then(response => {
                        //... = spread operator = todas as propriedades que vem o response.data então vai ser colocado no state
                        // Só funciona pq vem o mesmo nome
                        this.setState({...response.data, atualizando: true})
                    }).catch(erros => {
                        messages.mensagemErro(erros.response.data)
                    })
        }
    }

    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        /**
         * Operador destructuring, desestrutura algo em varias propriedades filho.
         * Nesse caso esta desestruturando o state e tambem é colocado oq quer extrair da propriedade state
         *  */ 
        const { descricao, valor, mes, tipo, ano} = this.state
        //Agora é só passar para o lancamento com o mesmo nome
        const lancamento = { descricao, valor, mes, tipo, ano, usuario: usuarioLogado.id}

        try{
            this.service.validar(lancamento)
        }catch(erro){
            //O ErroValidacao tem uma propriedade chama mensagens então é acessada e apresentada para o usuario
            const mensagens = erro.mensagens;
            //forEach passa por todos os dados do vetor
            mensagens.forEach(msg => messages.mensagemErro(msg))
            //Termina o metodo aqui por causa do erro
            return false
        }

        this.service
            .salvar(lancamento)
            .then(response =>{
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!')                
            }).catch(error =>{
                //O error tem um response que recebe do back-end então é possivel acessar
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () =>{
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        /**
         * Operador destructuring, desestrutura algo em varias propriedades filho.
         * Nesse caso esta desestruturando o state e tambem é colocado oq quer extrair da propriedade state
         *  */ 
        const { descricao, valor, mes, tipo, ano, id, usuario, status} = this.state
        //Agora é só passar para o lancamento
        const lancamento = { descricao, valor, mes, tipo, ano, id, usuario,status}

        this.service
            .atualizar(lancamento)
            .then(response =>{
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')                
            }).catch(error =>{
                //O error tem um response que recebe do back-end então é possivel acessar
                messages.mensagemErro(error.response.data)
            })
    }

    /**
     * Em vez de fazer: onChange={e => this.setState({ano: e.target.value})} agora esse metodo vai receber um evento generico e fazer esse comando
     * Agora lá no input fica onChange={this.handleChange} entrando nesse metodo
     */
    handleChange = (event) =>{
        const value = event.target.value //pega o valor do input
        const name = event.target.name //pega o nome do input
        
        //Tem que colocar o [name] entre colchete pois é para acessar a variavel do metodo em vez da variavel do state
        //Agora ele seta em qualquer input só colocando o nome
        this.setState({ [name] : value})
    }

    preparaConsultaLancamantos = () =>{
        this.props.history.push('/consulta-lancamentos')
    }

    render(){

        const tipos = this.service.obterListaTipo()
        const meses = this.service.obterListaMeses()

        return(
            /**
             * Usando operador ternario, ? se for true e : se for false
             * Então se for true é colocado 'Atualização de Lancaçamento' ou se for false coloca 'Cadastro de Laçamentos'
             */
            <Card title={this.state.atualizando ? 'Atualização de Lancaçamento' : 'Cadastro de Laçamentos' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input  id="inputDescricao" 
                                    type="text" 
                                    className="form-control"
                                    name="descricao"
                                    value={this.state.descricao}
                                    onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                                    type="text" 
                                    className="form-control"
                                    name="ano"
                                    value={this.state.ano}
                                    onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mes: *">
                            <SelectMenu className="form-control"  
                                        id="inputMes" 
                                        lista={meses} 
                                        name="mes"
                                        value={this.state.mes}
                                        onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                </div>

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" 
                                    type="text" 
                                    className="form-control"
                                    name="valor"
                                    value={this.state.valor}
                                    onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Mes: *">
                            <SelectMenu className="form-control" 
                                        id="inputTipo" 
                                        lista={tipos} 
                                        name="tipo"
                                        value={this.state.tipo}
                                        onChange={this.handleChange}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: ">
                            {/* Campo input não vai estar editavel então foi colocado disabled */}
                            <input type = "text" 
                                    className="form-control" 
                                    disabled 
                                    name="status"
                                    value={this.state.status}/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        {/**
                        * Usando operador ternario, ? se for true e : se for false
                        * Então se for true é colocado o botão atualizar ou se for false coloca o botão de salvar
                        */}
                        {this.state.atualizando ? 
                            (
                                <button onClick={this.atualizar} className="btn btn-success">Atualizar</button>
                            ) :(
                                <button onClick={this.submit} className="btn btn-success">Salvar</button>
                            )

                        }
  
                        <button onClick={this.preparaConsultaLancamantos} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

//Esse withRouter ele pega um componete e retorna com mais funcionalidades
//Uma funcionalidade importante é navegar para outros componentes
export default withRouter(CadastroLancamentos)