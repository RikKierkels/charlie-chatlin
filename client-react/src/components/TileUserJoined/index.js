import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Tile from '../Tile';
import useGiphy from './useGiphy';
import { StyledTitle } from '../../design/shared-styles';

const TileUserJoined = ({ message }) => {
  const gif = useGiphy({ tag: 'applause' });
  console.log(gif);

  return (
    <StyledTile gif={gif}>
      <StyledText>{message.text}</StyledText>
    </StyledTile>
  );
};

TileUserJoined.propTypes = { message: PropTypes.object.isRequired };

export default memo(TileUserJoined);

const StyledTile = styled(Tile)`
  display: flex;
  align-items: center;
  min-height: 200px;
  background-color: transparent;
  background-image: ${({ gif }) => `url("${gif}")`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledText = styled(StyledTitle)`
  font-size: 1.3rem;
  text-align: center;
`;
