import React from 'react';
import theme from './design/theme';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

export const renderWithTheme = (ui) => render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
