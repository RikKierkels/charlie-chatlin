import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Tile from '../Tile';
import { transparent } from '../../design/shared-styles';

const TileAvatar = ({ avatar, isSelected, onSelect }) => {
  const { id, name, image } = avatar;

  return (
    <Tile hasPadding={false} appearance={transparent}>
      <StyledAvatarButton
        image={image}
        isSelected={isSelected}
        aria-label={`Select ${name} as your avatar`}
        onClick={() => onSelect(id)}
      />
    </Tile>
  );
};

TileAvatar.propTypes = {
  avatar: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TileAvatar;

const StyledAvatarButton = styled.button`
  height: 9rem;
  width: 100%;
  border-radius: inherit;
  outline: 0;
  background-image: ${({ image }) => `url('${image}')`};
  background-position: center;
  background-size: 130%;
  background-blend-mode: overlay;
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.color.lima : theme.color.sapphire)};
  transition: all 0.1s ease-in-out;

  &:focus,
  &:hover {
    background-blend-mode: ${({ isSelected }) => (isSelected ? 'overlay' : 'normal')};
  }
`;
