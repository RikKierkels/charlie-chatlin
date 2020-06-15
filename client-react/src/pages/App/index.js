import React from 'react';
import { useSelector } from 'react-redux';
import Chat from '../Chat';
import Register from '../Register';

const App = () => {
  const isRegistered = useSelector((state) => !!state.chat.user);
  return isRegistered ? <Chat /> : <Register />;
};

export default App;
