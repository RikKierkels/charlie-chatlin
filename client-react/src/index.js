import React from 'react';
import ReactDOM from 'react-dom';
import theme from './design/theme';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'emotion-theming';
import { GlobalStyle } from './design/global-styles';
import { Provider } from 'react-redux';
import store from './store/store';
import chat, { sessionKey } from './shared/chat';
import io from 'socket.io-client';
import App from './containers/App';

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

const socket = io.connect(process.env.REACT_APP_API_URL, { query: { sessionId: localStorage.getItem(sessionKey) } });
chat.connect(socket, store);
