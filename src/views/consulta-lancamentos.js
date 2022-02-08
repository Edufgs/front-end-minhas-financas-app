import React from "react"
/**
 * Importando withRouter que vai retornar o componente decorado
 * Esse withRouter ele pega um componete e retorna com mais funcionalidades
 * Uma funcionalidade improtante é navegar para outros componentes
 */
import {withRouter} from 'react-router-dom'
import Card from "../components/card";
import FormGruop from "../components/form-group";
import SelectMenu from "../components/selectMenu";

class ConsultaLancamento extends React.Component{
    render(){
        //Lista dos meses para passar no SelectMenu
        const meses = [
            //Os itens de uma propriedade chamada label, value
            {label: 'Selecione...', value: ''},
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro',value: 2},
            {label: 'Março', value: 3},
            {label: 'Abril', value: 4},
            {label: 'Maio', value: 5},
            {label: 'Junho', value: 6},
            {label: 'Julho', value: 7},
            {label: 'Agosto', value: 8},
            {label: 'Setembro', value: 9},
            {label: 'Outubro', value: 10},
            {label: 'Novembro', value: 11},
            {label: 'Dezembro', value: 12},
        ]

        const tipos = [
            {label: 'Selecione...', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'},
        ]
        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGruop htmlFor="inputAno" label="Ano: *">
                                <input type="text" 
                                        className="form-control" 
                                        id="exampleInputEmail1" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Digite o Ano"/>
                            </FormGruop>

                            <FormGruop htmlFor="inputMes" label="Mes: ">
                                <SelectMenu id="inputMes" className="form-control" lista={meses}></SelectMenu>
                            </FormGruop>

                            <FormGruop htmlFor="inputTipo" label="Tipo de Lançamento: ">
                                <SelectMenu id="inputTipo" className="form-control" lista={tipos}></SelectMenu>
                            </FormGruop>
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