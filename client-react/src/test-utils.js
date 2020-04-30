import React from 'react';
import theme from './design/theme';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store/store.js';

export const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

export const renderWithReduxAndTheme = (ui) => {
  return renderWithTheme(<Provider store={store}>{ui}</Provider>);
};
