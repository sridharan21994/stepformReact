import React, { PropTypes } from 'react';
import StepperForm from './StepperForm.jsx';

class DashboardPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  

  render(){
    return(
        <div>
            <StepperForm/>
        </div>
        );
  }
}


DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DashboardPage;
