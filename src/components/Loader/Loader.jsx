/* eslint-disable react/forbid-prop-types */
import React from 'react';
import propTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import Logo from '../../assets/unitedroleplay.png';
import './Loader.scss';

const Loader = ({ children }) => (
  <div className="united-loader">
    <div className="united-loader__overlay" />
    <div className="united-loader__spinner">
      <CircularProgress size={300} thickness={1} disableShrink />
      <img
        src={Logo}
        alt="united-logo"
        className="united-loader__spinner__img"
      />
    </div>
    {children}
  </div>
);

Loader.propTypes = {
  children: propTypes.any.isRequired,
};

Loader.defaultProps = {};

export default Loader;
