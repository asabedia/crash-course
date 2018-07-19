import React, { Component } from 'react';
import './MeetingControl.css';

class MeetingsTable extends Component{
    render(){
        const rows = [];
        this.props.meetings.forEach(meeting => {
            rows.push(
                <tr key={meeting.id}>
                    <td>{meeting.title}</td>
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
    }

    componentDidMount(){
        //make api call to server to fetch all meetings for user where date is in future
        this.setState({
            meetings: [
                {id:"1", title: "Meeting One", location: "CPH 1234", start: "12:20:00 03/09/2018", end: "1:00:00 03/09/2018"},
                {id:"2", title: "Meeting Two", location: "CPH 1234", start: "12:20:00 04/09/2018", end: "1:00:00 04/09/2018"}]
        });
    }

    render(){
        return(
            <div className = "meeting">
                <MeetingsTable meetings = {this.state.meetings}/>
            </div>
        );
    }
}

export default MeetingControl;