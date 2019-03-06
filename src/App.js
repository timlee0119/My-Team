import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     loggedIn: false,
  //     account: '',
  //     name: '',
  //     teamName: '',
  //     auth: '',
  //     logOut: this.logOut
  //   }
  // }

  // logOut() {
  //   e.preventDefault();

  //   ajax log out
  //   axios.get('https://backendurl/logout')
  //   .then(res => {
  //     this.setState({
  //       loggedIn: false,
  //       account: '',
  //       name: '',
  //       teamName: '',
  //     });
  //     this.props.history.push('/login');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })

  //   for test
  //   this.setState({
  //     loggedIn: false,
  //     account: '',
  //     name: '',
  //     teamName: '',
  //   });
  //   this.props.history.push('/login');
  // }

  // componentWillMount() {
  //   // ajax check user login status, and set to this.state
  //   const mockres = {
  //     status: 'fuck',
  //     data: {
  //       loggedIn: false,
  //       account: '',
  //       name: '',
  //       teamName: '',
  //       auth: ''
  //     }
  //   };
  //   axios.get('backend/checklogin')
  //   .then(res => {
  //     this.setState({ ...mockres.data });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }

  render() {
    return (
      <HashRouter>
          <Switch>
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route exact path="/register" name="Register Page" component={Register} />
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route exact path="/500" name="Page 500" component={Page500} />
            <Route path="/" name="Home" component={DefaultLayout} />
            {/* <UserStatusContext.Provider value={this.state}>
              <Route path="/" name="Home" component={DefaultLayout} />
            </UserStatusContext.Provider> */}
          </Switch>
      </HashRouter>
    );
  }
}

export default App;
