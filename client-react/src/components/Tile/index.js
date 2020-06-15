import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { biscay, chocolate, cyan, sapphire } from '../../design/shared-styles';
import { random } from '../../shared/utils';

const randomAppearance = () => random([biscay, chocolate, sapphire, cyan]);

const Tile = ({ appearance = randomAppearance(), children, className, hasPadding = true }) => {
  return (
    <StyledTile hasPadding={hasPadding} appearance={appearance} className={className}>
      {children}
    </StyledTile>
  );
};

Tile.propTypes = {
  appearance: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasPadding: PropTypes.bool,
};

export default Tile;

const StyledTile = styled.div`
  padding: ${(props) => (props.hasPadding ? props.theme.spacing.md : 0)};
  border-radius: 10px;
  overflow: hidden;
  ${({ appearance }) => appearance}
`;
