import React from 'react';
import styled from 'styled-components';

const Tile = ({ hasPadding = true, backgroundColor, children }) => {
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
  background-color: ${(props) => props.theme.color[props.backgroundColor]};
  overflow: hidden;
`;
