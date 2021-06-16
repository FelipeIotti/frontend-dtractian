import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SideBarNavi } from "./SideBarNavi";

export function SideBar(){
  const {isOpen, onClose} = useSidebarDrawer();

  const isDrawerSideBar = useBreakpointValue({base: true,lg:false});

  if(isDrawerSideBar){
    return(
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} >
        <DrawerOverlay>
          <DrawerContent bg='gray.800' p='4' >
            <DrawerCloseButton mt='6' />
            <DrawerHeader>Navegação</DrawerHeader>
            <DrawerBody>
              <SideBarNavi/>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return(
    <Box as='aside' w='64' mr='8' >
      <SideBarNavi/>
    </Box>
  );
}