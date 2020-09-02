import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}

html,
body,
div#__next {
  min-height: 100%;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
}

a {
  color: #2f878c;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    color: #39a2a9;
    text-decoration: underline;
  }
}

table, thead, td {
  border-collapse: collapse;
  border: 1px solid #495057;
}

thead {
  text-align: left;
}

th, td {
  padding: 1rem;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

`;

export default GlobalStyle;
