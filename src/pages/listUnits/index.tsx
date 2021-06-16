import { Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,Icon,Button,Flex,Box,FormControl,Select} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";
import api from "../../services/api";
import {Link} from 'react-router-dom';

interface Units {
  id: string;
  name: string;
  description: string;
  company_id: string;
  created_at: Date;
}

interface Company {
  id: string;
  name: string;
  description: string;
  created_at: Date;
}

export function ListUnits(){
  const [units, setUnits] = useState<Units[]>([]);
  const [companys, setCompanys] = useState<Company[]>([]);
  const [selectCompany,setSelectCompany] =useState('');

  useEffect( () => {
    api.get('/units').then(response => setUnits(response.data));
    api.get('/company').then(response => setCompanys(response.data));
  },[units]);

  async function handleDelete(value: string){
    await api.delete('/units/'+value)
  }

  return(
    <Flex direction='column'>
      <Flex>
        <FormControl mr='10' >
          <Select placeholder='Filtrar por Empresa' onChange={event=>setSelectCompany(event.target.value)}>
            {
              companys.map(company=>(
                <option>{company.name}</option>
              ))
            }
          </Select>
        </FormControl>
        <Link to='/funit'>
          <Button as='a' size='sm' fontSize='sm' colorScheme='green'  rightIcon={<Icon as={RiAddLine} fontSize='16' />} maxWidth='200' >
          Adicionar unidade
          </Button>
        </Link> 
      </Flex>
      <Box flex='1' borderRadius={8} bg='gray.800' p='8' mt='4' >
        <Table colorScheme='whiteAlpha'>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Descrição</Th>
              <Th>Editar</Th>
              <Th>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
            selectCompany!=='' ?
            (units.filter(unit=>unit.company_id===(companys.filter(company=>company.name===selectCompany))[0].id).map(unit =>(
              <Tr key={unit.id}>
                <Td>{unit.name}</Td>
                <Td>{unit.description}</Td>
                <Td >
                  <Link to={`/uunits/${unit.id}`}>
                    <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                      Editar
                    </Button> 
                  </Link>  
                </Td>
                <Td >
                <Link to='/lunits'>
                  <Button as='a' size='sm' fontSize='sm' colorScheme='red'  rightIcon={<Icon as={RiCloseLine} fontSize='16' />} onClick={()=>handleDelete(unit.id)} >
                    Deletar
                  </Button> 
                </Link>
                </Td>
              </Tr>
            ))
            ):(
            units.map(unit =>(
              <Tr key={unit.id}>
                <Td>{unit.name}</Td>
                <Td>{unit.description}</Td>
                <Td >
                  <Link to={`/uunits/${unit.id}`}>
                    <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                      Editar
                    </Button> 
                  </Link>  
                </Td>
                <Td >
                  <Link to='/lunits'>
                    <Button as='a' size='sm' fontSize='sm' colorScheme='red'  rightIcon={<Icon as={RiCloseLine} fontSize='16' />} onClick={()=>handleDelete(unit.id)} >
                      Deletar
                    </Button> 
                    </Link>
                </Td>
              </Tr>
            )))
            
            }
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}