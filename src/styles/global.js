import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    box-sizing: border-box;
    min-width: 450px;
  }
`

export default GlobalStyle