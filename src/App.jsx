import React, { useEffect, useState } from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { Sidebar, Layout, PrivateRoute, Loader } from './components';
import { AuthContext } from './context/AuthContext';
import Users from './pages/Users/Users';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Vehicles from './pages/Vehicles/Vehicles';
import './App.scss';
import { muiTheme } from './plugins';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    minHeight: '100vh',
  },
});

const App = () => {
  const t = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null;
  const [token, setToken] = useState(t);

  const updateToken = (data) => {
    localStorage.setItem('token', data ? JSON.stringify(data) : null);
    setToken(data);
  };

  const menuItems = [
    {
      key: 'Users',
      title: 'Utilisateurs',
      icon: 'fas fa-users',
      path: '/users',
      component: Users,
    },
    {
      key: 'Vehicles',
      title: 'Véhicules',
      icon: 'fas fa-car',
      path: '/vehicles',
      component: Vehicles,
    },
    {
      key: 'About',
      title: 'Informations',
      icon: 'fas fa-question-circle',
      path: '/about',
      component: About,
    },
  ];

  const [, updateState] = useState();

  const resize = () => updateState({});

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <Loader>
        <AuthContext.Provider value={{ token, setToken: updateToken }}>
          <Row className={css(styles.container)}>
            <Sidebar menuItems={menuItems} />
            <Layout>
              <Switch>
                <Redirect exact from="/" to="/users" />
                {/* <Route exact path="/login" component={Login} /> */}
                {menuItems.map((o) => (
                  <Route
                    exact
                    path={o.path}
                    component={o.component}
                    key={o.key}
                  />
                ))}
              </Switch>
            </Layout>
          </Row>
        </AuthContext.Provider>
      </Loader>
    </MuiThemeProvider>
  );
};

export default App;
