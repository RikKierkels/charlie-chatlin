import React from 'react';
import Tile from '../Tile';
import styled from '@emotion/styled';
import { color } from '../../design/theme';

const TileImage = ({ image, alt }) => {
  return (
    <Tile backgroundColor={color.tile.navy}>
      <StyledImage src={image} alt={alt} />
    </Tile>
  );
};

export default TileImage;

const StyledImage = styled.img`
  width: 100%;
`;
