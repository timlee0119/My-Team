import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import ajax from '../../../data/axiosConfig';

class Login extends Component {
  constructor(props) {
    super(props);

    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onAccountChange = this.onAccountChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.state = {
      account: '',
      password: '',
      error: ''
    };
  }

  onLoginSubmit(e) {
    e.preventDefault();
    if (!this.state.account.trim() || !this.state.password.trim()) {
      this.setState({ error: '帳號或密碼不得為空' });
    } else {
      this.setState({ error: '' });
      const { error, ...data } = this.state;
      ajax.post('/login/', data)
      .then(res => {
        console.log('login response data', res.data);
        // const res = { status: "OK" };
        if (res.data.status === "success") {
          // redirect to main page
          this.props.history.push('/team-info');

          // store account in local storage
          localStorage.setItem('account', this.state.account);
        } else {
          this.setState({ error: '帳號或密碼錯誤' });
        }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
  onAccountChange(e) {
    this.setState({ account: e.target.value });
  }
  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onLoginSubmit}>
                      <h1>登入</h1>
                      <p className="text-muted">登入以進入My Team</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="帳號"
                          autoComplete="username"
                          value={this.state.account}
                          onChange={this.onAccountChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="密碼"
                          autoComplete="current-password"
                          value={this.state.password}
                          onChange={this.onPasswordChange}
                        />
                      </InputGroup>
                      {this.state.error && <p className="text-danger">{this.state.error}</p>}
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">忘記密碼</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-xs-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>註冊</h2>
                      <h6 className="mt-3">現在註冊My Team，開始管理你的球隊！</h6>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
