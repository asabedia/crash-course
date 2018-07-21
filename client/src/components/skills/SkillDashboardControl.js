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
        fetch('http://localhost:8000/skills/counts?count=1', {credentials = 'same-origin'})
        .then(results => {
            console.log(results);
            return results.json();
        }).then(skill => skills.push(skill))
        .catch(err => console.log(err));

        let skill_aggregates = [];
        const unique_skills = new Set(skills.map(skill => skill.skill_name));
        unique_skills.forEach(skill_name=>{
            const want_skill = skills.find(skill => skill.skill_name === skill_name && skill.Wants_OR_Knows === "Wants");
            const know_skill = skills.find(skill => skill.skill_name === skill_name && skill.Wants_OR_Knows === "Knows");
            const know_count = know_skill.count;
            const want_count = want_skill.count;
            skill_aggregates.push({
                skill_name: skill_name,
                know_num: know_count,
                want_num: want_count
            });
        });
        this.setState({
            skill_aggregates: skill_aggregates
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