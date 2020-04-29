import React from 'react';
import MasonryGrid from '../../components/MasonryGrid';
import breakpointColumns from '../../design/masonry-grid';
import TileRegister from '../../components/TileRegister';
import TileAvatar from '../../components/TileAvatar';
import avatars from '../../shared/avatars';

const Register = () => {
  return (
    <MasonryGrid breakpointCols={breakpointColumns}>
      <TileRegister onSubmit={() => {}} />
      {avatars.map((avatar) => (
        <TileAvatar key={avatar.id} avatar={avatar} onSelect={(id) => console.log(id)} />
      ))}
    </MasonryGrid>
  );
};

export default Register;
