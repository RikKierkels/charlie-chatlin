import React from 'react';
import Input from '../../components/Input';

const Chat = () => {
  return (
    <>
      <span>I am chat.</span>
      <Input required value={''} placeholder="Your message" aria-label="message" onValueChange={() => {}} />
    </>
  );
};

export default Chat;
