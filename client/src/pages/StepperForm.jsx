import React, { PropTypes } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';


class StepperForm extends React.Component {
    
  constructor(props){
    super(props);
    this.state={
        finished: false,
        stepIndex: 0,
        error: "",
        user: {
            email: '',
            password: '',
            confirmPassword:'',
            twitter: '',
            facebook: '',
            googlePlus: '',
            firstName: '',
            lastName: '',
            phoneNumber: ''
        }
    }
      this.getStepContent=this.getStepContent.bind(this);
  }

  handleNext(){
    const {stepIndex, user} = this.state;      
      
      const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      
      if(stepIndex===0){
        if(user.email.match(emailPattern)){
            
            if((user.password.match(passwordPattern))&&(user.confirmPassword.match(passwordPattern))){
                if(user.password===user.confirmPassword){
                this.setState({
                    stepIndex: 1
                });
            }else{
                this.setState({
                    error: "Passwords are not equal"
                })
            }
            }else{
                this.setState({
                    error: "password must contain minimum eight characters, at least one letter and one number"
                })
            }
            

        }else{
            this.setState({
                error: "Invalid email address"
            });
        }  
      }else if(stepIndex===1){
          if(((!user.twitter)||user.twitter.match(emailPattern))&&((!user.facebook)||user.facebook.match(emailPattern))&&((!user.googlePlus)||user.googlePlus.match(emailPattern))){
              this.setState({
                  stepIndex: 2
              })
          }else{
              this.setState({
                  error: "Invalid credentials"
              })
          }
          
      }else if(stepIndex===2){
          const phonePattern = /^\d{10}$/,
                namePattern = /^[a-z ,.'-]+$/i;
          if(user.firstName.match(namePattern)&&user.lastName.match(namePattern)&&user.phoneNumber.match(phonePattern)){
              this.setState({
                  finished: true
              })
          }else{
              this.setState({
                  error: "Invalid input"
              })
          }
          
      }
  };

  handlePrev(){
    const {stepIndex} = this.state;  
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1, error:""});
    }
  };
   
  onChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user,
      error:""        
    });
  }
    
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (<form className="form">
      <h2 className="card-heading">Create your account</h2>

         <p style={{display: "block", padding:"0 20px", height: "20px", color: "red"}}>{this.state.error}</p>
         <div className="fields">
          <TextField
          hintText="Email"
          floatingLabelFixed={true}
          floatingLabelText="Email"
          type="text"      
          name="email"
          onChange={this.onChange.bind(this)}
          value={this.state.user.email}
        />
          </div>
        
        <div className="fields">
            <TextField
          hintText="Password"
          floatingLabelFixed={true}
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={this.onChange.bind(this)}
          value={this.state.user.password}
        />
          </div>
          
          <div className="fields">
            <TextField
          hintText="Confirm Password"
          floatingLabelFixed={true}
          floatingLabelText="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={this.onChange.bind(this)}
          value={this.state.user.confirmPassword}
        />
          </div>
    </form>);
      case 1:
        return (<form className="form">
      <h2 className="card-heading">Social profiles</h2>

         <p style={{display: "block", padding:"0 20px", height: "20px", color: "red"}}>{this.state.error}</p>
         <div className="fields">
          <TextField
          hintText="Twitter"
          floatingLabelFixed={true}
          floatingLabelText="Twitter"
          type="text"      
          name="twitter"
          onChange={this.onChange.bind(this)}
          value={this.state.user.twitter}
        />
          </div>
        
        <div className="fields">
            <TextField
          hintText="Facebook"
          floatingLabelFixed={true}
          floatingLabelText="Facebook"
          type="text"
          name="facebook"
          onChange={this.onChange.bind(this)}
          value={this.state.user.facebook}
        />
          </div>
          
          <div className="fields">
            <TextField
          hintText="Google Plus"
          floatingLabelFixed={true}
          floatingLabelText="Google Plus"
          type="text"
          name="googlePlus"
          onChange={this.onChange.bind(this)}
          value={this.state.user.googlePlus}
        />
          </div>
    </form>);
      case 2:
        return (<form className="form">
      <h2 className="card-heading">Personal information</h2>

         <p style={{display: "block", padding:"0 20px", height: "20px", color: "red"}}>{this.state.error}</p>
         <div className="fields">
          <TextField
          hintText="First Name"
          floatingLabelFixed={true}
          floatingLabelText="First Name"
          type="text"      
          name="firstName"
          onChange={this.onChange.bind(this)}
          value={this.state.user.firstName}
        />
          </div>
        
        <div className="fields">
            <TextField
          hintText="Last Name"
          floatingLabelFixed={true}
          floatingLabelText="Last Name"
          type="text"
          name="lastName"
          onChange={this.onChange.bind(this)}
          value={this.state.user.lastName}
        />
          </div>
          
          <div className="fields">
            <TextField
          hintText="Mobile Number"
          floatingLabelFixed={true}
          floatingLabelText="Mobile Number"
          type="text"
          name="phoneNumber"
          onChange={this.onChange.bind(this)}
          value={this.state.user.phoneNumber}
        />
          </div>
    </form>);
      default:
        return 'Some Error happened! Refresh the page!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Select campaign settings</StepLabel>
          </Step>
          <Step>
            <StepLabel>Create an ad group</StepLabel>
          </Step>
          <Step>
            <StepLabel>Create an ad</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  window.location.reload();
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              <Card className="container">{this.getStepContent(stepIndex)}</Card>
              <div style={{marginTop: 12, padding: 50}}>
                {stepIndex!==0 && <RaisedButton
                  label="Previous"
                  onClick={this.handlePrev.bind(this)}
                  style={{marginRight: 12}}
                />}
                <RaisedButton
                  label={stepIndex === 2 ? 'Submit' : 'Next'}
                  primary={true}
                  onClick={this.handleNext.bind(this)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

StepperForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default StepperForm;