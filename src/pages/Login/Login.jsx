import React from 'react';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { Steam, Auth } from '../../services';
import { useBeforeFirstRender } from '../../plugins';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const { token, setToken } = useAuth();

  const handleMouseMouve = (event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
  };

  useBeforeFirstRender(() => {
    document.addEventListener('mousemove', handleMouseMouve);
    const openidParams = queryString.parse(window.location.search);
    if (Object.keys(openidParams).length > 0) {
      Auth.login({ openidParams }).then((d) => {
        setToken(d.id_token);
      });
    }
  });

  if (token) {
    return <Redirect to="/users" />;
  }

  const link = () => Steam.redirect();

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div onClick={link} className="steam-logo">
        <img
          alt="steam login"
          src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/french/sits_small.png"
        />
      </div>
    </div>
  );
};

export default Login;
