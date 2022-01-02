import Routers from './Router';
import GlobalStyle from './GlobalStyle';
import { ReactQueryDevtools } from 'react-query/devtools';
import UseContextProvider from './stateManagement/contexts';

function App() {
  // TypeScript Test,
  const testFunction = () => {
    console.log('Hello');
  };

  return (
    <UseContextProvider>
      <GlobalStyle />
      <Routers testFunction={testFunction} />
      <ReactQueryDevtools initialIsOpen={true} />
    </UseContextProvider>
  );
}

export default App;
