import React, { useContext } from "react"

import NavbarItem from "./navbarItem"
import { AuthConsumer } from "../main/provedorAutenticacao"

function Navbar(props){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" 
                        type="button" data-toggle="collapse" 
                        data-target="#navbarResponsive" 
                        aria-controls="navbarResponsive" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>               
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home"></NavbarItem>
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastro-usuarios" label="Usuários"></NavbarItem> {/* Colocou "href="#/cadastros-usuarios"" pq foi definido lá no path nas Rotas.js  */}
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/consulta-lancamentos" label="Lançamentos"></NavbarItem>
                        <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Sair"></NavbarItem>                        
                    </ul>

                </div>
            </div>
    </div>
    )
}

/**
 * Como está assim: () =>(  ) e não com chave então não precisa usar o return se fosse assim () => {  } então teria que usar return
 * Desse jeito vai ser passado o context.isAutenticado para o isUsuarioAutenticado no props de Navbar
 */
export default () => (
    <AuthConsumer>
        {(context) => ( 
            <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}  /> 
        )}
    </AuthConsumer>
)