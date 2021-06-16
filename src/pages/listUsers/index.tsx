import { Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,Icon,Button,Box,Flex,FormControl,Select} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";
import api from "../../services/api";
import {Link} from 'react-router-dom';

interface Users {
  id: string;
  name: string; 
  company_id: string;
  created_at: string;
}

interface Company {
  id: string;
  name: string;
  description: string;
  created_at: Date;
}

export function ListUsers(){
  const [users, SetUsers] = useState<Users[]>([]);

  const [companys, setCompanys] = useState<Company[]>([]);
  const [selectCompany,setSelectCompany] =useState('');

  useEffect(() =>{
    api.get('/users').then(response =>SetUsers(response.data));
    api.get('/company').then(response => setCompanys(response.data)); 
  },[users])

  async function handleDelete(value: string){
    await api.delete('/users/'+value)
  }

  return(
    <Flex direction='column'>
      <Flex>
        <FormControl mr='10' >
          <Select placeholder="Filtrar por empresa" onChange={event=>setSelectCompany(event.target.value)}>
          {
              companys.map(company=>(
                <option>{company.name}</option>
              ))
            }
          </Select>
        </FormControl>
        <Link to='/fuser'>
          <Button as='a' size='sm' fontSize='sm' colorScheme='green'  rightIcon={<Icon as={RiAddLine} fontSize='16' />} maxWidth='200' >
          Adicionar usuário
          </Button>
        </Link> 
      </Flex>
      <Box flex='1' borderRadius={8} bg='gray.800' p='8' mt='4' >
        <Table colorScheme='whiteAlpha'>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Editar</Th>
              <Th>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody> 
            {
            selectCompany!=='' ?
            (
            users.filter(unit=>unit.company_id===(companys.filter(company=>company.name===selectCompany))[0].id).map(user =>(
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td >
                  <Link to={`/uusers/${user.id}`}>
                    <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                      Editar
                    </Button> 
                  </Link>
                </Td>
                <Td >
                  <Link to='/lusers'>
                    <Button as='a' size='sm' fontSize='sm' colorScheme='red'  rightIcon={<Icon as={RiCloseLine} fontSize='16' />} onClick={()=>handleDelete(user.id)} >
                      Deletar
                    </Button> 
                  </Link>
                </Td>
              </Tr>
            ))
            ):(
              users.map(user =>(
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td >
                  <Link to={`/uusers/${user.id}`}>
                    <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                      Editar
                    </Button> 
                  </Link>
                  
                </Td>
                <Td >
                  <Link to='/lusers'>
                    <Button as='a' size='sm' fontSize='sm' colorScheme='red'  rightIcon={<Icon as={RiCloseLine} fontSize='16' />} onClick={()=>handleDelete(user.id)} >
                      Deletar
                    </Button> 
                  </Link>
                </Td>
              </Tr>
            )))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}