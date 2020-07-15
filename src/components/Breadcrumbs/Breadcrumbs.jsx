/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
} from '@material-ui/core';
import { withRouter, useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

const Breadcrumbs = ({ location }) => {
  const history = useHistory();
  const pathnames = location.pathname.split('/').filter((x) => x);
  console.log(pathnames);
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {pathnames.length > 0 ? (
        <Link onClick={() => history.push('/')}>Home</Link>
      ) : (
        <Typography> Home </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          <Link key={name} onClick={() => history.push(routeTo)}>
            {name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

Breadcrumbs.propTypes = {
  location: propTypes.object.isRequired,
};

export default withRouter(Breadcrumbs);
