import React, { Component } from 'react';
import TopicControl from '../topic/TopicControl';
import './MeetingControl.css';

class CreateMeetingForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            topic_name:"",
            skills:[],
            meeting_name: "",
            start_date:"",
            start_time:"",
            end_date:"",
            end_time:"",
            location: ""
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
        if(this.state.topic_name.trim() !== "" && this.state.start_date.trim() !== ""
            && this.state.meeting_name.trim() !== "" && this.state.start_time.trim() !== ""
            && this.state.location.trim() !== "" && this.state.end_date.trim() !== ""
            && this.state.end_time.trim() !== ""){
            const topic = {
                topic_name: this.state.topic_name,
                skills: this.state.skills
            }
            //send topic to db 
            const meeting = {
                topic: topic, 
                meeting_name: this.state.meeting_name,
                location: this.state.location,
                start_date_time: this.state.start_date + " " + this.state.start_time,
                end_date_time: this.state.end_date + " " + this.state.end_time
            };
            console.log(topic);
            this.props.onNewMeeting(meeting);
        }
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
            <div className = "create-meeting-form">   
                <h3>Create New Meeting</h3>
                <form onSubmit = {this.onHandleSubmit}>
                    <label>
                        Meeting Name:
                        <input  onChange = {this.handleInputChange} name = "meeting_name" type = "text"/>
                    </label>
                    <br/>
                    <label>
                        Topic Name:
                        <input onChange = {this.handleInputChange} name = "topic_name" type = "text" value = {this.state.topic_name}/>
                    </label>
                    <br/>
                    <label>
                        Location:
                        <input onChange = {this.handleInputChange} name = "location" type = "text" value = {this.state.locations}/>
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
                    <label>
                        Start Date:
                        <input  onChange = {this.handleInputChange} name = "start_date" type = "date"/>
                    </label>
                    <label>
                        Start Time:
                        <input  onChange = {this.handleInputChange} name = "start_time" type = "time"/>
                    </label>
                    <br/>
                    <label>
                        End Date:
                        <input  onChange = {this.handleInputChange} name = "end_date" type = "date"/>
                    </label>
                    <label>
                        End Time:
                        <input onChange = {this.handleInputChange}  name = "end_time" type = "time"/>
                    </label>
                    <br/>
                    <input type = "submit" value = "Create Meeting"/>
                </form>
            </div>
        );
    }
}

class MeetingsTable extends Component{
    render(){
        const rows = [];
        this.props.meetings.forEach(meeting => {
            rows.push(
                <tr key={meeting.id}>
                    <td>{meeting.title}</td>
                    <td>{meeting.topic_name}</td>
                    <td>{meeting.location}</td>
                    <td>{meeting.start}</td>
                    <td>{meeting.end}</td>
                </tr>
            );
        });
        return(
            <div className="upcoming-meetings">
                <h2>Upcoming Meetings</h2>
                <div className="meetings-table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Topic</th>
                            <th>Location</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
            </div>
        );
    }
}

class MeetingControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            meetings: []
        }
        this.onNewMeeting = this.onNewMeeting.bind(this);
    }

    onNewMeeting(meeting){
        //send meeting to db
        const meeting_with_group_id = {
            group_id: this.props.user.group_id,
            meeting_name: meeting.meeting_name,
            location: meeting.location,
            topic: meeting.topic,
            start_date_time: meeting.start_date_time, 
            end_date_time: meeting.end_date_time
        }
        console.log(meeting_with_group_id);
    }

    componentDidMount(){
        //make api call to server to fetch all meetings for user where date is in future
        //make api call to get all skills for user's group
        this.setState({
            meetings: [
                {id:"1", title: "Meeting One", topic_name: "Learning",location: "CPH 1234", start: "12:20:00 03/09/2018", end: "1:00:00 03/09/2018"},
                {id:"2", title: "Meeting Two", topic_name: "Learning Stuff",location: "CPH 1234", start: "12:20:00 04/09/2018", end: "1:00:00 04/09/2018"}]
        });
    }

    render(){
        return(
            <div className = "meeting">
                <MeetingsTable meetings = {this.state.meetings}/>
                <CreateMeetingForm onNewMeeting = {this.onNewMeeting} skills = {[{skill_name: "Java"},{skill_name: "Python"},{skill_name: "C#"}]}/>
            </div>
        );
    }
}

export default MeetingControl;