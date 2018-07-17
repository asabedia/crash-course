import React, { Component } from 'react';
import './SkillTag.css'

class SkillTag extends Component{
    render(){
        return(
            <div className = "skill-tag" >
                <p>{this.props.skill_name}</p>
            </div>
        );
    }
}

export default SkillTag;