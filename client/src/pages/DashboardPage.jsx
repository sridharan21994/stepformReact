import React, { PropTypes } from 'react';


class DashboardPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  

  render(){
    return(<p>Dashboard page...</p>);
  }
}


DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DashboardPage;
