import React, { useEffect } from 'react';
import Input from '../../components/Input';
import Grid from '../../components/Grid';
import breakpointCols from '../../design/masonry-grid';
import TileUserProfile from '../../components/TileUserProfile';
import TileUserList from '../../components/TileUserList';
import chat from '../../shared/chat';
import { useSelector } from 'react-redux';
import { MESSAGE_TYPE } from '../../shared/socket-constants';
import TileMessage from '../../components/TileMessage';
import TileUserJoined from '../../components/TileUserJoined';

const toMessageTile = (message) => {
  return message.type === MESSAGE_TYPE.TEXT ? <TileMessage message={message} /> : <TileUserJoined message={message} />;
};

const Chat = () => {
  const users = useSelector((state) => state.chat.users);
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    chat.getUsers();
  }, []);

  return (
    <Grid breakpointCols={breakpointCols}>
      <TileUserProfile />
      <TileUserList users={users} />
      {messages.map(toMessageTile)}
      <>
        <span>I am chat.</span>
        <Input required value={''} placeholder="Your message" aria-label="message" onValueChange={() => {}} />
      </>
    </Grid>
  );
};

export default Chat;
