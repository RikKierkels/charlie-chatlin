import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
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
   background-color: ${({ theme }) => theme.color.background};
  }
  
  *, 
  *:before, 
  *:after {
    box-sizing: inherit;
  }
  
  .masonry-grid {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 50px 50px 30px 30px;
    width: auto;
  }
  
  .masonry-grid-column {
    padding-left: 20px;
    background-clip: padding-box;
  }
  
  .masonry-grid-column > * {
    margin-bottom: 20px;
  }
`;
