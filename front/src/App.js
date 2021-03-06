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
      usuario : "",
    };
  }

  componentDidMount(){
    
  }

  search(user){
    if(this.state.chain.length == 0){
      this.setState({
        usuario : user,
        chain : this.state.chain.concat(user)
      }, () => {
        var url = "/followers/"+this.state.usuario;
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
    } else {
      this.setState({chain : []},
        () => { this.setState({
        usuario : user,
        chain : this.state.chain.concat(user)
      }, () => {
        var url = "/followers/"+this.state.usuario;
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
    });
    }
  }

  searchOnClick(user){
    this.setState({
      usuario : user,
      chain : this.state.chain.concat(user)
    }, () => {
      var url = "/followers/"+this.state.usuario;
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
    var userEl = user.split(" ");
    this.setState({
      usuario : userEl[1],
      chain : this.state.chain.slice(0, userEl[0]+1)
    }, () => {
      var url = "/followers/"+this.state.usuario;
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

  render() {
    return (
      <div className="App">
        <div>
        <div className="navi">
          <Searchbox search={this.search.bind(this)}/>
          <FollowersChain history={this.state.chain} onUser={this.changeUser.bind(this)}/>
         </div>
         <div className="followers">
          <FollowersList searchAgain={this.searchOnClick.bind(this)}followers={this.state.followers}/> 
         </div>
        </div>
      </div>
    );
  }
}

export default App;
