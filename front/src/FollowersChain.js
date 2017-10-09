import React, {Component} from "react";

class FollowersChain extends Component {

    handleClick(event){
        event.preventDefault();
        this.props.onUser(event.currentTarget.textContent);
    }

    render(){
        return (<h3>{this.props.history.map((follower, i)=> { 
                 return (<p className="chain" key={i}>
                     <a onClick={this.handleClick.bind(this)}>{i + " " +follower}</a>
                     <span> > </span></p>);
        })}</h3>);
    }
}

export default FollowersChain;