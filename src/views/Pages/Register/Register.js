import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { reject } from 'q';
import { Typeahead } from 'react-bootstrap-typeahead';
import { mockGetAllTeam } from '../../../data/fakedata';
import ajax from '../../../data/axiosConfig';

class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      account: '',
      name: '',
      password: '',
      confirmPassword: '',
      team: '',
      error: '',
      allTeams: []
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();

    if (!this.state.account.trim() || !this.state.password.trim()) {
      this.setState({ error: '帳號或密碼不得為空' });
    } else if (!this.state.name.trim()) {
      this.setState({ error: '請輸入姓名' });
    } else if (this.state.confirmPassword !== this.state.password) {
      this.setState({ error: '確認密碼與密碼不一致' });
    } else if (!this.state.team.trim()) {
      this.setState({ error: '請輸入欲加入隊伍' });
    } else {
      this.setState({ error: '' });
      const {confirmPassword, error, ...data} = this.state;

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      ajax.post('/register/', data, {headers})
      .then(res => {
        console.log('register response data: ', res.data);
        if (res.data.status === "success") {
          alert('註冊成功！');
          this.props.history.push('/login');
        }
        else if (res.data.status === "fail"){
          this.setState({ error: '此帳號已被其他用戶使用' });
        }
        else {
          return Promise.reject(new Error('Undefined response data!'));
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  onBackClick = (e) => {
    e.preventDefault();
    this.props.history.push('/login');
  }
  onAccountChange = (e) => {
    this.setState({ account: e.target.value });
  }
  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }
  onConfirmPasswordChange = (e) => {
    this.setState({ confirmPassword: e.target.value });
  }  
  onTeamChange = (team) => {
    // console.log(e);
    this.setState({ team });
    // this.setState({ team: e.target.value });
  }
  onTeamSelected = (selected) => {
    this.setState({ team: selected[0] });
  }

  componentDidMount() {
    // ajax get all team names
    ajax.post('/allTeam/')
    .then(res =>{
      console.log(res.data.allTeams);
      this.setState({ allTeams: res.data.allTeams ? res.data.allTeams : [] });
    })
    .catch(err => {
      console.log(err);
    });

    // for test
    // console.log(mockGetAllTeam);
    // this.setState({ allTeams: mockGetAllTeam.data.allTeams });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4 text-center">
                <CardBody className="p-4">
                  <Form onSubmit={this.onFormSubmit}>
                    <h1>創建 My Team 帳號</h1>
                    <p className="text-muted">成為球隊管理員</p>
                    <InputGroup className="my-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text" placeholder="帳號" autoComplete="username"
                        value={this.state.account} onChange={this.onAccountChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text" placeholder="姓名" autoComplete="name"
                        value={this.state.name} onChange={this.onNameChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password" placeholder="密碼" autoComplete="new-password"
                        value={this.state.password} onChange={this.onPasswordChange}  
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password" placeholder="確認密碼" autoComplete="new-password"
                        value={this.state.confirmPassword} onChange={this.onConfirmPasswordChange}  
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-star"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* <Input
                        type="text" placeholder="球隊" autoComplete="organization"
                        value={this.state.team} onChange={this.onTeamChange}
                      /> */}
                      <Typeahead
                        onInputChange={this.onTeamChange}
                        onChange={this.onTeamSelected}
                        options={this.state.allTeams}
                        placeholder="球隊"
                        emptyLabel="註冊以新增球隊並成為管理員"
                      />
                    </InputGroup>
                    {this.state.error && <p className="text-danger">{this.state.error}</p>}
                    <Button
                      color="primary" style={{width: '8em', marginRight: '0.5em'}}
                      onClick={this.onBackClick}
                    >返回登入頁面</Button>
                    <Button
                      color="success" style={{width: '8em', marginLeft: '0.5em'}}
                      className="d-inline"
                    >註冊</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
