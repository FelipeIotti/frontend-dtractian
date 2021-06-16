import { Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,Icon,Button,Flex,Box} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";
import api from "../../services/api";
import {Link} from 'react-router-dom';

interface Company {
  id: string;
  name: string;
  description: string;
  created_at: Date;
}

export function ListCompany(){
  const [company, setCompany] = useState<Company[]>([]);

  useEffect( () => {
    api.get('/company').then(response => setCompany(response.data));
  },[company]);

  async function handleDelete(value: string){
    await api.delete('/company/'+value)
  }

  return(
    <Flex direction='column'>
      <Link to='/fcompany'>
        <Button as='a' size='sm' fontSize='sm' colorScheme='green'  rightIcon={<Icon as={RiAddLine} fontSize='16' />} maxWidth='200' >
        Adicionar empresa
        </Button>
      </Link> 
      <Box flex='1' borderRadius={8} bg='gray.800' p='8' mt='4' >
        <Table colorScheme='whiteAlpha' >
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Editar</Th>
              <Th>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
          {company.map(company =>(
            <Tr key={company.id} >
              <Td>{company.name}</Td>
              <Td>{company.description}</Td>
              <Td >
                <Link to={`/ucompany/${company.id}`}>
                  <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                    Editar
                  </Button> 
                </Link>
              </Td>
              <Td >
                <Link to='/lcompany'>
                  <Button as='a' size='sm' fontSize='sm' colorScheme='red'  rightIcon={<Icon as={RiCloseLine} fontSize='16' />} onClick={() =>handleDelete(company.id)}>
                    Deletar
                  </Button> 
                </Link>
              </Td>
            </Tr>
          ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}