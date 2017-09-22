import React, {Component} from "react";

class Follower extends Component{

    render(){
        return (<div>{this.props.follow.login + " " + this.props.follow.avatar_url + " "}</div>);
    }
}

export default Follower;