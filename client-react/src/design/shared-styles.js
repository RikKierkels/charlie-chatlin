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

export const AvatarSmall = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const StyledButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border: 0;
  border-radius: 50%;
  background-color: inherit;
  color: inherit;
`;

const StyledControl = css`
  outline: none;
  font-size: 1.3rem;
  background-color: inherit;

  ::placeholder {
    color: inherit;
    opacity: 1;
  }

  ::placeholder,
  :-ms-input-placeholder,
  ::-ms-input-placeholder {
    color: inherit;
  }
`;

export const StyledInput = styled.input`
  ${StyledControl};
  color: inherit;
`;
export const StyledTextarea = styled.textarea`
  ${StyledControl};
  color: ${({ theme }) => theme.color.cyan};
  resize: none;
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

export const violet = ({ theme }) => css`
  background-color: ${theme.color.electricVioletDark};
  color: ${theme.color.white};
`;
