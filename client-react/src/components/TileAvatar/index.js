import React from 'react';
import styled from '@emotion/styled';
import Tile from '../Tile';
import { transparent } from '../../design/shared-styles';

const TileAvatar = ({ avatar, isSelected, onSelect }) => {
  const { id, name, image } = avatar;

  return (
    <Tile hasPadding={false} appearance={transparent}>
      <StyledAvatarButton
        avatar={image}
        isSelected={isSelected}
        aria-label={`Select ${name} as your avatar`}
        onClick={() => onSelect(id)}
      />
    </Tile>
  );
};

export default TileAvatar;

const StyledAvatarButton = styled.button`
  height: 9rem;
  width: 100%;
  border-radius: inherit;
  outline: 0;
  background-image: ${({ avatar }) => `url(${avatar})`};
  background-position: center;
  background-size: 130%;
  background-blend-mode: overlay;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.color.lima : theme.color.tile.sapphire)};
  transition: all 0.1s ease-in-out;

  &:focus,
  &:hover {
    background-blend-mode: ${({ isSelected }) => (isSelected ? 'overlay' : 'normal')};
  }
`;
