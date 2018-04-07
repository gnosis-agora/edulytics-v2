import React, { Component } from 'react';
import { Grid, Statistic, Card, Loader, Header } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import StudentHistogram from './StudentVisuals/StudentHistogram';
import TotalStudents from './CourseInstructorVisuals/TotalStudents';
import Leaderboard from './CourseInstructorVisuals/Leaderboard'
import AverageLevelsCompleted from './CourseInstructorVisuals/AverageLevelsCompleted';
import AverageTimePerLevel from './CourseInstructorVisuals/AverageTimePerLevel';
import SubmissionByHour from './CourseInstructorVisuals/SubmissionByHour';
import AssignmentTracker from './StudentVisuals/AssignmentTracker/AssignmentTracker';
/*
  This is the main template for each of the dashboard we will do.
  This file is only to be changed if:
    - Changes are needed for the general dashboard layout

  For more info on Grids, link is here: https://react.semantic-ui.com/collections/grid#grid-example-divided-number
*/

class CourseInstructorContentMain extends Component {
  render(){
    return (
      <div style={{"backgroundColor": "#F2F2F2", "padding": "3em"}}>
      {this.props.courseId !== undefined && this.props.fetchStaticDatabaseStatus === "FETCHED" ?
        <h1>{this.props.staticDatabase.CourseList[this.props.courseId]["name"]}</h1> :
        <Loader active inline='centered'/>
      }
      
        <Grid columns={3} doubling as={Card.Group} >
          <Card>  
            <Statistic label='Elo Rating' value='5,550' />
          </Card>
          <Card>
            {this.props.fetchChartsDatabaseStatus === "FETCHED" ?
              <TotalStudents staticDatabase = {this.props.staticDatabase} chartsDatabase={this.props.chartsDatabase} userId={this.props.userId} courseId={this.props.courseId}/> :
              <Loader active inline='centered'/>
            }
          </Card>
          <Card>
            {this.props.fetchChartsDatabaseStatus === "FETCHED" ?
              <AverageLevelsCompleted staticDatabase={this.props.staticDatabase} chartsDatabase={this.props.chartsDatabase} userId = {this.props.userId} courseId={this.props.courseId}/> :
              <Loader active inline='centered'/>
            }
          </Card>           
        </Grid>
        <Grid columns={2} doubling stackable as={Card.Group} >
          <Grid.Column width={13}>
            <Card fluid>
              {this.props.fetchChartsDatabaseStatus === "FETCHED" ?
                <div>
                <Header as="h1" textAlign="center">Average Time Taken Per Level</Header>
                <AverageTimePerLevel chartsDatabase={this.props.chartsDatabase} userId={this.props.userId} courseId={this.props.courseId} />
                </div> :
                <Loader active inline='centered'/>
              }
            </Card>
          </Grid.Column>
          <Grid.Column width={3}>
            <Card fluid>
              {this.props.fetchChartsDatabaseStatus === "FETCHED" ?
                <div style={{"padding":"1em"}}>
                <Header as="h1" textAlign="center">Leaderboard</Header>
                <Leaderboard courseId = {this.props.courseId} />
                </div> :
                <Loader active inline='centered'/>
              }
            </Card>
          </Grid.Column>
        </Grid>
        <Grid>
          <Card fluid>
            {this.props.fetchChartsDatabaseStatus === "FETCHED" ?
              <div>
              <Header as="h1" textAlign="center">Average Submission Times By Hour</Header>
              <SubmissionByHour chartsDatabase={this.props.chartsDatabase} courseId={this.props.courseId} />
              </div> :
              <Loader active inline='centered'/>
            }
          </Card>
        </Grid>
      </div>
      )
  }
  }

const mapStateToProps = state => ({
  userNames:state.firebase.staticDatabase.UserNames,
  fetchChartsDatabaseStatus: state.firebase.fetchChartsDatabaseStatus,
  fetchStaticDatabaseStatus: state.firebase.fetchStaticDatabaseStatus,
  chartsDatabase: state.firebase.chartsDatabase,
  staticDatabase: state.firebase.staticDatabase
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CourseInstructorContentMain)