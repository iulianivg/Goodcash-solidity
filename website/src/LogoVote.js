import React, {Component} from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Button} from '@material-ui/core';
import {Link} from 'react-router-dom';


  
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
    
      async componentDidMount () {
        await firebase.auth().onAuthStateChanged(user => {
          this.setState({isSignedIn:!!user})
        });
         
        // const { fromHome } = this.props.location.state || {};
        // this.setState({isSignedIn:fromHome});
    }


      

    logOut = () => {
    firebase.auth().signOut();
    this.setState({isSignedIn:false})
  }

    render(){
        return (
            <div>   

<Link style={{color:'black',textDecoration:'none'}} to={{
              pathname: '/',
            }}>
              
                <h2 style={{textAlign:'center'}}>GoodCash</h2>
                </Link>
                    {this.state.isSignedIn ? 
                         <div>
                         <div style={{textAlign:'center'}}>
                         <h3 >Welcome to GoodCash, {firebase.auth().currentUser.displayName} :)</h3>
                         
                         <Button onClick={this.logOut} variant="outlined" color="primary">
                         
                         Log out
                         </Button>
                         
                         </div>
                         <hr />
                         <div style={{textAlign:'center'}}>
                         <h4>Vote a logo or <Link to={{pathname:'/Logo-submit'}}>submit one</Link> to have a chance in winning 2500 GCASH </h4>
                         <a href="#" style={{ color:'grey'}}>Learn more about prize distribution</a>
                         </div>
                         </div>
                         :
                      //   : <Redirect
                      //   to={{
                      //     pathname: "/",
                      //   }}
                      // />}
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
        )
    }
}


export default LogoVote;