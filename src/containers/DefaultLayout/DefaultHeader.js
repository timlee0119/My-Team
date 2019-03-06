import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/myteam.png';
// import logo from '../../assets/img/brand/logo.svg';
import DefaultAside from './DefaultAside';
import { UserStatusContext } from '../../data/userStatus-context';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  // onLogoutClick = (e) => {
  //   e.prevenventDefault();

  //   // ajax log out
  //   axios.get('https://backendurl/logout')
  //   .then(res => {
  //     this.context
  //     this.props.signOut();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <Link className="d-md-down-none" to="/">
          <img className="p-3" src={logo} alt="CoreUI Logo" style={{ width: '155px', height: '55px' }}/>
          {/* <AppNavbarBrand
            full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
            minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
          />         */}
        </Link>
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav> */}
        <Nav className="ml-auto mr-2 mr-lg-5" navbar>
          
          {/* <img
            src={'../../assets/img/avatars/fb-avatar.jpg'}
            style={{ height: '40px', width: '40px' }}
            className="img-avatar"
            alt="admin@bootstrapmaster.com"
          /> */}
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <NavItem className="mx-1 mx-lg-3">
            <h5 className="font-weight-bold text-dark my-auto">{this.context.name}</h5>
          </NavItem>
          <NavItem className="mx-1 mx-lg-3">
            <h5 className="font-weight-bold text-dark my-auto">{this.context.teamName}</h5>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                // src={'../../assets/img/avatars/fb-avatar.jpg'} className="img-avatar"
                src={this.context.avatar ? this.context.avatar : "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/1200px-Jumpman_logo.svg.png"}
                className="img-avatar"
                style={{ height: '40px', width: '40px' }}
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>帳戶</strong></DropdownItem>
              {/* <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem><i className="fa fa-user"></i> 個人資料</DropdownItem>
              {/* <DropdownItem onClick={this.onLogoutClick}><i className="fa fa-lock"></i> 登出</DropdownItem> */}
              {/* <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> 登出</DropdownItem> */}
              <DropdownItem onClick={this.context.signOut}><i className="fa fa-lock"></i> 登出</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;
DefaultHeader.contextType = UserStatusContext;

export default DefaultHeader;
