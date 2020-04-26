import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 24px;
    font-weight: 400;
  }
  
  html,
  input,
  button {
      font-family: 'Fira Sans', 'Helvetica Neue', sans-serif;
  }
  
  body {
   margin: 0;
   background-color: ${(props) => props.theme.color.background};
  }
  
  *, 
  *:before, 
  *:after {
    box-sizing: inherit;
  }
`;
