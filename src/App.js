import React from 'react'
import Login from './views/login' //importa o login, não precisa colocar com .js
import 'bootswatch/dist/flatly/bootstrap.css' //Tem que colocar .css
import './custom.css' // ./ é para mostrar a onde eu estou, em cima não precisa pq está na pasta node_modules

class App extends React.Component {

  //render rendeniza o primeiro componente que é a div
  render(){
    return(
      <div>
        {/* Assim para mostrar é só colocar em forma de tag */}
        <Login/>
      </div>
    )
  }
}

export default App
