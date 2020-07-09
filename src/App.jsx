import React, { useEffect, useState } from 'react';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Sidebar, Layout, Content, PrivateRoute } from './components';
import Users from './pages/Users/Users';
import Login from './pages/Login/Login';
import Vehicles from './pages/Vehicles/Vehicles';
import './App.scss';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    minHeight: '100vh',
  },
});

const App = () => {
  const menuItems = [
    {
      key: 'Users',
      title: 'Utilisateurs',
      icon: 'fas fa-users',
      path: '/users',
      component: Content,
    },
    {
      key: 'Vehicles',
      title: 'Véhicules',
      icon: 'fas fa-car',
      path: '/vehicles',
      component: Content,
    },
  ];

  const [selectedItem, setSelectedItem] = useState(menuItems[0].key);
  const [, updateState] = useState();

  const resize = () => updateState({});

  useEffect(() => {
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <Row className={css(styles.container)}>
      <Sidebar
        selectedItem={selectedItem}
        onChange={(newItem) => setSelectedItem(newItem)}
        menuItems={menuItems}
      />
      <Layout selectedItem={selectedItem}>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={Content} />
          {
            menuItems.map((o) => (
              <PrivateRoute exact path={o.path} component={o.component} />
            ))
          }
        </Switch>
      </Layout>
    </Row>
  );
};

export default App;
