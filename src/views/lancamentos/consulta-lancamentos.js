import React from "react"
/**
 * Importando withRouter que vai retornar o componente decorado
 * Esse withRouter ele pega um componete e retorna com mais funcionalidades
 * Uma funcionalidade improtante é navegar para outros componentes
 */
import {withRouter} from 'react-router-dom'

import Card from "../../components/card";
import FormGruop from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

//Importa tudo dentro de toastr atravez da variavel mensagens
import * as mensagens from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamento extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: []
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    buscar = () => {

        //Como o ano é obrigatorio então vedifica se foi passado
        if(!this.state.ano){
            mensagens.mensagemErro('O preenchimento do campo Ano é obrigatório.')
            //Para a execução do metodo
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(resposta => {
                this.setState({lancamentos: resposta.data})
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log('Editar: ', id)
    }

    abrirConfirmação = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoDeletar: lancamento})
    }

    cancelarDelecao = () => {
        //Quando cancelar a deleção então fecha a caixa de dialogo e retira o objeto da variavel lancamentoDeletar
        this.setState({showConfirmDialog: false, lancamentoDeletar: {}})
    }

    deletar = () => {
        this.service.deletar(this.state.lancamentoDeletar.id)
        .then(response =>{
            const lancamentos = this.state.lancamentos; 
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            // retira um objeto do array recebendo dois parametros o index que vai deletar e a quantidade de elemento que vai deletar apartir daquele index.
            lancamentos.splice(index,1)
            this.setState({lancamentos: lancamentos, showConfirmDialog: false})
            mensagens.mensagemSucesso('Lançamento deletado com sucesso!')
        }).catch(error =>{
            mensagens.mensagemErro('Ocorreu um erro ao tentar deletar lançamento.')
        })
    }

    render(){
        //Lista dos meses para passar no SelectMenu
        const meses = this.service.obterListaMeses()

        const tipos = this.service.obterListaTipo()

        const confirmDialogFooter= (
            <div>
                {/*Se confirmar então chama o metodo deletar*/}
                <Button label="Confirma" icon="pi pi-check" onClick={this.deletar} />
                {/*Se cancelar então chama o metodo que cancela*/}
                <Button label="Cancela" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGruop htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                        className="form-control" 
                                        id="inputAno" 
                                        placeholder="Digite o Ano"
                                        value={this.state.ano}
                                        onChange={e => this.setState({ano: e.target.value})}/>
                            </FormGruop>

                            <FormGruop htmlFor="inputMes" label="Mes: ">
                                <SelectMenu id="inputMes" 
                                            className="form-control" 
                                            lista={meses}
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value })}/>
                            </FormGruop>

                            <FormGruop htmlFor="inputTipo" label="Tipo de Lançamento: ">
                                <SelectMenu id="inputTipo" 
                                            className="form-control"
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value })}
                                            lista={tipos}/>
                            </FormGruop>

                            <FormGruop htmlFor="inputDesc" label="Descrição: ">
                                <input type="text" 
                                        className="form-control" 
                                        id="inputDesc" 
                                        placeholder="Digite a descrição"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({descricao: e.target.value})}/>
                            </FormGruop>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                                                deleteAction = {this.abrirConfirmação}
                                                editAction ={this.editar}></LancamentosTable>
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialog} 
                            style={{ width: '50vw' }}
                            //Botões de confirmação
                            footer={confirmDialogFooter}
                            //Quando clicar no botão de fechar então vai setar no showConfirmDialog = false
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        <p>Confirma a exclusão deste lançamento?</p>
                    </Dialog>
                </div>

            </Card>
        )
    }
}

//Esse withRouter ele pega um componete e retorna com mais funcionalidades
//Uma funcionalidade importante é navegar para outros componentes
export default withRouter(ConsultaLancamento);