import React, { Fragment } from 'react';
import spinner from './spinner.gif'; // able to import images due to webpack

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: '200px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
);

export default Spinner;
