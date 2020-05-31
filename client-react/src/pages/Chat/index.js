import React, { useEffect } from 'react';
import Grid from '../../components/Grid';
import breakpointCols from '../../design/breakpoint-columns';
import TileUserProfile from '../../containers/TileUserProfile';
import TileUserList from '../../containers/TileUserList';
import chat from '../../shared/chat';
import { useSelector } from 'react-redux';
import { MESSAGE_TYPE } from '../../shared/socket-constants';
import TileMessage from '../../components/TileMessage';
import TileUserJoined from '../../components/TileUserJoined';
import { StyledInput } from '../../design/shared-styles';

const Chat = () => {
  useEffect(() => {
    chat.getUsers();
  }, []);

  return (
    <Grid breakpointCols={breakpointCols}>
      <TileUserProfile />
      <TileUserList />
      <Messages />
      <>
        <span>I am chat.</span>
        <StyledInput
          type="text"
          required
          placeholder="Your message"
          aria-label="message"
          value={''}
          onChange={() => {}}
        />
      </>
    </Grid>
  );
};

const Messages = () => {
  const messages = useSelector((state) => state.chat.messages);

  return (
    <>
      {messages.map((message) =>
        message.type === MESSAGE_TYPE.TEXT ? <TileMessage message={message} /> : <TileUserJoined message={message} />,
      )}
    </>
  );
};

export default Chat;
