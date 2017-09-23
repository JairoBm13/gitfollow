import React, {Component} from "react";
import Follower from "./Follower.js";

class FollowersList extends Component {
    render(){
        return (<div>
            {this.renderFollowers()}
        </div>);
    }

    renderFollowers(){
        return this.props.followers.map((t, i) => {
            return <Follower change={this.changeSearch.bind(this)} follow = {t} key={i}/>;
        });
    }

    changeSearch(usuario){
        this.props.searchAgain(usuario);
    }
}

export default FollowersList;