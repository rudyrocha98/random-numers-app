import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      numero: 0
    }
    this.handleRandom = this.handleRandom.bind(this)
    this.handleRandomType = this.handleRandomType.bind(this)
  }

  componentDidMount() {
    this.handleRandom();
  }

  callApi = async (a) => {
    let response;
    if(a===undefined){
      response = await fetch(`/api/random`);
    } else{
      response = await fetch(`/api/random/${a}`);
    }
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleRandom(){
    this.callApi()
    .then(res => {
      let numero = res.number;
      this.setState({ numero: numero })
    })
    .catch(err => console.log(err));
  }

  handleRandomType(type){
    this.callApi(type)
    .then(res => {
      let numero = res.number;
      this.setState({ numero: numero })
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Números Random</h1>
        </header>
        <p className="App-intro">
        Número random: {this.state.numero}
        </p>
        <hr/>
        <p>
          <button onClick={this.handleRandom}>Número Random</button>
          <button onClick={ ()=> this.handleRandomType("even")}>Número Random Par</button>
          <button onClick={ ()=> this.handleRandomType("odd")}>Número Random Impar</button>
        </p>
      </div>
    );
  }
}

export default App;
