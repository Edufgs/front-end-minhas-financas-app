import React from 'react'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css' //Tem que colocar .css
import '../custom.css' //é para mostrar a onde eu estou, em cima não precisa pq está na pasta node_modules
import 'toastr/build/toastr.css' //Para mostrar as mensagens

import Rotas from './rotas'
import Navbar from '../components/navbar'

//Biblioteca do primereact com componentes prontos e estilizados
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

class App extends React.Component {

  //render rendeniza o primeiro componente que é a div
  render(){
    return(
      <>
        <Navbar/>
        <div className='container'>
          {/* Assim para mostrar é só colocar em forma de tag */}
          <Rotas/>
        </div>
      </>
      
    )
  }
}

export default App
