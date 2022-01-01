import Routers from './Router';
import GlobalStyle from './GlobalStyle';
import { ReactQueryDevtools } from 'react-query/devtools';
import UseContextProvider from './stateManagement/contexts';

function App() {
  return (
    <UseContextProvider>
      <GlobalStyle />
      <Routers />
      <ReactQueryDevtools initialIsOpen={true} />
    </UseContextProvider>
  );
}

export default App;
