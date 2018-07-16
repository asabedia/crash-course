import React, { Component } from 'react';
import './SkillsControl.css';

class KnownSkillsTable extends Component{
    render(){
        const rows = [];
        this.props.known.forEach(knownSkill => {
            rows.push(
                <tr key= {knownSkill.skill_name}>
                    <td>{knownSkill.skill_name}</td>
                    <td><button onClick={() => this.props.onSkillDelete({type: "known", skill_name: knownSkill.skill_name})}>Remove</button></td>
                </tr>
            )
        });
        return(
            <div className="known-skills-table">
                <table>
                    <thead>
                        <tr>
                            <th>Known Skills</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        )
    }
}

class WantSkillsTable extends Component{
    render(){
        const rows = [];
        this.props.want.forEach(wantedSkill => {
            rows.push(
                <tr key= {wantedSkill.skill_name}>
                    <td>{wantedSkill.skill_name}</td>
                    <td><button onClick={() => this.props.onSkillDelete({type: "want", skill_name: wantedSkill.skill_name})}>Remove</button></td>
                </tr>
            )
        });
        return(
            <div className="wanted-skills-table">
                <table>
                    <thead>
                        <tr>
                            <th>Wanted Skills</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        )
    }
}

class SkillsForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            want: "",
            know: ""
        }
        this.handleNewWant = this.handleNewWant.bind(this);
        this.handleNewKnown = this.handleNewKnown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value
        });
      }

    handleNewWant(event){
        this.props.onNewWantSkill({skill_name: this.state.want});
        event.preventDefault();
    }

    handleNewKnown(event){
        this.props.onNewKnowSkill({skill_name: this.state.know});
        event.preventDefault();
    }

    render(){
        return(
            <div className = "skills-form">
            <h2>Skills</h2>
                <form onSubmit={this.handleNewWant}>
                    <label>
                        Want to Learn:
                        <input type="text" name="want" value = {this.state.want} onChange = {this.handleInputChange}/>
                    </label>
                    <input type="submit" value="+"/>
                </form>
                <form onSubmit={this.handleNewKnown}>
                    <label>
                        Know:
                        <input type="text" name="know" value = {this.state.know} onChange = {this.handleInputChange}/>
                    </label>
                    <input type="submit" value="+"/>
                </form>
            </div>
        );
    }
}

class SkillsControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            know: [],
            want: []
        }
        this.onNewKnowSkill = this.onNewKnowSkill.bind(this);
        this.onNewWantSkill = this.onNewWantSkill.bind(this);
        this.onSkillDelete = this.onSkillDelete.bind(this);
    }

    componentDidMount(){
        this.setState({
            know: [{skill_name: "java"}, {skill_name: "python"}],
            want: [{skill_name: "node"}, {skill_name: "react"}]
        });
    }

    onNewWantSkill(skill){
        const includes = this.state.want.filter(s => s.skill_name === skill.skill_name).length>0;
        if(!includes){
            this.setState({
                want: [...this.state.want, skill]
            });
            //send to database backend will deal with global duplication
        }
    }

    onNewKnowSkill(skill){
        const includes = this.state.know.filter(s => s.skill_name === skill.skill_name).length>0;
        if(!includes){
            this.setState({
                know: [...this.state.know, skill]
            });
            //send to database backend will deal with global duplication
        }
    }

    onSkillDelete(deleteEvent){
        const type = deleteEvent.type;
        if(type === "known"){
            //send to server and update live
            const nameToBeDeleted = deleteEvent.skill_name;
            const newKnowList = this.state.know.filter(skill => skill.skill_name !== nameToBeDeleted);
            this.setState({
                know: newKnowList
            });
        }else if(type === "want"){
            //send to server and update live
            const nameToBeDeleted = deleteEvent.skill_name;
            const newWantList = this.state.want.filter(skill => skill.skill_name !== nameToBeDeleted);
            this.setState({
                want: newWantList
            });
        }
    }

    render(){
        return(
            <div className = "skills">
                    <SkillsForm onNewKnowSkill = {this.onNewKnowSkill} onNewWantSkill = {this.onNewWantSkill}/>
                    <KnownSkillsTable known = {this.state.know} onSkillDelete = {this.onSkillDelete}/>
                    <WantSkillsTable want = {this.state.want} onSkillDelete = {this.onSkillDelete}/>
            </div>
        );
    }
}

export default SkillsControl;