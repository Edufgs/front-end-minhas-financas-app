class LocalStorageService{
    
    static adicionarItem(chave, valor){
        //Salva o id no localStorage que é tipo um banco de dados no navegador e só é acessado pelo front-end
        //JSON.stringify = transforma um obejto em string
        localStorage.setItem(chave, JSON.stringify(valor))
    }

    static obterItem(chave){
        //recupera o id do usuario salvo no localStorage que é tipo um banco de dados no navegador e só é acessado pelo front-end
        const item = localStorage.getItem(chave)
        //Transforma string em objeto json
        return JSON.parse(item)
    }
    
    static removertem(chave){
        localStorage.removeItem(chave)
    }
}

export default LocalStorageService