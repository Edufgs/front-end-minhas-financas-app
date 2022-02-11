import React from "react"

/**
 * {render, ...props} = pega o props e quebra em propriedades que está la dentro como o render que é recebido e transformado o render em render
 * Então isola a propriedade render e ainda recebe o resto
 */
//Tem que colocar os props como parametro
function NavbarItem( {render, ...props} ){
    if(render){
        return(
            <li className="nav-item">
                <a onClick={props.onClick} className="nav-link" href={props.href}>{props.label}</a>
            </li>
        )
    }else{
        //retorna false e não renderiza os itens
        return false
    }
}

export default NavbarItem