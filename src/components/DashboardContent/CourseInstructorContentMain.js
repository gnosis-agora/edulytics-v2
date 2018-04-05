import React, { Component } from 'react';
import { Grid, Statistic, Card, Loader } from 'semantic-ui-react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import StudentHistogram from './StudentVisuals/StudentHistogram';
import TotalStudents from './CourseInstructorVisuals/TotalStudents';
import AverageLevelsCompleted from './CourseInstructorVisuals/AverageLevelsCompleted';
import AssignmentTracker from './StudentVisuals/AssignmentTracker/AssignmentTracker';
/*
  This is the main template for each of the dashboard we will do.
  This file is only to be changed if:
    - Changes are needed for the general dashboard layout

  For more info on Grids, link is here: https://react.semantic-ui.com/collections/grid#grid-example-divided-number
*/

class CourseInstructorContentMain extends Component {
  componentDidUpdate(){
    if (this.props.courseId === undefined && this.props.fetchChartsDatabaseStatus === "FETCHED"){
      for (var course in this.props.chartsDatabase.CourseInstructor.averageLevels["data"]){
          if (this.props.staticDatabase.CourseList[course]["instructorId"] == this.props.userId){
            var courseId = course;
            break;
          }
      }
      this.props.changeToCoursePage(this.props.userId, courseId);
    }
  }

  render(){
    return (
      <div style={{"backgroundColor": "#F2F2F2"}}>
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
          <Card>
            <StudentHistogram chartsDatabase={this.props.fetchChartsDatabaseStatus === "FETCHED" ? this.props.chartsDatabase : {}}/>
          </Card>
          <Card>
            {this.props.fetchChartsDatabaseStatus === "FETCHED" ?
              <AssignmentTracker chartsDatabase={this.props.chartsDatabase} userId={this.props.userId} /> :
              <Loader active inline='centered'/>
            }
          </Card>
          <Grid.Column>
            <Card
              header={this.props.fetchChartsDatabaseStatus === "FETCHED" ? this.props.userNames[this.props.userId] : "loading"}
              meta='Friend'
              description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
            />
          </Grid.Column>
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
  changeToCoursePage: (userId, courseId) => push("/CourseInstructor/" + userId + "/" + courseId),
}, dispatch)

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CourseInstructorContentMain)