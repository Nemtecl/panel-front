import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { Header, Sidebar, Content } from './components';
import Users from './pages/Users/Users';
import Login from './pages/Login/Login';
import Vehicles from './pages/Vehicles/Vehicles';
import './App.scss';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    minHeight: '100vh',
  },
  content: {
    marginTop: 54,
  },
  mainBlock: {
    backgroundColor: '#F7F8FC',
    padding: 30,
  },
});

const App = () => {
  const menuItems = [
    {
      key: 'Users',
      title: 'Utilisateurs',
      icon: 'fas fa-users',
      component: Users,
    },
    {
      key: 'Vehicles',
      title: 'Véhicules',
      icon: 'fas fa-car',
      component: Vehicles,
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
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <Header title={selectedItem} />
        <div className={css(styles.content)}>
          <Content />
        </div>
      </Column>
    </Row>
  );
};

export default App;
