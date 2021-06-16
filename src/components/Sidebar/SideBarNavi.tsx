import { Stack,Text } from "@chakra-ui/react";
//import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
//import { NaviLink } from "./NaviLink";
import { NaviSection } from "./NaviSection";

import { Link} from 'react-router-dom';

export function SideBarNavi() {
  return(
    <Stack spacing='12' align='flex-start'>
      <NaviSection title='Dashboard' >

        {/* <NaviLink icon={RiDashboardLine} href='/dashboard' children='Dashboard' /> */}
        {/* <NaviLink icon={RiContactsLine} href='/users' children='Usuários' /> */}
        <Link to='/'>
          <Text  fontWeight='medium' >Ativos</Text>
        </Link>

      </NaviSection>

      <NaviSection title='Listagem' >

        {/* <NaviLink icon={RiInputMethodLine} href='/forms' children='Formulários' />
        <NaviLink icon={RiGitMergeLine} href='/automation' children='Automação' /> */}
        <Link to='/lcompany'>
          <Text fontWeight='medium'>Empresas</Text>
        </Link>
        
        <Link to='/lunits'>
          <Text fontWeight='medium'>Unidades</Text>
        </Link>

        <Link to='/lusers'>
          <Text fontWeight='medium'>Usuários</Text>
        </Link>

        <Link to='/lactives'>
          <Text fontWeight='medium'>Ativos</Text>
        </Link>
        
        
      </NaviSection>
    </Stack>
  );
}