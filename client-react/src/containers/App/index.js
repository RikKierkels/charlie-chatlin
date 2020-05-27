import React from 'react';
import { useSelector } from 'react-redux';
import Chat from '../Chat';
import Register from '../Register';

const App = () => {
  const hasRegistered = useSelector((state) => !!state.user.username);

  return hasRegistered ? <Chat /> : <Register />;
};

export default App;
