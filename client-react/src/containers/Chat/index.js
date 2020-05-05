import React from 'react';
import Input from '../../components/Input';
import Grid from '../../components/Grid';
import breakpointCols from '../../design/masonry-grid';
import TileProfile from '../../components/TileProfile';

const Chat = () => {
  return (
    <Grid breakpointCols={breakpointCols}>
      <TileProfile />
      <>
        <span>I am chat.</span>
        <Input required value={''} placeholder="Your message" aria-label="message" onValueChange={() => {}} />
      </>
    </Grid>
  );
};

export default Chat;
