import React from 'react';
import { bool, func, string } from 'prop-types';
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

function MenuItemComponent(props) {
  const {
    active, icon, title, ...otherProps
  } = props;
  const Icon = icon;
  return (
    <Row className={classnames(css(styles.container, active && styles.activeContainer), 'menu-item')} vertical="center" {...otherProps}>
      {active && <div className={classnames(css(styles.activeBar), 'active-bar')} />}
      <Icon fill={active && '#FFAF25'} opacity={!active && '0.4'} />
      <span className={classnames(css(styles.title, active && styles.activeTitle), { 'active-title': active }, 'title')}>{title}</span>
    </Row>
  );
}

MenuItemComponent.propTypes = {
  active: bool,
  icon: func,
  title: string,
};

export default MenuItemComponent;
