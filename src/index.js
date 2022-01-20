
/*
  Arquivo de entrada da aplicação. Ele que inicia a aplicação
*/

import React from 'react'
import ReactDOM from 'react-dom' //Iniciar a aplicação web
import App from './main/App' //Importação do app, primeiro componente

//Codigo que inicia a aplicação, onde ele recebe dois parametros
//App é a aplicação
//Segundo é onde ele vai rendenizar onde é procurado lá na pasta public/index.html onde tem o id chamado root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
