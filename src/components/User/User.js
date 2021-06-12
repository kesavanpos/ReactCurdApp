import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import List from '../User/List';
import Navbar from 'react-bootstrap/Navbar'
import InternalServer from '../ErrorPages/InternalServer';

const User = (props) => {

  return (
    
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
        <div className="container">
          <Navbar.Brand href="/">User Management</Navbar.Brand>
          </div>
        </Navbar>
        <Switch>
          <Route path="/" render={(props) => <List {...props} />} />
          <Route path="/500" component={InternalServer} />
        </Switch>
      </BrowserRouter>
  )
}


export default User;

