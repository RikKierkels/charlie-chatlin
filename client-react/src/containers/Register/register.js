import React, { useState } from 'react';
import MasonryGrid from '../../components/MasonryGrid';
import breakpointColumns from '../../design/masonry-grid';
import TileRegister from '../../components/TileRegister';
import TileAvatar from '../../components/TileAvatar';
import avatars from '../../shared/avatars';
import chat from '../../shared/chat';

const Register = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('');

  const handleSubmit = (username) => {
    chat.register(username, selectedAvatar);
  };

  return (
    <MasonryGrid breakpointCols={breakpointColumns}>
      <TileRegister onSubmit={handleSubmit} />
      {avatars.map((avatar) => (
        <TileAvatar
          key={avatar.id}
          avatar={avatar}
          isSelected={avatar.id === selectedAvatar}
          onSelect={(id) => setSelectedAvatar(id)}
        />
      ))}
    </MasonryGrid>
  );
};

export default Register;
