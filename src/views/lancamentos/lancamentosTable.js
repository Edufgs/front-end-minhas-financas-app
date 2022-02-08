import React from "react";
/**
 * Biblioteca usada para formatar valores
 * Site: https://www.npmjs.com/package/react-currency-format
 */

import currencyFormatter from "currency-formatter";

//Usando Arrow function
export default props => {

    const rows = props.lancamentos.map( lancamento => {
        return(
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                {/*currencyFormatter.format = usada para formatar valores onde tem que passar o valor e o formato.*/}
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'} ) }</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            
            <tbody>
                {rows}
            </tbody>
        </table>
    )
    //Classe do bootstrap table para tabela e table-hover para marcar onde passar o mouse
   
}