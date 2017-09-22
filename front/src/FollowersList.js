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
            return <Follower follow = {t} key={i}/>;
        });
    }
}

export default FollowersList;