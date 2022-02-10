import ApiService from "../apiservice";

import ErroValidacao from "../exception/ErroValidacao";

export default class LancamentoService extends ApiService{
    constructor(){
        super('/api/lancamentos')
    }

    obterListaMeses(){
        return [
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
    }

    obterListaTipo(){
        return[
            {label: 'Selecione...', value: ''},
            {label: 'Despesa', value: 'DESPESA'},
            {label: 'Receita', value: 'RECEITA'},
        ]
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    validar(lancamento){
        //Guarda os erros
        const erros = [];

        //Verifica os dados
        if(!lancamento.ano){
            erros.push("Informe o Ano.")
        }

        if(!lancamento.mes){
            erros.push("Informe o Mes.")
        }

        if(!lancamento.descricao){
            erros.push("Informe a Descrição.")
        }

        if(!lancamento.valor){
            erros.push("Informe o Valor.")
        }

        if(!lancamento.tipo){
            erros.push("Informe o Tipo.")
        }

        //Se tiver erros então lança um ErroValidacao
        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }

    }

    salvar(lancamento){
        return this.post('/',lancamento)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`,lancamento)
    }

    //Monta a URL para fazer a requisição
    consultar(lancamentoFiltro){
        /**
         * Para enviar os dados apartir da URL então tem que montar desse jeito:
         * /api/lancamentos?ano=2019&mes=1&usuario=4
         * */
        
        let params = `?ano=${lancamentoFiltro.ano}`
       
        if(lancamentoFiltro.mes){
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo){
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status){
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if(lancamentoFiltro.usuario){
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        if(lancamentoFiltro.descricao){
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }

        return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }
}