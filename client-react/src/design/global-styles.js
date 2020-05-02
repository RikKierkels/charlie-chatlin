import React from 'react';
import { Global, css } from '@emotion/core';
import { withTheme } from 'emotion-theming';

export const GlobalStyle = withTheme(({ theme }) => (
  <Global
    styles={css`
      html {
        box-sizing: border-box;
        font-size: 24px;
      }

      html,
      input,
      button {
        font-family: 'Fira Sans', 'Helvetica Neue', sans-serif;
      }

      input,
      button {
        margin: 0;
        padding: 0;
        border: 1px solid transparent;
      }

      button {
        cursor: pointer;
      }

      body {
        margin: 0;
        background-color: ${theme.color.background};
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      h1,
      h2,
      p {
        margin: 0;
        padding: 0;
      }

      .masonry-grid {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding-top: ${theme.spacing.lg};
        padding-right: ${theme.spacing.lg};
        padding-bottom: calc(${theme.spacing.lg} / 2);
        padding-left: calc(${theme.spacing.lg} / 2);
        width: auto;
      }

      .masonry-grid-column {
        padding-left: calc(${theme.spacing.lg} / 2);
        background-clip: padding-box;
      }

      .masonry-grid-column > * {
        margin-bottom: calc(${theme.spacing.lg} / 2);
      }
    `}
  />
));
