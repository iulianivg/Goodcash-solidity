import React, {Component} from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Countdown from 'react-countdown-now';
import {Grid, Paper, Badge, Button, Tooltip} from '@material-ui/core'
import './App.css';


firebase.initializeApp({
  apiKey:"getfromfirebase",
  authDomain:"getfromfirebase",
  databaseURL: "getfromfirebase

})


class App extends Component {
  state={
    isSignedIn:false,
    account:'',
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: '#',
    privacyPolicyUrl: function() {
      window.location.assign('#');
    },
    callbacks:{
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!!user})
    });
  //   firebase.database().ref(`userPool/username`).once('value').then(snapshot => {
  //     const account = snapshot.val();
  //     this.setState({account:account});
      
  // });


    // const account = firebase.database().ref(`userPool/username`);
    // this.setState({account:account});


  }


  logOut = () => {
    firebase.auth().signOut();
  }

  renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <p>Done</p>;
    } else {
      // Render a countdown
      return <span>{days} days {hours} hours {minutes} minutes {seconds} seconds remaining</span>;
    }
  };

  render(){
  return (
    <div className="App">
    <h2 style={{textAlign:'center'}}>Goodcash</h2>
    
      {this.state.isSignedIn ?
      <div>
        <div style={{textAlign:'center'}}>
        <h3 >Welcome to Goodcash, {firebase.auth().currentUser.displayName} :)</h3>
        <Button onClick={this.logOut} variant="outlined" color="primary">
        
        Log out
        </Button>
        </div>
        {/* TO DO: to not display photo if user has logged in with email */}
        <hr />
        <div style={{textAlign:'center'}}>
        {/* <Paper>
        <p>Vote your favorite logo</p>
        </Paper>
        <Paper>
        <p>Vote your favorite tagline</p>
        </Paper>
        <Paper>
        <p>Vote your favorite blog post</p>
        </Paper> */}
        <Grid container spacing={24} style={{width:'100%'}}>
          <Grid item sm={12} xs={12}>
          <Badge color="secondary" badgeContent={"2500 GCASH"}>
          <a href="/Logo-vote" style={{color:'black',textDecoration:'none'}} authenticated={{text:this.state.account}}>
        <Paper elevation={4} style={{width:'28rem'}}>
          <p>Vote your favourite logo</p>
          <Countdown date={'Mon, 10 Jun 2019 01:02:03'} renderer={this.renderer} >
        <p>Hey!!</p>
        </Countdown>
        </Paper>
        </a>
        </Badge>
          </Grid>


          <Grid item sm={12} xs={12}>
          <Badge color="secondary" badgeContent={"1500 GCASH"}>
        <Paper elevation={4} style={{width:'28rem'}}>
          <p>Vote your favourite tagline</p>
          <Countdown date={'Mon, 10 Jun 2019 01:02:03'} renderer={this.renderer} >
        <p>Hey!!</p>
        </Countdown>
        </Paper>
        </Badge>
          </Grid>


          <Grid item sm={12} xs={12}>
          <Badge color="secondary" badgeContent={"800 GCASH"}>
        <Paper elevation={4} style={{width:'28rem'}}>
          <p>Vote your favourite blog post</p>
          <Countdown date={'Mon, 10 Jun 2019 01:02:03'} renderer={this.renderer} >
        <p>Hey!!</p>
        </Countdown>
        </Paper>
        </Badge>
          </Grid>

          <Grid item sm={12} xs={12}>
          <Badge color="secondary" badgeContent={"42.0 GCASH"}>
        <Paper elevation={4} style={{width:'28rem'}}>
          <p>Vote your favourite joke</p>
          <Countdown date={'Mon, 10 Jun 2019 01:02:03'} renderer={this.renderer} >
        <p>Hey!!</p>
        </Countdown>
        </Paper>
        </Badge>
          </Grid>


        </Grid>
        


        </div>
        </div>
        :
        <div style={{textAlign:'center'}}>
          <p>Sign in, make a community contribution and earn GCASH</p>
    <a href="/">Learn more.</a>
        <StyledFirebaseAuth
        uiConfig={this.uiConfig}
        firebaseAuth={firebase.auth()}
        />
        </div>
    }
    </div>
  );
}
}

export default App;
