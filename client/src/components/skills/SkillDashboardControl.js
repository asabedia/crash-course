import React, { Component } from 'react';
import './SkillDashboardControl.css'

class SkillsAggregateTable extends Component{
    render(){
        const rows = [];
        this.props.skill_aggregates.forEach(aggregate => {
            rows.push(
                <tr key={aggregate.skill_name}>
                    <td>{aggregate.skill_name}</td>
                    <td>{aggregate.know_num}</td>
                    <td>{aggregate.want_num}</td>
                </tr>
            );
        });
        return(
            <div className="skill-aggregates">
                <h2>Skills Summary</h2>
                <div className="skill-aggregates-table">
                <table>
                    <thead>
                        <tr>
                            <th>Skill Name</th>
                            <th># of Know</th>
                            <th># of Want</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
            </div>
        );
    }
}

class SkillDashboardControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            skill_aggregates:[]
        }
    }

    componentDidMount(){
        //fetch skill aggregates from web server
        let skills = [];
        fetch('/skills/counts')
        .then(results => {
            return results.json();
        }).then(skill => skills.push(skill));
        this.setState({
            skill_aggregates: skills
        });
    }

    render(){
        return(
            <div className = "skill-dashboard">
                <SkillsAggregateTable skill_aggregates = {this.state.skill_aggregates}/>
            </div>
        );
    }
}

export default SkillDashboardControl;