import React from 'react';
import propTypes from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';

const styles = StyleSheet.create({
  activeBar: {
    height: 56,
    width: 3,
    position: 'absolute',
    left: 0,
  },
  activeContainer: {
    backgroundColor: 'rgba(221,226,255, 0.08)',
  },
  container: {
    height: 56,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(221,226,255, 0.08)',
    },
    paddingLeft: 32,
    paddingRight: 32,
  },
  title: {
    fontFamily: 'Muli',
    fontSize: 16,
    lineHeight: '20px',
    letterSpacing: '0.2px',
    marginLeft: 24,
  },
});

function MenuItemComponent({ active, icon, title, ...otherProps}) {
  return (
    <Row className={classnames(css(styles.container, active && styles.activeContainer), 'menu-item')} vertical="center" {...otherProps}>
      {active && <div className={classnames(css(styles.activeBar), 'active-bar')} />}
      <span className={classnames(icon, active ? 'yellow' : 'light-gray')} />
      <span className={classnames(css(styles.title, active && styles.activeTitle), { 'active-title': active }, 'title')}>{title}</span>
    </Row>
  );
}

MenuItemComponent.propTypes = {
  active: propTypes.bool.isRequired,
  icon: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
};

export default MenuItemComponent;
