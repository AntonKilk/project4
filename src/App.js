import React from 'react';
import LOWERCASE from 'nanoid-dictionary/lowercase'
import UPPERCASE from 'nanoid-dictionary/uppercase'
import NUMBERS from 'nanoid-dictionary/numbers'

let SYMBOLS = `+-!*&`
let generate = require('nanoid/generate')



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

  toggleWithLowercase = () => {
    return this.setState(state => ({withLowercase: !state.withLowercase}))
  }

  toggleWithUppercase = () => {
    return this.setState(state => ({withUppercase: !state.withUppercase}))
  }

  toggleWithSymbols = () => {
    return this.setState(state => ({withSymbols: !state.withSymbols}))
  }

  handleSubmit = () => {
    this.setState({password: this.generatePassword(this.state.withLength,
        this.state.withLowercase,
        this.state.withUppercase,
        this.state.withSymbols)});
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
      checked={true}
      readOnly
      onChange={()=>true}
      label={"Numbers (always enabled)"}  
       />
    <br /> 
    <Checkbox
      checked={this.state.withLowercase}
      onChange={this.toggleWithLowercase}
      label={"Lowercase"} />
    <br />  
    <Checkbox 
      checked={this.state.withUppercase}
      onChange={this.toggleWithUppercase}
      label={"Uppercase"} />
    <br /> 
    <Checkbox 
      checked={this.state.withSymbols}
      onChange={this.toggleWithSymbols}
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
