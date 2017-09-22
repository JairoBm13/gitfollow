import React, {Component} from "react";

class FollowersChain extends Component {


    renderChain() {

    }

    handleClick(event){
        event.preventDefault();
        this.props.changeUser(event.currentTarget.textContent);
    }

    render(){
        return (<h3>{this.props.history.map((follower)=> { 
                 return (<p className="chain"><a onClick={this.handleClick.bind(this)}>{follower}</a><span> > </span></p>);
        })}</h3>);
    }
}

export default FollowersChain;