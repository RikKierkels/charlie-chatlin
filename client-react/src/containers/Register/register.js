import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TileAvatar from '../../components/TileAvatar';
import TileRegister from '../../components/TileRegister';
import MasonryGrid from '../../components/MasonryGrid';
import breakpointColumns from '../../design/masonry-grid';
import avatars from '../../shared/avatars';
import chat from '../../shared/chat';
import Logo from '../../assets/images/mediaan-logo.png';
import TileImage from '../../components/TileLogo';
import Tile from '../../components/Tile';
import { color } from '../../design/theme';

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

  const tiles = [
    <TileImage image={Logo} alt="Mediaan" />,
    <Tile backgroundColor={color.tile.kingsdayOrange}>Charlie Chatlin</Tile>,
    <Tile backgroundColor={color.tile.babyBlue}>Welcome to the Mediaan Masterclass 2020!</Tile>,
    <Tile backgroundColor={color.tile.navy}>Choose your avatar, register a username and enter the chatroom.</Tile>,
    avatars.map((avatar) => (
      <TileAvatar
        key={avatar.id}
        avatar={avatar}
        isSelected={avatar.id === selectedAvatarId}
        onSelect={(id) => setSelectedAvatarId(id)}
      />
    )),
    <TileRegister onSubmit={handleSubmit} />,
  ].flat();

  return <MasonryGrid breakpointCols={breakpointColumns}>{tiles}</MasonryGrid>;
};

export default Register;
