/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
  const { token } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (token ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
}

PrivateRoute.propTypes = {
  component: propTypes.oneOfType([propTypes.string, propTypes.func]).isRequired,

};

export default PrivateRoute;
