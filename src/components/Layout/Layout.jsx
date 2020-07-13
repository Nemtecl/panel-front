import React from 'react';
import propTypes from 'prop-types';
import { Column } from 'simple-flexbox';
import classnames from 'classnames';
import { StyleSheet, css } from 'aphrodite';
import Header from '../Header/Header';
import './Layout.scss';

const styles = StyleSheet.create({
  content: {
    marginTop: 54,
  },
  mainBlock: {
    padding: 30,
  },
});

const Layout = ({ children }) => (
  <main className="main-block">
    <Column flexGrow={1} className={classnames(css(styles.mainBlock))}>
      <Header />
      <div className={css(styles.content)}>{children}</div>
    </Column>
  </main>
);

Layout.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
};

export default Layout;
