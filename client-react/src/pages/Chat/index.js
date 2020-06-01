import React from 'react';
import Grid from '../../components/Grid';
import breakpointCols from '../../design/breakpoint-columns';
import TileUserProfile from '../../components/TileUserProfile';
import TileUserList from '../../components/TileUserList';
import { useSelector } from 'react-redux';
import { MESSAGE_TYPE } from '../../shared/socket-constants';
import TileMessage from '../../components/TileMessage';
import TileUserJoined from '../../components/TileUserJoined';
import TileFormMessage from '../../components/TileFormMessage';
import chat from '../../shared/chat';

const Chat = () => {
  // State can't be co-located because messages need to be in the root of the grid.
  const messages = useSelector((state) => state.chat.messages);
  const handleSubmit = (message) => message && chat.sendMessage(message);

  return (
    <Grid breakpointCols={breakpointCols}>
      <TileUserProfile />
      <TileUserList />
      {messages.map((message) =>
        message.type === MESSAGE_TYPE.TEXT ? (
          <TileMessage key={message.id} message={message} />
        ) : (
          <TileUserJoined key={message.id} message={message} />
        ),
      )}
      <TileFormMessage onSubmit={handleSubmit} />
    </Grid>
  );
};

export default Chat;
