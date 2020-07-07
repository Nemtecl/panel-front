import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { Header, Sidebar, Content } from './components';
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
  const [selectedItem, setSelectedItem] = useState('Tickets');
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
