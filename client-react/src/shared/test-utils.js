import React from 'react';
import theme from '../design/theme';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

export const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

export const renderWithReduxAndTheme = (ui, { initialState = {}, store = createStore(null, initialState) } = {}) => {
  return renderWithTheme(<Provider store={store}>{ui}</Provider>);
};
