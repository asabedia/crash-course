import React, { Component } from 'react';
import './CampusControl.css'


class CampusTable extends Component{
    render(){
        const rows = [];
        this.props.campuses.forEach(campus => {
            rows.push(
                <tr key={campus.id}>
                    <td>{campus.name}</td>
                    <td>{campus.address}</td>
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
                            <th>Address</th>
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
        this.setState({
            campuses: [
                {id: "1", name: "Waterloo", address: "12 University Ave"},
                {id: "2", name: "Laurier", address: "8 University Ave"},
                {id: "3", name: "UOFT", address: "123 University Ave"}]
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