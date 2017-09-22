import React, {Component} from "react";
import Repos from "./Repos.js";
import CommentList from "./CommentList.js";
import "./Follower.css";

class Follower extends Component{
    constructor(props){
        super(props);
        this.state = {
            repos : [],
            value: "",
            comments : [],
            show : false
        };
    }

    componentDidMount(){
        fetch("/getRepos/"+this.props.follow.login, {
            method: "GET", headers : {
              accept : "application/json"
            }}).then((res) => {
              if(res.ok) {
                return res.json();
              } return [];
            }).then(
              (json) => {
                  console.log(json);
                this.setState({
                  repos : json.data
                });        
            }).catch();
            fetch("/userComments/"+this.props.follow.id, {
                method: "GET", headers : {
                  accept : "application/json"
                }}).then((res) => {
                  if(res.ok) {
                    return res.json();
                  } return [];
                }).then(
                  (json) => {
                      console.log(json);
                    this.setState({
                      comments : json
                    });        
                }).catch();
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    changeShow(){
        this.setState({show : !this.state.show});
    }

    handleSubmit(){
        console.log("hat");
        fetch("/commentUser/"+this.props.follow.id, {
            method: "POST", headers : {
              accept : "application/json",
              "Content-Type" : "application/json"
            }, body : JSON.stringify({
                value : this.state.value
            })
          }).then((res)=>{
            if (res.ok){
                fetch("/userComments/"+this.props.follow.id, {
                    method: "GET", headers : {
                      accept : "application/json"
                    }}).then((res) => {
                      if(res.ok) {
                        return res.json();
                      } return [];
                    }).then(
                      (json) => {
                        this.setState({
                          comments : json
                        });        
                    }).catch();
            }
        });
    }

    render(){
        return (
        <div>
            <img className="profile" src={this.props.follow.avatar_url} alt={this.props.follow.login+" profile pic"}/>
            <div>{this.props.follow.login}</div>
            {this.state.repos && <Repos repos={this.state.repos} />}
            <form>
                <textarea value={this.state.value} onChange={this.handleChange.bind(this)} />
                <input type="button" value="comment user" onClick={this.handleSubmit.bind(this)}/>
            </form>
            {!this.state.show && <input type="button" value="show comments" onClick={this.changeShow.bind(this)}/>}
            {this.state.show && <input type="button" value="hide comments" onClick={this.changeShow.bind(this)}/>}
            {this.state.show && <CommentList comments={this.state.comments}/>}

        </div>);
    }
}

export default Follower;