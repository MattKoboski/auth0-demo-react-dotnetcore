import React, { Component } from 'react';
import { Alert, Button, Container, Row, Col } from 'react-bootstrap';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      responseStatus: 0,
      result: {}
    };
  }

  login() {
    this.props.auth.login();
  }

  async get() {
    const response = await fetch('https://localhost:5001/api/values');
    this.setState({
      responseStatus: response.status,
      result: {}
    });
    if (response.ok) {
      const result = await response.json();
      this.setState({
        result
      })
    }
  }

  async post() {
    const { getAccessToken } = this.props.auth;
    let token = getAccessToken();
    const body = {
      person: {
        name: 'Marcin'
      }
    };
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    };
    const response = await fetch('https://localhost:5001/api/values', settings);
    this.setState({
      responseStatus: response.status,
      result: {}
    });
    if (response.ok) {
      const result = await response.json();
      this.setState({
        result
      })
    }
  }

  async delete() {
    const { getAccessToken } = this.props.auth;
    let token = getAccessToken();
    const settings = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await fetch('https://localhost:5001/api/values/1', settings);
    this.setState({
      responseStatus: response.status,
      result: {}
    });
    console.log(response)
    if (response.ok) {
      const result = await response.json();
      this.setState({
        result
      })
    }
  }

  render() {
    const responseStatus = this.state.responseStatus;
    const result = this.state.result;
    const { isAuthenticated, getAccessToken, getIdToken } = this.props.auth;
    return (
      <Container>
        {isAuthenticated() && (
          <Row>
            <Col>AccessToken: {getAccessToken()}</Col>
            <Col>IdToken: {getIdToken()}</Col>
          </Row>
        )}
        <Row>
          <Col>
            <Button
              id="qsLoginBtn"
              variant="primary"
              className="btn-margin"
              onClick={this.get.bind(this)}
              >
                Get
            </Button>
          </Col>
          <Col>
            <Button
              id="qsLoginBtn"
              variant="primary"
              className="btn-margin"
              onClick={this.post.bind(this)}
              >
                Post
            </Button>
          </Col>
          <Col>
            <Button
              id="qsLoginBtn"
              variant="primary"
              className="btn-margin"
              onClick={this.delete.bind(this)}
              >
                Delete
             </Button>
          </Col>
        </Row>
        {responseStatus === 200 && (
          <Alert variant="success">
            {responseStatus} OK
          </Alert>
        )}
        {responseStatus === 401 && (
          <Alert variant="danger">
            {responseStatus} Unauthorized
          </Alert>
        )}
        {responseStatus === 403 && (
          <Alert variant="warning">
            {responseStatus} Forbidden
          </Alert>
        )}
        <div><pre>{JSON.stringify(result, null, 2) }</pre></div>
      </Container>
    );
  }
}

export default Home;
