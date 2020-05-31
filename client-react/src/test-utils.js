import React from 'react';
import theme from './design/theme';
import { ThemeProvider } from 'emotion-theming';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from './store/store.js';

export const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

export const renderWithThemeAndRedux = (ui, store = createStore()) => {
  return {
    ...renderWithTheme(<Provider store={store}>{ui}</Provider>),
    store,
  };
};
