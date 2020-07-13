/* eslint-disable react/forbid-prop-types */
import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Breadcrumb = ({ location }) => {
  const elems = location.pathname.split('/');
  return (
    <div>
      {elems.map((o, index) => (
        <span key={index}>{o}</span>
      ))}
    </div>
  );
};

Breadcrumb.propTypes = {
  location: propTypes.object.isRequired,
};

Breadcrumb.defaultProps = {};

export default withRouter(Breadcrumb);
