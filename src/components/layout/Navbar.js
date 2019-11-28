import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Navbar = props => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={props.icon} /> {props.title}
      </h1>
    </nav>
  );
};

Navbar.propTypes = {
  title: 'GitHub Finder',
  icon: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;
