import React from 'react';
import { useSelector } from 'react-redux';
import Chat from '../../pages/Chat';
import Register from '../../pages/Register';

const App = () => {
  const isRegistered = useSelector((state) => !!state.user.username);
  return isRegistered ? <Chat /> : <Register />;
};

export default App;
