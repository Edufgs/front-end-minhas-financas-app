/* Jeito antigo (ensinado no curso) do "react-router-dom" verção 5*/
import React from "react"
//{ } = do objeto react-router-dom ele vai extrair as propriedades que vai ser colocado
import{ Route, Switch, HashRouter, Redirect } from 'react-router-dom'
import Login from "../views/login"
import AuthService from "../app/service/authService"
import CadastroUsuario from "../views/cadastroUsuario"
import Home from "../views/home"
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos"
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos"

/** Adiciona as rotas se o usuario está autenticado
 * {component} = pega o props e quebra em propriedades que está la dentro como o component que é passadp na function Rotas() usaundo o operador destructuring
 * Então isola a propriedade component e ainda recebe o resto
 */
function RotaAutenticada( {component: Component, ...props} ){
    return(
        //Propriedade render recebe um componente que quer ser renderizado
        //Vai ser usando para verificar se o usuario está autenticado
        <Route {...props} render={ (componentProps) => {
            //Verifica se tem usuario autenticado, se tiver retorna o proprio endereço que quer acessa e se não tiver redireciona para o /login
            if(AuthService.isUsuarioAutenticado()){
                return(
                    <Component {...componentProps}/>
                )
            }else{
                return(
                    /** Componente que redireciona para uma rota
                     * to = diz para onde e o state é o local de onde fez esse redirect para o login
                     */
                    <Redirect to={{pathname: '/login', state:{ from: componentProps.location } } } />
                )
            }
        }}/>
    )
}

function Rotas(){
    return(
        //A rota vai ficar tipo '#/login' depois do endereço
        <HashRouter>
            {/* É parecido com o Switch case onde vai selecionar a rota dependendo do que for */}
            <Switch>
                {/* Esse componente={Login} vai ser oq vai rendenizar */}
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}/>
                <RotaAutenticada path='/home' component={Home}/>
                <RotaAutenticada path='/consulta-lancamentos' component={ConsultaLancamentos}/>
                {/** /:id = Agora é possivel passar parametros junto com a rota */}
                {/** /:id? = Agora é possivel passar parametros junto com a rota mas em cima é obrigatorio e esse é opcional por causa do ? */}
                <RotaAutenticada path='/cadastro-lancamentos/:id?' component={CadastroLancamentos}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas