import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TileAvatar from '../../components/TileAvatar';
import TileRegister from '../../components/TileRegister';
import Grid from '../../components/Grid';
import breakpointColumns from '../../design/masonry-grid';
import avatars from '../../shared/avatars';
import chat from '../../shared/chat';
import Logo from '../../assets/images/mediaan-logo.png';
import TileImage from '../../components/TileImage';
import Tile from '../../components/Tile';
import { chocolate, cyan, sapphire, StyledText, StyledTitle } from '../../design/shared-styles';

const Register = () => {
  const [selectedAvatarId, setSelectedAvatarId] = useState('');
  const isLoggedIn = useSelector((state) => !!state.user.username);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) return;
    history.push('/chat');
  }, [history, isLoggedIn]);

  const handleSubmit = (username) => {
    if (!selectedAvatarId || !username) return;
    chat.registerUser(username, selectedAvatarId);
  };

  // Masonry grid requires elements to be in a single array.
  const tiles = [
    <TileImage key="logo" image={Logo} alt="Mediaan" />,
    <Tile key="title" appearance={chocolate}>
      <StyledTitle>Charlie Chatlin</StyledTitle>
    </Tile>,
    <Tile key="intro" appearance={cyan}>
      <StyledText>Welcome to the Mediaan Masterclass 2020!</StyledText>
    </Tile>,
    <Tile key="instruction" appearance={sapphire}>
      <StyledText>Choose your avatar, register a username and enter the chatroom.</StyledText>
    </Tile>,
    ...avatars.map((avatar) => (
      <TileAvatar
        key={avatar.id}
        avatar={avatar}
        isSelected={avatar.id === selectedAvatarId}
        onSelect={(id) => setSelectedAvatarId(id)}
      />
    )),
    <TileRegister key="register" onSubmit={handleSubmit} />,
  ];

  return <Grid breakpointCols={breakpointColumns}>{tiles}</Grid>;
};

export default Register;
