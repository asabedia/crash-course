import React, { Component } from 'react';
import './TopicControl.css';

class CreateTopicForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            skills: [],
            topic_name: ""
        }
        this.onHandleSkillChange = this.onHandleSkillChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value
        });
    }

    onHandleSubmit(event){
        const topic = {
            topic_name: this.state.topic_name,
            skills: this.state.skills
        }
        console.log(topic);
        this.props.onNewTopic(topic);
        event.preventDefault();
    }

    onHandleSkillChange(event){
        const skill_name = event.target.value;
        console.log(skill_name);
        this.setState({
            skills: [...this.state.skills, skill_name]
        });
    }

    render(){
        return(
            <div className = "create-topic">
                <form onSubmit = {this.onHandleSubmit}>
                    <label>
                        Topic Name:
                        <input onChange = {this.handleInputChange} name = "topic_name" type = "text" value = {this.state.topic_name}/>
                    </label>
                    <br/>
                    <label>
                        <strong>Skills:</strong>
                        {this.props.skills.map(skill => {
                            return(
                                <div key= {skill.skill_name} className = "skill-checkbox">
                                    <label key= {skill.skill_name}>
                                        {skill.skill_name}
                                        <input key={skill.skill_name} onChange = {this.onHandleSkillChange} name = "skills" type = "checkbox" value={skill.skill_name}/>
                                    </label>
                                    <br/>
                                </div>
                            );
                        })}
                    </label>
                    <br/>
                    <input type = "submit" value ="Create Topic"/>
                </form>
            </div>
        );
    }
}

class TopicControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            topics: []
        }
        this.onNewTopic = this.onNewTopic.bind(this);
    }

    onNewTopic(topic){
        this.setState({
            topics: [...this.state.topics, topic]
        });
    }

    render(){
        return(
            <div className="topic-control">
                <CreateTopicForm skills = {this.props.skills} onNewTopic = {this.onNewTopic}/>
            </div>
        );
    }
}

export default TopicControl;