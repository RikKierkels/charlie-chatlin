import React from 'react';
import Tile from '../Tile';
import styled from '@emotion/styled';
import { biscay } from '../../design/shared-styles';

const TileImage = ({ image, alt }) => {
  return (
    <Tile appearance={biscay}>
      <StyledImage src={image} alt={alt} />
    </Tile>
  );
};

export default TileImage;

const StyledImage = styled.img`
  width: 100%;
`;
