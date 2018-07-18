import React, { Component } from 'react';
import './UserInfo.css';
import SkillTag from '../skills/SkillTag';

class UserInfo extends Component{
    render(){
        const knownListItems = this.props.user.known.map(known => {
            return(
                <li key={known.skill_name}>
                    <SkillTag skill_name = {known.skill_name}/>
                </li>
            );
        });

        const wantListItems = this.props.user.want.map(want => {
            return(
                <li key={want.skill_name}>
                    <SkillTag skill_name = {want.skill_name}/>
                </li>
            );
            
        });
        return(
            <div className = "user-info">
                <p><strong>Username: </strong> {this.props.user.user_name}</p>
                <p><strong>First Name: </strong> {this.props.user.first_name}</p>
                <p><strong>Last Name: </strong>{this.props.user.last_name}</p>
                <h4>Known Skills</h4>
                <ul>{knownListItems}</ul>
                <h4>Wanted Skills</h4>
                <ul>{wantListItems}</ul>
            </div>
        );
    }
}

export default UserInfo;