import React from 'react';
import styled from 'styled-components';
import theme from '../../design/theme';

const randomColor = () => {
  const colors = theme.color.tile;
  const colorCount = Object.keys(colors).length;
  return colors[Math.floor(Math.random() * colorCount)];
};

const Tile = ({ hasPadding = true, backgroundColor = randomColor(), children }) => {
  return (
    <StyledTile hasPadding={hasPadding} backgroundColor={backgroundColor}>
      {children}
    </StyledTile>
  );
};

export default Tile;

const StyledTile = styled.div`
  padding: ${(props) => (props.hasPadding ? props.theme.spacing.md : 0)};
  border-radius: 10px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  overflow: hidden;
`;
