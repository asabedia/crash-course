import React, { Component } from 'react';
import SkillDashboardControl from '../skills/SkillDashboardControl';
import './DashboardControl.css'

class DashboardControl extends Component{
    render(){
        return(
            <div className = "dashboard">
                <h1>Global Dashboard</h1>
                <SkillDashboardControl/>
            </div>
        );
    }
}

export default DashboardControl;