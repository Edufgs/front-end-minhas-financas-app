import ApiService from "../apiservice";

import ErroValidacao from "../exception/ErroValidacao";

//É igual em java
class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    //Da um post para a url enviando as credenciais
    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario){
        return this.post('/',usuario);
    }

    validar(usuario){
        const erros = []
        //Verifica o nome
        //Se for false ou nulo ou vazio então ele entra
        if(!usuario.nome){
            erros.push('O campo nome é obrigatório.')
        }

        //Verifica email
        if(!usuario.email){  
            erros.push('O campo email é obrigatório.')

            /**
             * Se o email não passar na expressão regurar/regex (Verifica se uma string está dentro de um padrão) então não vai ser valido
             * O padrão vai ser 'usuario@dominio.com' mas usando regex
             * Esse é o padrão que aceita alguns email: /^[a-z0-9]+@[a-z0-9]+\.[a-z]/
             * Outro regex que aceita mais email é: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
             * O regex a  cima foi encontrada o site: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
             * Explicação sobre regex: https://www.w3schools.com/jsref/jsref_obj_regexp.asp
             */
        }else if(!usuario.email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi)){
            erros.push('Informe um email valido.')
        }

        //Verifica se a senha e senhaRepeticao foi inserida
        if(!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Digite a senha duas vezes.')

            //Verifica se a senha é diferente da senhaRepeticao
        }else if(usuario.senha !== usuario.senhaRepeticao){
            erros.push('As senhas não batem.')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
    }
}

export default UsuarioService;