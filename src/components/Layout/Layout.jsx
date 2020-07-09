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

const Layout = ({ selectedItem, children }) => (
  <Column flexGrow={1} className={classnames(css(styles.mainBlock), 'main-block')}>
    <Header title={selectedItem} />
    <div className={css(styles.content)}>
      { children }
    </div>
  </Column>
);

Layout.propTypes = {
  selectedItem: propTypes.string.isRequired,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
};

export default Layout;
