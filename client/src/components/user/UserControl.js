import React, { Component } from 'react';
import './UserControl.css';
import LoginControl from '../login/LoginControl';
import SkillsControl from '../skills/SkillsControl';
import GroupControl from '../groups/GroupControl';
import MeetingControl from '../meeting/MeetingControl';

class EditUserInfoForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            gen_first_name: this.props.user.first_name,
            gen_last_name: this.props.user.last_name,
            first_name: this.props.user.first_name,
            last_name: this.props.user.last_name,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    
    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value
        });
    }

    handleEdit(event){
        const first_name = this.state.first_name;
        const last_name = this.state.last_name;
        if(first_name !== "" && last_name !== ""){
            if(first_name !== this.state.gen_first_name || last_name !== this.state.gen_last_name){
                this.props.onSuccessfulEdit({
                    user_name: this.props.user.user_name,
                    password: this.props.user.password,
                    first_name: first_name,
                    last_name: last_name,
                    campus: this.props.user.campus
                });
                this.setState({
                    gen_first_name: first_name,
                    gen_last_name: last_name
                });
            }
        }
        event.preventDefault();
    }

    render(){
        return(
            <div className="user_info">
                <h2>User Info</h2>
                <form onSubmit = {this.handleEdit}>
                    <label>
                        UserName:
                        <input type = "text" value = {this.props.user.user_name} readOnly="true"/>
                    </label>
                    <br/>
                    <label>
                        FirstName: 
                        <input name="first_name" type = "text" value = {this.state.first_name} onChange = {this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>
                        LastName: 
                        <input name="last_name" type = "text" value = {this.state.last_name} onChange = {this.handleInputChange}/>
                    </label>
                    <br/>
                    <label>
                        Campus: 
                        <input type = "text" value = {this.props.user.campus} readOnly="true"/>
                    </label>
                    <br/>
                    <input type="submit" value="Edit"/>
                </form>
            </div>
        );
    }
}

class UserControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            users:[],
            user_name:""
        }
        this.onSuccessfulLogin = this.onSuccessfulLogin.bind(this);
        this.onSuccessfulEdit = this.onSuccessfulEdit.bind(this);
    }

    onSuccessfulLogin(user){
        this.setState({user_name: user.user_name});
    }

    onSuccessfulEdit(user){
        //send to webserver and update the list of users
        const tmp = this.state.users.filter(u => user.user_name !== u.user_name);
        tmp.push(user);
        this.setState({
            users: tmp
        });
    }

    componentDidMount(){
        fetch('api/users', {

        });
        this.setState({
          //make api call to get users from the server
          users: [{user_name:"asabedia", password:"asdfas", first_name: "Ashkan", last_name: "Abedian", campus: "Waterloo", group_id: "1"}]
        });
    }
    render(){
        const user = this.state.users.find(u=> u.user_name === this.state.user_name);
        return(
            <div className = "user-dashboard">
                {this.state.user_name === "" && <LoginControl 
                                                        onSuccessfulLogin={this.onSuccessfulLogin} 
                                                        users = {this.state.users.map(user => ({user_name: user.user_name, password: user.password}))}
                                                />
                                                }
                {this.state.user_name !== "" && 
                    <div>
                        <h1>User Dashboard</h1>
                        <EditUserInfoForm user = {user} onSuccessfulEdit = {this.onSuccessfulEdit}/>
                        <MeetingControl user = {user}/>
                        <SkillsControl user = {user}/>
                        <GroupControl user={user}/>
                    </div>
                }
            </div>
        );
    }
}

export default UserControl;