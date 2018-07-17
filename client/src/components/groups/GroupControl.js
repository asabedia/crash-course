import React, { Component } from 'react';
import './GroupControl.css';
import SkillTag from "../skills/SkillTag"

class GroupMembersTable extends Component{
    render(){
        const rows = [];
        this.props.members.forEach(member => {
            rows.push(
                <tr key={member.user_name}>
                    <td>{member.user_name}</td>
                    <td>{member.first_name}</td>
                    <td>{member.last_name}</td>
                </tr>
            );
        });
        return(
            <div className="group-members">
                <h2>Your Group Members</h2>
                <div className="group-members-table">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
            </div>
        );
    }
}

class GroupControl extends Component{
    constructor(props){
        super(props);
        this.state={
            members:[],
            users_in_campus:[]
        }
    }

    componentDidMount(){
        //get group memebers from server using the username
            //need to find out what group the user is in and need all the members of that group
        //get all users who are in the same campus as this user
        const user_name = this.props.user.user_name;
        const campus = this.props.user.campus;

        this.setState({
            members: [{user_name: "anantk", first_name: "Anant", last_name: "Kandadai"}
            ,{user_name: "jcho", first_name: "Jony", last_name: "Cho"}
            ,{user_name: "omurshid", first_name: "Osama", last_name: "Murshid"}],
            users_in_campus: [{},{},{}]
        });

    }
    render(){
        return(
            <div>
                <GroupMembersTable members = {this.state.members}/>
            </div>
        );
    }
}

export default GroupControl;