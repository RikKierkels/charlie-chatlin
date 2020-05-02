import React from 'react';
import theme from './design/theme';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from './store/store.js';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

export const renderContainer = (ui, store = createStore(), history = createMemoryHistory()) => {
  return {
    ...renderWithTheme(
      <Provider store={store}>
        <Router history={history}>{ui}</Router>
      </Provider>,
    ),
    store,
    history,
  };
};
