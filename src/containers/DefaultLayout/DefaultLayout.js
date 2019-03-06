import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import axios from 'axios';
import ajax from '../../data/axiosConfig';
import { UserStatusContext } from '../../data/userStatus-context';
import { mockIslogin } from '../../data/fakedata';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      account: '',
      name: '',
      avatar: '',
      teamName: '',
      auth: 0,
      loading: true,
      signOut: this.signOut,
      ContextChangeName: this.handleChangeContextName
    }
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut = () => {
    // ajax log out
    ajax.post('/logout/')
    .then(res => {
      if (res.data.status === "success") {
        this.setState({
          loggedIn: false,
          account: '',
          name: '',
          teamName: '',
        });
        localStorage.clear();

        this.props.history.push('/login');
      } 
      else {
        return Promise.reject(new Error('logout fail???'));
      }
    })
    .catch(err => {
      console.log(err);
    })

    // for test
    // this.setState({
    //   loggedIn: false,
    //   account: '',
    //   name: '',
    //   teamName: '',
    // });
    // this.props.history.push('/login');
  }
  handleChangeContextName = (name) => {
    this.setState({ name });
  }
  
  componentDidMount() {
    // xxxxxajax check login status
    // ajax get account info

    const account = localStorage.getItem('account');
    if (!account) {
      this.props.history.push('/login');
    }
    else {
      ajax.post('/accountInfo/', { account })
      .then(res => {
        console.log('Account info: ', res.data);
        this.setState({ ...res.data });
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
    }

    // .then(() => {
    //   if (!this.state.loggedIn) {
    //     this.props.history.push('/login');
    //   }
    // });

    // for tests
    // this.setState({ ...mockIslogin.data });
  }

  render() {
    if (this.state.loading) {
      return this.loading();
    }
    return (
      <div className="app">
        <UserStatusContext.Provider value={this.state}>
          <AppHeader fixed>
            <Suspense  fallback={this.loading()}>
              <DefaultHeader/>
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} />
              </Suspense>
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes}/>
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )} />
                      ) : (null);
                    })}
                    <Redirect from="/" to="/team-info" />
                  </Switch>
                </Suspense>
              </Container>
            </main>
            <AppAside fixed>
              <Suspense fallback={this.loading()}>
                <DefaultAside />
              </Suspense>
            </AppAside>
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter />
            </Suspense>
          </AppFooter>
        </UserStatusContext.Provider>
      </div>
    );
  }
}

export default DefaultLayout;
