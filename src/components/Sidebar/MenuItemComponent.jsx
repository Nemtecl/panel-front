/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-restricted-globals */
import React from 'react';
import propTypes from 'prop-types';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import classnames from 'classnames';
import { Link, useHistory, withRouter } from 'react-router-dom';

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

function MenuItemComponent({
  icon, title, link, location,
}) {
  const history = useHistory();

  const changeTab = () => {
    history.push(link);
  };

  const active = location.pathname === link;

  return (
    <Row className={classnames(css(styles.container, active && styles.activeContainer), 'menu-item')} vertical="center" onClick={() => changeTab()}>
      { active && <div className={classnames(css(styles.activeBar), 'active-bar')} />}
      <span className={classnames(icon, active ? 'yellow' : 'gray')} />
      <span className={classnames(css(styles.title, active && styles.activeTitle), { 'active-title': active }, 'title')}>{title}</span>
    </Row>
  );
}

MenuItemComponent.propTypes = {
  icon: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
  location: propTypes.object,
};

export default withRouter(MenuItemComponent);
