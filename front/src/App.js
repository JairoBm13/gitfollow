import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import FollowersList from "./FollowersList.js";
import Searchbox from "./Searchbox.js";
import FolllowersChain from "./FollowersChain.js";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list : []
    };
  }


  componentDidMount(){
    fetch("followers/sbeltra10")
        .then((res) => res.json())
        .then((json) => this.setState({
            list : json
        })
    );
}

renderTweets(){
  return this.props.tweets.map((t, i) => {
      console.log(t);
      return <FollowersList tweet = {t} key={i}/>;
  });
}

  render() {
    return (
      <div className="App">
        <div>
          <p>Acá hay un tweets</p>
          {this.renderTweets()}
          </div>
      </div>
    );
  }
}

export default App;
