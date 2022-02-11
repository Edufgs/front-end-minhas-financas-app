import LocalStorageService from "./localstorageService";

export const USUARIO_LOGADO = '_usuario_logado'

//Classe para manipular usuario (Verificar se está logad ou remover usuario)
export default class AuthService{
    //Verifica se usuario está logado
    static isUsuarioAutenticado(){
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        /**
         * usuario = verifica se o usuario é undefine, null ou void
         * e
         * usuario.id = verifica se o id é null, undefine ou void
         * então retorna true
         */
        return usuario && usuario.id;
    }

    //Remove usuario autenticado
    static removerUsuarioAutenticado(){
        LocalStorageService.removertem(USUARIO_LOGADO)
    }
}