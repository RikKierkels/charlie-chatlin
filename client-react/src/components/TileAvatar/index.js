import React from 'react';
import styled from 'styled-components';
import Tile from '../Tile';

const TileAvatar = ({ avatar, isSelected, onSelect }) => {
  const { id, name, image } = avatar;

  return (
    <Tile hasPadding={false}>
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
  outline: 0;
  background-image: ${({ avatar }) => `url(${avatar})`};
  background-position: center;
  background-size: 130%;
  background-blend-mode: overlay;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.poisonGreen : theme.color.tile.midnightBlue};
  transition: all 0.1s ease-in-out;

  &:focus,
  &:hover {
    background-blend-mode: ${({ isSelected }) => (isSelected ? 'overlay' : 'normal')};
  }
`;
