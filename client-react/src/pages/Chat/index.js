import React from 'react';
import Grid from '../../components/Grid';
import breakpointCols from '../../design/breakpoint-columns';
import TileUserProfile from '../../containers/TileUserProfile';
import TileUserList from '../../containers/TileUserList';
import { useSelector } from 'react-redux';
import { MESSAGE_TYPE } from '../../shared/socket-constants';
import TileMessage from '../../components/TileMessage';
import TileUserJoined from '../../components/TileUserJoined';
import { StyledInput } from '../../design/shared-styles';

const Chat = () => {
  // State can't be co-located because messages need to be in the root of the grid.
  const messages = useSelector((state) => state.chat.messages);

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

export default Chat;
