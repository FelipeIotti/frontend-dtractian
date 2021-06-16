import {BrowserRouter as Router} from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';
import {theme} from './styles/theme';

import { Flex,SimpleGrid } from '@chakra-ui/react';
import {Header} from './components/Header/index.tsx';
import { SideBar} from './components/Sidebar/index';

import { SideBarDrawerProvider } from './contexts/SidebarDrawerContext';

import {Routes} from './routes';


function App() {
  return (
    <ChakraProvider theme={theme} >
      <SideBarDrawerProvider>
      <Router>
      <Flex direction='column' h='100vh' >
        <Header/>
        <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6' >
          <SideBar/>
          <SimpleGrid flex='1' gap='4' minChildWidth='380px' align='flex-start'  > 
              
              <Routes/>
          
            </SimpleGrid>
        </Flex>
      </Flex>
      </Router>
      </SideBarDrawerProvider>
      
    </ChakraProvider>
  );
}

export default App;
