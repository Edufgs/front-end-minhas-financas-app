/* Jeito antigo (ensinado no curso) do "react-router-dom" verção 5*/
import React from "react"
//{ } = do objeto react-router-dom ele vai extrair as propriedades que vai ser colocado
import{ Route, Switch, HashRouter } from 'react-router-dom'
import Login from "../views/login"
import CadastroUsuario from "../views/cadastroUsuario"
import Home from "../views/home"
import ConsultaLancamentos from "../views/consulta-lancamentos"

function Rotas(){
    return(
        //A rota vai ficar tipo '#/login' depois do endereço
        <HashRouter>
            {/* É parecido com o Switch case onde vai selecionar a rota dependendo do que for */}
            <Switch>
                {/* Esse componente={Login} vai ser oq vai rendenizar */}
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro-usuarios" component={CadastroUsuario}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/consulta-lancamentos' component={ConsultaLancamentos}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Rotas