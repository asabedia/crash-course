import React, { Component } from 'react';
import './GroupControl.css';
import UserInfo from '../user/UserInfo';

class UngroupedUsers extends Component{
    render(){
        const listitems = this.props.ungrouped_users.map(user => {
            return(
                <li className="ungrouped-user-list-item" key = {user.user_name}>
                    <UserInfo user = {user}/>
                    <button onClick = {()=>this.props.onUserAddedToGroup(user)}>Add to Group</button>
                </li>
            );
        });
        return(
            <div className = "ungrouped-users">
            <h2>Ungrouped Users</h2>
            <ul>{listitems}</ul>
            </div>
        );
    }
}

class GroupMembersTable extends Component{
    render(){
        const rows = [];
        this.props.members.forEach(member => {
            rows.push(
                <tr key={member.user_name}>
                    <td>{member.user_name}</td>
                    <td>{member.first_name}</td>
                    <td>{member.last_name}</td>
                    <td><button onClick = {() => this.props.onUserRemovedFromGroup(member)}>Remove</button></td>
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
        this.onUserAddedToGroup = this.onUserAddedToGroup.bind(this);
        this.onUserRemovedFromGroup = this.onUserRemovedFromGroup.bind(this);
    }

    onUserAddedToGroup(user){
        //send post request to express server with new user_name and the group_id
        const new_member = {user_name: user.user_name, first_name: user.first_name, last_name: user.last_name};
        const tmp = this.state.users_in_campus.find(u=>u.user_name === user.user_name);
        const users_in_campus = this.state.users_in_campus.filter(u => user.user_name !== u.user_name);
        const new_user = {user_name: tmp.user_name, first_name: tmp.first_name, last_name: tmp.last_name, known: tmp.known, want: tmp.want, hasGroup: true};
        this.setState({
            members: [...this.state.members, new_member],
            users_in_campus: [...users_in_campus, new_user]
        });
    }

    onUserRemovedFromGroup(user){
        //send post request to server and update relationship tables
        const members = this.state.members.filter(m => m.user_name !== user.user_name);
        const tmp = this.state.users_in_campus.find(u=>u.user_name === user.user_name);
        const users_in_campus = this.state.users_in_campus.filter(u => user.user_name !== u.user_name);
        const new_user = {user_name: tmp.user_name, first_name: tmp.first_name, last_name: tmp.last_name, known: tmp.known, want: tmp.want, hasGroup: false};
        this.setState({
            members: members,
            users_in_campus: [...users_in_campus, new_user]
        });
    }

    componentDidMount(){
        //get group memebers from server using the username
            //need to find out what group the user is in and need all the members of that group
        //get all users who are in the same campus as this user and have no group
        const user_name = this.props.user.user_name;
        const campus = this.props.user.campus;

        this.setState({
            users_in_campus: [
                {user_name: "popqe", first_name: "Edgar", last_name: "Allen Po", known: [{skill_name: "writing"}, {skill_name: "reading"}], want: [{skill_name: "python"},{skill_name: "java"}], hasGroup: false},
                {user_name: "kirk", first_name: "Captain", last_name: "Kirk", known: [{skill_name: "piloting"}, {skill_name: "ships"}], want: [{skill_name: "dancing"},{skill_name: "bio"}], hasGroup: false}
            ]
        });

    }
    render(){
        const ungrouped_users = this.state.users_in_campus.filter(u=>!u.hasGroup);
        return(
            <div className = "group-control">
                {this.state.members.length>0 && <GroupMembersTable members = {this.state.members} onUserRemovedFromGroup = {this.onUserRemovedFromGroup}/>}
                {ungrouped_users.length > 0 && <UngroupedUsers onUserAddedToGroup = {this.onUserAddedToGroup} ungrouped_users = {ungrouped_users}/>}
            </div>
        );
    }
}

export default GroupControl;