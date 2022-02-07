import ApiService from "../apiservice";

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
}

export default UsuarioService;