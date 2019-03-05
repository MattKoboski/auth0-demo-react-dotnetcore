import React, { Component } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated, getUserName } = this.props.auth;

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    variant="info"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    variant="warning"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out {getUserName()}
                  </Button>
                )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default App;
