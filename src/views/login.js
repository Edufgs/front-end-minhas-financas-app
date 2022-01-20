import React from "react"
import Card from "../components/card"
import FormGruop from "../components/form-gruop"

class Login extends React.Component{

    //Duas variaveis de estado, uma para email e outra para senha
    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        console.log('Email: ', this.state.email)
        console.log('Senha:', this.state.senha)
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    {/* O style a baixo fica igual esse mas de forma diferente: style=" position: relative;left: 300px;" */}
                    <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                        <div className="bs-docs-section">
                            {/*Deposi de uma classe, é possivel adicionar como tag */}
                            {/* Quando adiciona uma "variavel" como title que recebe algo,é adicionado no props e então é só usar o codigo {this.props.title} que pela o recebimento desse props*/}
                            <Card title="Login">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            {/* Usa-se para agrupar dados semelhantes */ }
                                            <fieldset>
                                                <FormGruop label="Email: *" htmlFor="exampleInputEmail1">
                                                    <input type="email" 
                                                            value = {this.state.email}
                                                            onChange={e => this.setState({email: e.target.value})} //Sempre quando digitar um caractere ele vai salvar usando o setState no state. Onde ele vai modificar o email, e.target é o campo selecionado o valor do campo
                                                            className="form-control" 
                                                            id="exampleInputEmail1" 
                                                            aria-describedby="emailHelp" 
                                                            placeholder="Digite o Email">                                                        
                                                    </input>
                                                </FormGruop>
                                                <FormGruop label="Senha: *" htmlFor="exampleInputPassword1">
                                                    <input type="password" 
                                                            value={this.state.senha}
                                                            onChange = {e => this.setState({senha: e.target.value})}
                                                            className="form-control" 
                                                            id="exampleInputPassword1" 
                                                            placeholder="Password">
                                                    </input>
                                                </FormGruop>

                                                <button onClick={this.entrar} className="btn btn-success">Entrar</button>
                                                <button type="button" className="btn btn-danger">Cadastrar</button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default Login