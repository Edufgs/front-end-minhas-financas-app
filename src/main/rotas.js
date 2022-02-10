/* Jeito antigo (ensinado no curso) do "react-router-dom" verção 5*/
import React from "react"
//{ } = do objeto react-router-dom ele vai extrair as propriedades que vai ser colocado
import{ Route, Switch, HashRouter } from 'react-router-dom'
import Login from "../views/login"
import CadastroUsuario from "../views/cadastroUsuario"
import Home from "../views/home"
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos"
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos"

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
                {/** /:id = Agora é possivel passar parametros junto com a rota */}
                {/** /:id? = Agora é possivel passar parametros junto com a rota mas em cima é obrigatorio e esse é opcional por causa do ? */}
                <Route path='/cadastro-lancamentos/:id?' component={CadastroLancamentos}></Route>
            </Switch>
        </HashRouter>
    )
}

export default Rotas