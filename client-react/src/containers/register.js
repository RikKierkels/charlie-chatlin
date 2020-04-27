import React from 'react';
import MasonryGrid from '../components/MasonryGrid';
import breakpointColumns from '../design/masonry-grid';
import TileRegister from '../components/TileRegister';
import TileAvatar from '../components/TileAvatar';

const Register = () => {
  return (
    <MasonryGrid breakpointCols={breakpointColumns}>
      <TileRegister onSubmit={() => {}} />
      <TileAvatar avatarId="cat-one" onSelect={(avatar) => console.log(avatar)} />
    </MasonryGrid>
  );
};

export default Register;
