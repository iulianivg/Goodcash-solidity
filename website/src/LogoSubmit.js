import React, {Component} from 'react';
import firebase from "firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { CircularProgress , Grid, Button, Paper} from '@material-ui/core';
import {Link} from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';


  
class LogoSubmit extends Component {

    state={
        isSignedIn:false,
        progress: false,
        progress2:false,
        userID:'',
        messageUpload:'',
        messageUpload2:'',
        imageUrl:'',
        imageUrl2:'',

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
          this.setState({isSignedIn:!!user, userID:user.uid});
          firebase.storage().ref(`logos/${this.state.userID}/picture2`).child("picture-2.png").getDownloadURL().then(url => this.setState({
            imageUrl:url
        }));
        firebase.storage().ref(`logos/${this.state.userID}/picture1`).child("picture-1.png").getDownloadURL().then(url => this.setState({
          imageUrl2:url
      }));
        });
        
    }

    logOut = () => {
        firebase.auth().signOut();
      }

    handleUploadStart = () => {
        this.setState({
            progress:true,
        })
        
    }
    handleUploadStart2 = () => {
      this.setState({
          progress2:true,
      })
      
  }

    handleUploadSucces = filename => {
        const messageUpload = "You have successfully uploaded the first logo. We wish you good luck and may the best win! You can now refresh the browser."
        this.setState({
            progress:false,
            messageUpload:messageUpload
            
        })
        
        /// used to read from DB
        // firebase.storage().ref('logos').child(filename).getDownloadURL().then(url => this.setState({
        //     imageUrl:url
        // }))
    }

    handleUploadSucces2 = filename => {
      const messageUpload = "You have successfully uploaded the second logo. We wish you good luck and may the best win! You can now refresh the browser."
      this.setState({
          progress2:false,
          messageUpload2:messageUpload
          
      })
      console.log(JSON.stringify(filename));
      /// used to read from DB
      
  }

    render(){
        return(
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
                                <p>Are you a talented designer? Create the logo for GoodCash and you can earn up to 2,500 GCASH if the community chooses your logo</p>
                                <a href="#" style={{ color:'grey'}}>Learn more about prize distribution</a>
                                <Grid container spacing={24} style={{width:'100%'}}>
                                <Grid item xs={1} sm={2} />
                                <Grid item xs={10} sm={8}>
                                <Paper>
                                <h4>Guidelines</h4>
                                <p>Create two high quality .PNG files of size 1200x800 with transparent backgrounds , one for the extended logo containing the full name "GoodCash", and one for the cryptocurrency containing the letters "GC".
                                    The second logo must follow the same characteristics / color scheme of the first logo and in should artistically lead the viewer 
                                    to the first logo. 
                                    Artists should create a piece of work that is memorable and easy to remember, worthy of representing GoodCash. Following minimalism as an art movement or theme is a 
                                    recommendation but not a requirement. The ideal logo doesn't use more than 2 colors or shades. 
                                </p>
                                <p style={{color:'red',fontWeight:'bold'}}>The user acknowledges that the design uploaded is theirs and doesn't infringe copyrights or trademarks of other entities. As a result of submission and based on the community choice, if user's logo is chosen,
                                    the user gives their explicit permission for the logo to be trademarked and used for business related purposes. 
                                </p>
                                <h4>Examples</h4>
                                <Grid container spacing={24}>
                                  <Grid item md>  <img src={require('./logos/1-accepted.png')} style={{width:'100%'}}/>
                                  <p style={{color:'green'}}>Accepted</p>
                                  </Grid>
                                  <Grid item md> <img src={require('./logos/2-denied - too many colors.png')} style={{width:'100%'}}/>
                                  <p><span style={{color:'red'}}>Denied</span>, too many colors used</p>
                                  </Grid>
                                  <Grid item md> <img src={require('./logos/3-denied.png')} style={{width:'100%'}}/>
                                  <p><span style={{color:'red'}}>Denied</span>, file 2 logo is unrelated to the first one</p>
                                   </Grid>
                                </Grid>

                                <Grid container spacing={24}>
                                  <Grid item md>  <img src={require('./logos/5-denied.png')} style={{width:'100%'}}/>
                                  <p><span style={{color:'red'}}>Denied</span>, background not transparent</p>
                                  </Grid>
                                  <Grid item md> <img src={require('./logos/6-denied.png')} style={{width:'100%'}}/>
                                  <p><span style={{color:'red'}}>Denied</span>, doesn't spell the name properly</p>
                                  </Grid>
                                  <Grid item md> <img src={require('./logos/7-accepted.png')} style={{width:'100%'}}/>
                                  <p><span style={{color:'green'}}>Accepted</span></p>
                                   </Grid>
                                </Grid>


                                </Paper>
                                </Grid>
                                <Grid item />
                                </Grid>
                                
                             </div>
                             <hr />
                             <div style={{textAlign:'center'}}>
                             <h4>Upload picture 1</h4>
                             <img src={this.state.imageUrl2} style={{width:'25rem'}}/>
                             <p>{this.state.progress}</p>
                             {this.state.progress ? <CircularProgress />: <span />}
                             <FileUploader 
                                accept="image/*"
                                name="image"
                                storageRef={firebase.storage().ref(`logos/${this.state.userID}/picture1`)}
                                filename="picture-1"
                                onUploadStart={this.handleUploadStart}
                                onUploadSuccess={this.handleUploadSucces}


                            />
                            <p>{this.state.messageUpload}</p>

                            <h4>Upload picture 2</h4>
                            <img src={this.state.imageUrl} style={{width:'25rem'}}/>

                            <p>{this.state.progress2}</p>
                             {this.state.progress2 ? <CircularProgress />: <span />}
                             <FileUploader 
                                accept="image/*"
                                name="image"
                                storageRef={firebase.storage().ref(`logos/${this.state.userID}/picture2`)}
                                filename="picture-2"
                                onUploadStart={this.handleUploadStart2}
                                onUploadSuccess={this.handleUploadSucces2}


                            />
                            <p>{this.state.messageUpload2}</p>
                            </div>
                         </div>
                         :
                         <p>Login</p>}
            </div>
        )
    }
}

export default LogoSubmit;