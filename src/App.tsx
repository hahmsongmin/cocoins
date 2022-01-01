import Routers from './Router';
import GlobalStyle from './GlobalStyle';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routers />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
