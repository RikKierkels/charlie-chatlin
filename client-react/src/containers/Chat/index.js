import React, { useEffect } from 'react';
import Input from '../../components/Input';
import Grid from '../../components/Grid';
import breakpointCols from '../../design/masonry-grid';
import TileProfile from '../../components/TileProfile';
import TileUsers from '../../components/TileUsers';
import chat from '../../shared/chat';

const Chat = () => {
  useEffect(() => {
    chat.getUsers();
  }, []);

  return (
    <Grid breakpointCols={breakpointCols}>
      <TileProfile />
      <TileUsers />
      <>
        <span>I am chat.</span>
        <Input required value={''} placeholder="Your message" aria-label="message" onValueChange={() => {}} />
      </>
    </Grid>
  );
};

export default Chat;
