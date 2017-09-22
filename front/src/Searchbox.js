import React, { Component } from "react";

class Searchbox extends Component {

  handleKeyEvent(event){
    if(event.key === "Enter"){
      this.props.search(event.target.value);
    }
  }

  render() {
    return (
      <input type="text" placeholder="Search" 
        onKeyPress={this.handleKeyEvent.bind(this)} />
    );
  }
}

export default Searchbox;