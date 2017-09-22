import React, {Component} from "react";

class Repos extends Component {

    renderRepos(){
        return this.props.repos.map((t, i) => {
            console.log(t);
            return <div key={i}>
                <div><a href={t.html_url}>Name: {t.name}</a></div>
                <div>Languaje: {t.language}</div></div>;
        });
    }


    render(){
        return (<div>
            {this.renderRepos()}
        </div>);
    }

}

export default Repos;