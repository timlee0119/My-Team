import React from 'react';
import axios from 'axios';
import ajax from '../../data/axiosConfig';
import moment from 'moment';
import {
  Button, Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Col
} from 'reactstrap';
import { UserStatusContext } from '../../data/userStatus-context';
import { mockGetAnnouncement } from '../../data/fakedata';

class Announce extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startEdit: false,
      context: this.props.description ? this.props.description : ""
    };
  }

  onEditClick = () => {
    this.setState({ startEdit: true });
  }
  onUpdateClick = () => {
    const reqdata = { announceId: this.props.announceId, description: this.state.context };
    ajax.post('/updateAnnouncement/', reqdata)
    .then(res => {
      console.log(res.data);
      if (res.data.status === "success") {
        console.log('Update announcement success!');
      } else {
        return Promise.reject(new Error('Update annoucemnet fail!'));
      }
    })
    .catch(err => {
      console.log(err);
    });

    this.setState({ startEdit: false });
  }
  onContextChange = (e) => {
    this.setState({ context: e.target.value });
  }

  render() {
    return (
      <tr>
        <td style={{width: '10%'}}>{this.props.date}</td>
        <td style={{width: '20%'}}>{this.props.author}</td>
        <td style={{width: '60%'}}>
          {
            this.state.startEdit ?
            <Input 
              type="textarea" id="text-input" name="text-input"
              style={{height: '10em'}}
              value={this.state.context}
              onChange={this.onContextChange}
            /> :
            <div >
              {this.state.context.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          }
        </td>
        <td style={{width: '10%', textAlign: 'right'}}>
          {(this.props.editable && !this.state.startEdit) && <Button onClick={this.onEditClick} color="warning">修改</Button>}
          {(this.props.editable && this.state.startEdit) && <Button onClick={this.onUpdateClick} color="success">完成</Button>}
        </td>
      </tr>
    )
  }
}

export default class BulletinBoardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      announcements: [],
      createOpen: false,
      newDescription: ""
    };
  }
  
  updateAnnounce = (reqdata, res) => {
    setTimeout((reqdata) => {
      this.setState({ announcements: [{...reqdata, announceId: res.data.announceId}, ...this.state.announcements] });
    }, 500);
  }
  onCreateToggle = () => {
    this.setState({ createOpen: !this.state.createOpen });
  }
  onCreateChange = (e) => {
    this.setState({ newDescription: e.target.value });
  }
  onCreateClick = () => {
    const reqdata = {
      date: moment().format("YYYY-MM-DD"),
      author: this.context.name,
      description: this.state.newDescription
    };
    ajax.post('/createAnnouncement/', reqdata)
    .then(res => {
      if (res.data.status === "success") {
        console.log('Create announcemnent success!');
        // const before = this.state.announcements.length;
        this.setState({ announcements: [{...reqdata, announceId: res.data.announceId}, ...this.state.announcements] });
        this.setState({ newDescription: '' });
        // this.updateAnnounce(reqdata, res);
        this.onCreateToggle();
      }
      else {
        return Promise.reject(new Error('Create annoucement fail!'));
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
  handleAnnounceDelete = () => {
    
  }
  componentDidMount() {
    // ajax get announcements
    ajax.post('/announcements/', {team: this.context.teamName})
    .then(res => {
      console.log(res.data);

      const announcements = res.data.announcements.sort((a, b) => {
        return moment(a.date, "YYYY-MM-DD") < moment(b.date, "YYYY-MM-DD") ? 1 : -1;
      });
      this.setState({ announcements });
    })
    .catch(err => {
      console.log(err);
    })

    // for tests
    // const announcements = mockGetAnnouncement.data.announcements.sort((a, b) => {
    //   return moment(a.date, "YYYY-MM-DD") < moment(b.date, "YYYY-MM-DD") ? 1 : -1;
    // });
    // this.setState({ announcements });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header d-flex align-items-center">
            <h2 className="d-inline my-auto">球隊公告</h2>
            {
              this.context.auth === 1 && 
              <div className="ml-auto">
                {/* <Button onClick={this.onEditClick} color="warning">修改</Button> */}
                <Button onClick={this.onCreateToggle} className="ml-3" color="primary">新增</Button>
                <Modal isOpen={this.state.createOpen} toggle={this.onCreateToggle}
                       className='modal-primary modal-lg'>
                  <ModalHeader toggle={this.onCreateToggle}>新增公告</ModalHeader>
                  <ModalBody>
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                      <FormGroup row>
                        <Col md="3">
                          <h5>發表者</h5>
                        </Col>
                        <Col xs="12" md="9">
                          <p className="form-control-static">{this.context.name}</p>
                        </Col>          
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <h5>時間</h5>
                        </Col>
                        <Col xs="12" md="9">
                          <p className="form-control-static">{moment().format("YYYY-MM-DD")}</p>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="3">
                          <h5>內文</h5>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            type="textarea" name="text"
                            value={this.state.newDescription}
                            onChange={this.onCreateChange}
                            style={{height: '10em'}}
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button style={{width: '5em'}} color="success" onClick={this.onCreateClick}>新增</Button>{' '}
                    <Button style={{width: '5em'}} color="danger" onClick={this.onCreateToggle}>取消</Button>
                  </ModalFooter>
                </Modal>
              </div>
            }
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th style={{width: '10%'}}>日期</th>
                  <th style={{width: '20%'}}>發表者</th>
                  <th style={{width: '60%'}}>內文</th>
                  <th style={{width: '10%'}}></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.announcements.map((post, idx) => (
                    <Announce
                      {...post}
                      key={idx}
                      onDelete={this.handleAnnounceDelete}
                      editable={this.context.name === post.author}
                    />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

BulletinBoardPage.contextType = UserStatusContext;
