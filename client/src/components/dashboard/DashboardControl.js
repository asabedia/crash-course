import React, { Component } from 'react';
import SkillDashboardControl from '../skills/SkillDashboardControl';
import CampusControl from '../campus/CampusControl';
import './DashboardControl.css'

class DashboardControl extends Component{
    render(){
        return(
            <div className = "dashboard">
                <h1>Global Dashboard</h1>
                <SkillDashboardControl/>
                <CampusControl/>
            </div>
        );
    }
}

export default DashboardControl;