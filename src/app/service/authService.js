import LancamentoService from "./lancamentoService";
import LocalStorageService from "./localstorageService";
import jwt_decode from "jwt-decode";
import ApiService from "../apiservice";

export const USUARIO_LOGADO = '_usuario_logado'
export const TOKEN = 'access_token'

//Classe para manipular usuario (Verificar se está logad ou remover usuario)
export default class AuthService{
    //Verifica se usuario está logado
    static isUsuarioAutenticado(){
        //Recupera o token no Local Storages
        const token = LocalStorageService.obterItem(TOKEN)

        // Verifica se o token nulo, void ou undefined
        //Se for então retorna false para dizer que não tem usuario logado
        if(!token){
            return false
        }

        //Decodifica o Token
        const decodedToken = jwt_decode(token)
        const expiration = decodedToken.exp
        //Date.now = retorna a hora do sistema operacional em ms
        //Verifica de a data atual é maior que a data expirada
        //Se for maior então não esta expirado
        const isTokenInvalido = Date.now() >= (expiration * 1000)

        return !isTokenInvalido
    }

    //Remove usuario autenticado
    static removerUsuarioAutenticado(){
        LocalStorageService.removertem(USUARIO_LOGADO)
        LocalStorageService.removertem(TOKEN);
    }

    static logar(usuario, token){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario)
        LocalStorageService.adicionarItem(TOKEN, token);
        //Guarda o token
        ApiService.registrarToken(token)
    }

    static obterUsuarioAutenticado(){
        return LocalStorageService.obterItem(USUARIO_LOGADO)
    }

    //Atualiza a sessão do usuario onde ele loga novamente
    static refreshSession(){
        const token = LocalStorageService.obterItem(TOKEN)
        const usuario = AuthService.obterUsuarioAutenticado()
        AuthService.logar(usuario, token)
        return usuario
    }
}