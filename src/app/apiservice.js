//Faz as requisições
import axios from "axios";

//Configurações para o axios
const httpClient = axios.create({
    //URL base para fazer as requisições
    baseURL: 'http://localhost:8080',
    withCredentials: true //Permite que mande credenciais pelo cabeçalho
    //https://minhasfinancas-edufgs.herokuapp.com/
})

class ApiService{

    //Vai receber a url da api do back-end
    constructor(apiurl){
        this.apiurl = apiurl
    }

    //Usado para registrar o tokens no cabeçalho das requisições
    static registrarToken(token){
        if(token){
            //Pega todos os headers e adiciona o header Autorization
            //Adiciona o token junto com o Bearer que é o tipo de autorização feita na requisição
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    //Metodos padroes

    //Enviar dados para um servidor
    post(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl, objeto);
    }

    //Atualiza um recurso presente no servidor
    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl, objeto)
    }

    //Vai receber o id via URL para deletar com a requisição deletar
    delete(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl)
    }

    //Requisita algo como um get normal
    get(url){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl)
    }
}

export default ApiService;