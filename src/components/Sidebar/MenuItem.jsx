/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import propTypes from 'prop-types';
import { useHistory, withRouter } from 'react-router-dom';
import classnames from 'classnames';

const MenuItem = ({ icon, title, link, location }) => {
  const history = useHistory();

  const changeTab = () => {
    history.push(link);
  };

  const active = location.pathname === link;

  return (
    <li className="nav-item">
      <div
        onClick={() => changeTab()}
        className={classnames('nav-link', {
          active,
        })}
      >
        <span className={classnames('fa-2x', icon)} />
        <span className="link-text">{title}</span>
      </div>
    </li>
  );
};

MenuItem.propTypes = {
  icon: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
  location: propTypes.object.isRequired,
};

export default withRouter(MenuItem);
