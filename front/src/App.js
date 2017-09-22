import React, { Component } from "react";
import "./App.css";
import FollowersList from "./FollowersList.js";
import Searchbox from "./Searchbox.js";
import FollowersChain from "./FollowersChain.js";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      followers : [],
      chain : [],
      filt : "",
      usuario : ""
    };
  }

  componentDidMount(){
    
  }

  search(user){
    this.setState({
      usuario : user,
      chain : this.state.chain.concat(user)
    }, () => {
      var url = "/followers/"+this.state.chain;
      fetch(url, {
        method: "GET", headers : {
          accept : "application/json"
        }}).then((res) => {
          if(res.ok) {
            return res.json();
          } return [];
        }).then(
          (json) => {
            this.setState({
              followers : json.data
            });        
        }).catch();
    });
  }

  changeUser(user){
    
  }

  render() {
    return (
      <div className="App">
        <div>
        <div className="navi">
          <Searchbox search={this.search.bind(this)}/>
          <FollowersChain history={this.state.chain} onUser={this.changeUser.bind(this)}/>
         </div>
         <div className="followers">
          <FollowersList followers={this.state.followers}/> 
         </div>
        </div>
      </div>
    );
  }
}

export default App;
