import React from 'react';
// import nanoid from 'nanoid'
// import dictionary from 'nanoid-dictionary'

 let generate = require('nanoid/generate')

let LOWERCASE = require('nanoid-dictionary/lowercase')
let UPPERCASE = require('nanoid-dictionary/uppercase')
let NUMBERS = require('nanoid-dictionary/numbers')
let SYMBOLS = ['+', '-', '?', '*', '_', '!']

let Length = (props) => {
  return <div>
    <label>Length</label>
    <input type="range"
      min="6"
      max="12" 
      value={props.value}
      onChange={props.setLength}></input>  
    <span>{props.value}</span>
  </div>
}

let Checkbox = (props) => {
  return <div>
    <input 
      type="checkbox"
      checked={props.checked}
      onChange={props.onChange}></input>
    <label>{props.label}</label>  
  </div>
}

class App extends React.Component{
  state = {
    password: "",
    withLength: 8,
    withLowercase: false,
    withUppercase: false,
    withSymbols: false
  }

  generatePassword = (length, lowerCase, upperCase, symbols) => {

    let alphabet = NUMBERS
  
    if (lowerCase){
      alphabet += LOWERCASE
    } 
    if (upperCase){
      alphabet += UPPERCASE
    } 
    if (symbols){
      alphabet += SYMBOLS
    } 
    return generate(alphabet,length)
  }

  setLength = (e) => {
    this.setState({withLength: e.target.value})
  }

  setLowerCase = () => {
    if (this.state.withLowercase){
      return this.setState({withLowercase: false})
    } else {
       return this.setState({withLowercase: true})
    }
  }

  setUpperCase = () => {
    if (this.state.withUppercase){
      return this.setState({withUppercase: false})
    } else {
       return this.setState({withUppercase: true})
    }
  }

  setSymbols = () => {
    if (this.state.withSymbols){
      return this.setState({withSymbols: false})
    } else {
       return this.setState({withSymbols: true})
    }
  }

  handleSubmit = (e) => {
    this.setState({password: this.generatePassword(this.state.withLength,
        this.state.withLowercase,
        this.state.withUppercase,
        this.state.withSymbols)});
    e.preventDefault();
  }

  render() {
    return <div>
    <h4>Generate a secure password</h4>
    <div>
      <input 
        value={this.state.password}
        readOnly ></input>
    </div>
    <br />
    <Length 
      value={this.state.withLength} 
      setLength={this.setLength} />
    <br /> 
    <Checkbox
      readOnly={true}
      checked={true} 
      label={"Numbers (always enabled)"}  
       />
    <br /> 
    <Checkbox
      checked={this.state.withLowercase}
      onChange={this.setLowerCase}
      label={"Lowercase"} />
    <br />  
    <Checkbox 
      checked={this.state.withUppercase}
      onChange={this.setUpperCase}
      label={"Uppercase"} />
    <br /> 
    <Checkbox 
      checked={this.state.withSymbols}
      onChange={this.setSymbols}
      label={"Symbols"} />
    <br />
    <div>
      <button 
        type="button"
        onClick={this.handleSubmit} > Generate</button>
    </div>
  </div>
  }
}

export default App;
