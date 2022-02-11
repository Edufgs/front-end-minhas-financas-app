import React from "react"

//Tem que colocar os props como parametro
function NavbarItem(props){
    return(
        <li className="nav-item">
            <a onClick={props.onClick} className="nav-link" href={props.href}>{props.label}</a>
        </li>
    )
}

export default NavbarItem