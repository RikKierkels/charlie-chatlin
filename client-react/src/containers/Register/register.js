import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TileAvatar from '../../components/TileAvatar';
import TileRegister from '../../components/TileRegister';
import MasonryGrid from '../../components/MasonryGrid';
import breakpointColumns from '../../design/masonry-grid';
import avatars from '../../shared/avatars';
import chat from '../../shared/chat';

const Register = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const isLoggedIn = useSelector((state) => !!state.user.username);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) return;
    history.replace('/chat');
  }, [history, isLoggedIn]);

  const handleSubmit = (username) => {
    if (!selectedAvatar) return;
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
