import React from 'react';
import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';
import './Header.scss';

const styles = StyleSheet.create({
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 14,
  },
  container: {
    height: 40,
  },
  cursorPointer: {
    cursor: 'pointer',
  },
  name: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'right',
    letterSpacing: 0.2,
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  separator: {
    borderLeft: '1px solid #DFE0EB',
    marginLeft: 32,
    marginRight: 32,
    height: 32,
    width: 2,
    '@media (max-width: 768px)': {
      marginLeft: 12,
      marginRight: 12,
    },
  },
  title: {
    fontFamily: 'Muli',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: '30px',
    letterSpacing: 0.3,
    '@media (max-width: 768px)': {
      marginLeft: 36,
    },
    '@media (max-width: 468px)': {
      fontSize: 20,
    },
  },
  iconStyles: {
    cursor: 'pointer',
    marginLeft: 25,
    '@media (max-width: 768px)': {
      marginLeft: 12,
    },
  },
});

function HeaderComponent() {
  return (
    <Row className={css(styles.container)} vertical="center" horizontal="space-between">
      <span className={css(styles.title)}>titre</span>
      <Row vertical="center">
        <Row vertical="center">
          <span className={css(styles.name, styles.cursorPointer)}>Alexander Bolton</span>
          <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2d/2d8c085fd01f5b1c6355d3f529900dccb64fee6f_full.jpg" alt="avatar" className={classnames(css(styles.avatar, styles.cursorPointer), 'rounded-avatar')} />
        </Row>
      </Row>
    </Row>
  );
}
export default HeaderComponent;
