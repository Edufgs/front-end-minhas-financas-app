import React from "react";

import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

import {withRouter} from 'react-router-dom'

import LancamentoService from "../../app/service/lancamentoService";

class CadastroLancamentos extends  React.Component{

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: ''
    }

    constructor(){
        super()
        this.service = new LancamentoService()
    }

    submit = () => {
        console.log(this.state)
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

    render(){

        const tipos = this.service.obterListaTipo()
        const meses = this.service.obterListaMeses()

        return(
            <Card title="Cadastro de Laçamentos">
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
                        <button onClick={this.submit} className="btn btn-success">salvar</button>
                        <button className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

//Esse withRouter ele pega um componete e retorna com mais funcionalidades
//Uma funcionalidade importante é navegar para outros componentes
export default withRouter(CadastroLancamentos);