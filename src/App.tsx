import Routers from './Router';
import GlobalStyle from './GlobalStyle';
import { ReactQueryDevtools } from 'react-query/devtools';
import UseContextProvider from './stateManagement/contexts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './stateManagement/atoms';

function App() {
  // TypeScript Test,
  const testFunction = () => {
    console.log('Hello');
  };

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <UseContextProvider>
      <GlobalStyle />
      <Routers testFunction={testFunction} />
      <ReactQueryDevtools initialIsOpen={true} />
    </UseContextProvider>
  );
}

export default App;
