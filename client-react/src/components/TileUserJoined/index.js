import React from 'react';
import styled from '@emotion/styled';
import Tile from '../Tile';

const TileUserJoined = ({ message }) => {
  return <StyledTile>{message.text}</StyledTile>;
};

export default TileUserJoined;

const StyledTile = styled(Tile)`
  position: absolute;
`;
