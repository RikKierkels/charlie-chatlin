import React, { useState } from 'react';
import TileAvatar from '../../components/TileAvatar';
import TileFormRegister from '../../components/TileFormRegister';
import Grid from '../../components/Grid';
import breakpointColumns from '../../design/breakpoint-columns';
import avatars from '../../shared/avatars';
import chat from '../../shared/chat';
import Logo from '../../assets/images/mediaan-logo.png';
import TileImage from '../../components/TileImage';
import Tile from '../../components/Tile';
import { chocolate, cyan, sapphire, StyledText, StyledTitle } from '../../design/shared-styles';

const Register = () => {
  const [selectedAvatarId, setSelectedAvatarId] = useState('');

  const handleSubmit = (username) => {
    if (!selectedAvatarId || !username) return;
    chat.registerUser(username, selectedAvatarId);
  };

  return (
    <Grid breakpointCols={breakpointColumns}>
      <TileImage image={Logo} alt="Mediaan" />
      <Tile appearance={chocolate}>
        <StyledTitle>Charlie Chatlin</StyledTitle>
      </Tile>
      <Tile appearance={cyan}>
        <StyledText>Welcome to the Mediaan Masterclass 2020!</StyledText>
      </Tile>
      <Tile appearance={sapphire}>
        <StyledText>Choose your avatar, register a username and enter the chatroom.</StyledText>
      </Tile>
      {avatars.map((avatar) => (
        <TileAvatar
          key={avatar.id}
          avatar={avatar}
          isSelected={avatar.id === selectedAvatarId}
          onSelect={(id) => setSelectedAvatarId(id)}
        />
      ))}
      <TileFormRegister onSubmit={handleSubmit} />
    </Grid>
  );
};

export default Register;
