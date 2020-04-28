import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Tile from '../Tile';

const TileAvatar = ({ avatarId, isSelected, onSelect }) => {
  const [avatar, setAvatar] = useState('');

  const loadAvatar = useCallback(async () => {
    const avatarImage = await import(`../../assets/images/${avatarId}.png`);
    setAvatar(avatarImage.default);
  }, [avatarId]);

  useEffect(() => {
    loadAvatar();
  }, [loadAvatar]);

  return (
    <Tile hasPadding={false}>
      <StyledAvatarButton onClick={() => onSelect(avatarId)} avatar={avatar} />
    </Tile>
  );
};

export default TileAvatar;

const StyledAvatarButton = styled.button`
  height: 9rem;
  width: 100%;
  outline: 0;
  background-image: ${({ avatar }) => `url(${avatar})`};
  background-position: center;
  background-size: 130%;
  background-blend-mode: overlay;
  background-color: ${({ theme }) => theme.color.tile.midnightBlue};
  transition: all 0.1s ease-in-out;

  &:focus,
  &:hover {
    background-blend-mode: normal;
  }
`;
