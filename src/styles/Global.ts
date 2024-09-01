import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    ul, li{
    list-style: none; 
   padding: 0; 
    margin: 0; 
  }

  }
`;
export default GlobalStyle;
