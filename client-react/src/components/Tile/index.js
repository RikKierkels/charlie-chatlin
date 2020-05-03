import React from 'react';
import styled from '@emotion/styled';
import { biscay, chocolate, cyan, sapphire } from '../../design/shared-styles';

const randomAppearance = () => {
  const styles = [biscay, chocolate, sapphire, cyan];
  return styles[Math.floor(Math.random() * styles.length)];
};

const Tile = ({ hasPadding = true, appearance = randomAppearance(), children }) => {
  return (
    <StyledTile hasPadding={hasPadding} appearance={appearance}>
      {children}
    </StyledTile>
  );
};

export default Tile;

const StyledTile = styled.div`
  padding: ${(props) => (props.hasPadding ? props.theme.spacing.md : 0)};
  border-radius: 10px;
  overflow: hidden;
  ${({ appearance }) => appearance}
`;
