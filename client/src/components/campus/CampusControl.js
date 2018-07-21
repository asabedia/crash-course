import React, { Component } from 'react';
import './CampusControl.css'


class CampusTable extends Component{
    render(){
        const rows = [];
        this.props.campuses.forEach(campus => {
            rows.push(
                <tr key={campus.id}>
                    <td>{campus.name}</td>
                </tr>
            );
        });
        return(
            <div className="campus">
                <h2>Campuses</h2>
                <div className="campus-table">
                <table>
                    <thead>
                        <tr>
                            <th>Campus</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
            </div>
        );
    }
}


class CampusControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            campuses : []
        }
    }

    componentDidMount(){
        //make api request to get list of all campuses
        let campuses = [];
        fetch('/campuses').then(results =>{
            console.log(results);
            return results.json();
        }).then(campus => campuses.push(campus))
        .catch(err => console.log(err));
        this.setState({
            campuses: campuses
        });
    }

    render(){
        return(
            <div className = "campus-dashboard">
                <CampusTable campuses = {this.state.campuses}/>
            </div>
        );
    }
}

export default CampusControl;