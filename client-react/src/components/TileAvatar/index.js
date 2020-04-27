import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tile } from '../../design/shared-styles';

const TileAvatar = ({ avatarId, onSelect }) => {
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const loadAvatar = async () => {
      const module = await import(`../../assets/images/${avatarId}.png`);
      setAvatar(module.default);
    };

    loadAvatar();
  }, [avatarId]);

  return <StyledAvatarButton onClick={() => onSelect(avatarId)} avatar={avatar} />;
};

export default TileAvatar;

const StyledAvatarButton = styled.button`
  ${tile};
  height: 9rem;
  width: 100%;
  outline: 0;
  background-image: ${({ avatar }) => `url(${avatar})`};
  background-position: center;
  background-size: 130%;
  background-blend-mode: overlay;
  background-color: ${({ theme }) => theme.color.midnightBlue};
  transition: all 0.1s ease-in-out;

  &:focus,
  &:hover {
    background-blend-mode: normal;
  }
`;
