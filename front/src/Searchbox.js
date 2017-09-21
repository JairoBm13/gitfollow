import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class Searchbox extends Component {

    handleKeyEvent(event){
        if(event.keyCode === 13){
            this.props.searchUser(event.targe.value);
        }
    }

  render() {
    return (
      <input type="text" onInput={this.handleKeyEvent.bind(this)} />
    );
  }
}

export default Searchbox;