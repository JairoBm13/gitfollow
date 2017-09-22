import React, {Component} from "react";

class CommentList extends Component {

    constructor(props){
        super(props);
    }

    renderTweets(){
        return this.props.comments.map((t, i) => {
            console.log(t);
            return <div key={i}>{t}</div>;
        });
    }

    render(){
        return (<div>
                    {this.renderTweets()}
                </div>);
    }
}

export default CommentList;