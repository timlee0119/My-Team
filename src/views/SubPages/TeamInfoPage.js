import React from 'react'
import {
  Row, Col, Button,
  Modal, ModalBody, ModalFooter, ModalHeader,
  Form, FormGroup, Label, Input
} from 'reactstrap';
import axios from 'axios';
import ajax from '../../data/axiosConfig';
import { mockGetTeam } from '../../data/fakedata';
import { UserStatusContext } from '../../data/userStatus-context';

class PlayerCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      readOnly: true,
      account: this.props.account ? this.props.account : "" ,
      name: this.props.name ? this.props.name : "",
      sid: this.props.sid ? this.props.sid : "",
      pid: this.props.pid ? this.props.pid : "",
      phoneNum: this.props.phoneNum ? this.props.phoneNum : "",
      birthdate: this.props.birthdate ? this.props.birthdate : "",
      size: this.props.size ? this.props.size : "",
      avatar: this.props.avatar ? this.props.avatar : "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/1200px-Jumpman_logo.svg.png"
    }
  }

  onToggle = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  }
  onUpdateClick = () => {
    this.setState({ readOnly: false });
  }
  onConfirmClick = () => {
    if (!this.state.readOnly) {
      // ajax update personal data
      const { modalOpen, readOnly, ...reqdata } = this.state;
      console.log(reqdata);
      ajax.post('/updatePlayerInfo/', reqdata)
      .then(res => {
        if (res.data.status === "success") {
          console.log('update info success');
        }
        else if (res.data.status === "fail") {
          return Promise.reject(new Error('update info fail!'));
        }
        else {
          return Promise.reject(new Error('undefined error!'));
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
    // this.setState({ modalOpen: !this.state.modalOpen });
    this.setState({ readOnly: true });
    this.onToggle();
  }
  onSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }
  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  }
  onSidChange = (e) => {
    this.setState({ sid: e.target.value });    
  }
  onPidChange = (e) => {
    this.setState({ pid: e.target.value });
  }
  onPhoneChange = (e) => {
    this.setState({ phoneNum: e.target.value });
  }
  onBirthdayChange = (e) => {
    this.setState({ birthdate: e.target.value });
  }

  render() {
    return (
      <Col xl="2" sm="4" xs="6">
        <div className="card border-secondary text-center">
          <img className="card-img-top" src={this.state.avatar} style={{height: "10rem"}} />
          <div className="card-body" style={{height: "5rem"}}>
            <h4 className="m-auto">{this.state.name}</h4>
          </div>
          <div className="card-footer">
            <Button color="primary" onClick={this.onToggle} style={{width:'6em'}}>個人資料</Button>
            <Modal isOpen={this.state.modalOpen} toggle={this.onToggle} className="modal-primary">
              <ModalHeader toggle={this.onToggle}>修改資料</ModalHeader>
              <ModalBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label>帳號名稱</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <p className="form-control-static">{this.state.account}</p>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">姓名</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        readOnly={this.state.readOnly} type="text" id="text-input" name="text-input"
                        value={this.state.name}
                        onChange={this.onNameChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">學號</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        readOnly={this.state.readOnly} type="text" id="text-input" name="text-input"
                        value={this.state.sid}
                        onChange={this.onSidChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">身份證字號</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        readOnly={this.state.readOnly} type="text" id="text-input" name="text-input"
                        value={this.state.pid}
                        onChange={this.onPidChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">手機號碼</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        readOnly={this.state.readOnly} type="text" id="text-input" name="text-input"
                        value={this.state.phoneNum}
                        onChange={this.onPhoneChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="date-input">生日</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        readOnly={this.state.readOnly} type="date" id="date-input" name="date-input" placeholder="date"
                        // value={"this.state.birthdate"}
                        value={this.state.birthdate}
                        onChange={this.onBirthdayChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="select">上衣尺寸</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        readOnly={this.state.readOnly} type="select" name="select" id="select"
                        value={this.state.size} onChange={this.onSizeChange}
                      >
                        <option value="M">M</option>
                        <option value="S">S</option>
                        <option value="XS">XS</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-input">個人照上傳</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input disabled={!this.props.enableUpdate} type="file" id="file-input" name="file-input" />
                    </Col>
                  </FormGroup>
                </Form>

              </ModalBody>
              <ModalFooter>
                {
                  this.state.readOnly ?
                  <Button
                    color="warning" style={{ width: '6em' }} className="ml-auto"
                    onClick={this.onUpdateClick} disabled={!this.props.enableUpdate}
                  >修改資料</Button>
                  :
                  <Button
                    color="danger" style={{ width: '6em' }} className="ml-auto"
                    onClick={()=>{this.setState({readOnly:true})}}
                  >放棄</Button>
                }
                <Button color="success" style={{ width: '6em' }} onClick={this.onConfirmClick}>
                  {this.state.readOnly ? '確認' : '更新'}
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      </Col>
    )
  }
}

export default class TeamInfoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      teamName: '',
      managerInfo: [],
      playerInfo: []
    }
  }

  getTeamInfo = () => {
    if (this.context.teamName !== "") {
      // console.log('teamName: ', this.context.teamName);
      ajax.post('/teamInfo/', { teamName: this.context.teamName })
      .then(res => {
        console.log('Team info: ', res.data);
        this.setState({ teamName: this.context.teamName });
        this.setState({ managerInfo: res.data.members.filter(({auth}) => auth === 1) });
        this.setState({ playerInfo: res.data.members.filter(({auth}) => auth === 0) });        
      })
      .catch(err => {
        console.log(err);
      })
    }
    else {
      setTimeout(this.getTeamInfo, 200);
    }
  }
  componentDidMount() {
    // ajax to get data
    this.getTeamInfo();

    // for test
    // this.setState({ teamName: this.context.teamName });
    // this.setState({ managerInfo: mockGetTeam.data.members.filter(({auth}) => auth === 1) });
    // this.setState({ playerInfo: mockGetTeam.data.members.filter(({auth}) => auth === 0) });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <h2 className="my-2">球隊名稱</h2>
          </div>
          <div className="card-body">
            <h3>{this.context.teamName}</h3>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="my-2">管理者</h2>
          </div>
          <div className="card-body">
            <Row>
              {this.state.managerInfo.map((data, idx) => {
                return (
                  <PlayerCard 
                    key={idx}
                    // enableUpdate={true}
                    enableUpdate={this.context.auth === 1 || (this.context.account === data.account) ? true : false}
                    {...data}
                  />
                );
              })}
            </Row>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="my-2">球員名單</h2>
          </div>
          <div className="card-body">
            <Row>
              {this.state.playerInfo.map((data, idx) => {
                return (
                  <PlayerCard 
                    key={idx}
                    enableUpdate={this.context.auth === 1 || (this.context.account === data.account) ? true : false}
                    {...data}
                  />
                );
              })}
            </Row>
          </div>
        </div>

      </div>
    );
  }
}

TeamInfoPage.contextType = UserStatusContext;
