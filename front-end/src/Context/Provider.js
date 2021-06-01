import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const Provider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const contextState = {
    users,
    setUsers,
  };

  return (
    <Context.Provider value={ contextState }>
      { children }
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
