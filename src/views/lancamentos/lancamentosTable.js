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
                    <button className="btn btn-success" 
                            title="Efetivar" //Mostra quando passa o mouse em cima
                            disabled={lancamento.status !== 'PENDENTE'} //Desativa o botão quando o status for diferente de PENDENTE
                            onClick={e => props.alterarStatus(lancamento,'EFETIVADO')}
                            type="button">
                            {/** Icone do PrimeReact */}
                            <i className="pi pi-check mr-2"></i>
                    </button>

                    <button className="btn btn-warning" 
                            title="Cancelar" //Mostra quando passa o mouse em cima
                            disabled={lancamento.status !== 'PENDENTE'} //Desativa o botão quando o status for diferente de PENDENTE
                            onClick={e => props.alterarStatus(lancamento,'CANCELADO')}
                            type="button">
                            {/** Icone do PrimeReact */}
                            <i className="pi pi-times mr-2"></i>
                    </button>

                    <button type="button" 
                            className="btn btn-primary"
                            title="Editar" //Mostra quando passa o mouse em cima
                            onClick={e => props.editAction(lancamento.id)}>
                            {/** Icone do PrimeReact */}
                            <i className="pi pi-pencil mr-2"></i>
                    </button>

                    <button type="button" 
                            className="btn btn-danger" 
                            title="Excluir" //Mostra quando passa o mouse em cima
                            onClick={e => props.deleteAction(lancamento)}>
                            {/** Icone do PrimeReact */}
                            <i className="pi pi-trash mr-2"></i>
                    </button>
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