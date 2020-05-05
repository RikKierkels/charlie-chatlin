import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.color.white};
  font-size: 2.7em;
  font-weight: 700;
  line-height: 1.2em;
`;

export const StyledText = styled.p`
  font-size: 1.3em;
  font-weight: 500;
  line-height: 1.2em;
`;

export const transparent = css`
  background-color: transparent;
  color: transparent;
`;

export const biscay = ({ theme }) => css`
  background-color: ${theme.color.biscay};
  color: ${theme.color.white};
`;

export const chocolate = ({ theme }) => css`
  background-color: ${theme.color.chocolate};
  color: ${theme.color.white};
`;

export const sapphire = ({ theme }) => css`
  background-color: ${theme.color.sapphire};
  color: ${theme.color.cyan};
`;

export const cyan = ({ theme }) => css`
  background-color: ${theme.color.cyan};
  color: ${theme.color.biscay};
`;

export const lima = ({ theme }) => css`
  background-color: ${theme.color.lima};
  color: ${theme.color.white};
`;
