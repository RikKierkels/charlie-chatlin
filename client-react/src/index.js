import React from 'react';
import ReactDOM from 'react-dom';
import theme from './design/theme';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './design/global-styles';
import { Provider } from 'react-redux';
import store from './shared/store';
import chat from './shared/chat';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// Learn more about service workers: https://bit.ly/CRA-PWA
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.unregister();
chat.connect();
