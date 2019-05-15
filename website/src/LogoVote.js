import React, {Component} from 'react';
import firebase from "firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {Grid, Paper, Badge, Button, Tooltip} from '@material-ui/core'


  
class LogoVote extends Component {

    state={
        isSignedIn:false,
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
    }

    render(){
        return (
            <div>   
                <a href="/" style={{color:'black',textDecoration:'none'}}>
                <h2 style={{textAlign:'center'}}>Goodcash</h2>
                </a>
                    {this.state.isSignedIn ? 
                         <div>
                         <div style={{textAlign:'center'}}>
                         <h3 >Welcome to Goodcash, {firebase.auth().currentUser.displayName} :)</h3>
                         <Button onClick={this.logOut} variant="outlined" color="primary">
                         
                         Log out
                         </Button>
                         
                         </div>
                         <hr />
                         <div style={{textAlign:'center'}}>
                         <h4>Vote a logo or <a href="/submit">submit one</a> to have a chance in winning 2500 GCASH </h4>
                         <a href="#" style={{ color:'grey'}}>Learn more about prize distribution</a>
                         </div>

                         {/* <Count actionDoText="do" actionDoneText="done" counterText="kudos" firebaseHost="https://fir-projecto-aa6b9.firebaseio.com" firebaseResourceId='kudos-counter'/> */}
                         </div>
                        : <p>Login</p>}
            
            </div>
        )
    }
}


export default LogoVote;