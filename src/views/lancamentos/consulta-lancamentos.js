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

class ConsultaLancamento extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
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

    render(){
        //Lista dos meses para passar no SelectMenu
        const meses = this.service.obterListaMeses()

        const tipos = this.service.obterListaTipo()

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
                            <LancamentosTable lancamentos={this.state.lancamentos}></LancamentosTable>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

//Esse withRouter ele pega um componete e retorna com mais funcionalidades
//Uma funcionalidade improtante é navegar para outros componentes
export default withRouter(ConsultaLancamento);