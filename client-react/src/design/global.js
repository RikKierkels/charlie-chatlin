import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  
  *, 
  *:before, 
  *:after {
    box-sizing: inherit;
  }
  
  body {
    margin: 0
  }
`;
