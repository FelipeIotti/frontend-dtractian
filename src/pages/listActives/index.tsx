import { Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,Icon,Button,Box,Flex,FormControl,Select,FormLabel
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";
import api from "../../services/api";
import {Link} from 'react-router-dom';

interface Actives {
  id: string;
  name: string;
  image: string;
  description: string;
  model: string;
  units_id: string;
  responsible_id: string;
  responsible: string;
  company_id: string;
  status: 'em operacao' |  'em alerta' | 'em parada' ;
  health_level: number;
}

interface Company {
  id: string;
  name: string;
  description: string;
  created_at: Date;
}

interface Unit {
  id: string;
  name: string;
  description: string;
  company_id: string;
  created_at: Date;
}

export function ListActives(){
  const [actives, setActives] = useState<Actives[]>([]);
  const [companys, setCompanys] = useState<Company[]>([]);
  const [selectCompany,setSelectCompany] =useState('');
  

  const [units, setUnits] = useState<Unit[]>([]);
  const [selectUnit,setSelectUnit] =useState('');


  const [companyId, setCompanyId] =useState('');


  useEffect( () => {
    api.get('/actives').then(response => setActives(response.data));
    api.get('/company').then(response => setCompanys(response.data));
    api.get('/units').then(response => setUnits(response.data));
  },[actives]);


  function statusColor (value: string){
    if(value === 'Em operação'){
      return 'green';
    }
    else if(value === 'Em alerta'){
      return 'yellow';
    }
    else if(value === 'Em parada'){
      return 'red';
    }
  }

  async function handleDelete(value: string){
    await api.delete('/actives/'+value)
  }

  function handleSelect(event: string){
    setSelectCompany(event);
    const unitHandle = companys.filter(unit =>unit.name ===event);
    if(unitHandle[0].id !== undefined){
      setCompanyId(unitHandle[0].id);
    }
  }


  return(
    <Flex direction='column'>
      <Flex>
        <FormControl mr='10' >
          <FormLabel>Filtrar por empresa</FormLabel>
          <Select onChange={event=>handleSelect(event.target.value)}>
          {
            companys.map(company=>(
              <option>{company.name}</option>
            ))
          }
          </Select>
        </FormControl>
        <FormControl mr='10' >
          <FormLabel>Filtrar por unidade</FormLabel>
          <Select placeholder="Filtrar por Unidade" onChange={event=>setSelectUnit(event.target.value)} >
          {
          units.filter(unit=> unit.company_id=== companyId).map(filteredUser => (
              <option key={filteredUser.id}>
                {filteredUser.name}
              </option>
            ))
          }
          </Select>
        </FormControl>
        <Link to='/factive'>
          <Button as='a' size='sm' fontSize='sm' colorScheme='green'  rightIcon={<Icon as={RiAddLine} fontSize='16' />} maxWidth='200'mt='8' >
            Adicionar Ativo
          </Button>
        </Link> 
      </Flex>  
      <Box flex='1' borderRadius={8} bg='gray.800' p='8' mt='4' >
        <Table colorScheme='whiteAlpha'>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Modelo</Th>
              <Th>Responsável</Th>
              <Th>Status</Th>
              <Th>Nivel de saúde</Th>
              <Th>Editar</Th>
              <Th>Deletar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
            selectCompany!=='' ?
            (
              selectUnit!=='' ?
              (
                actives
                .filter(unit=>unit.company_id===(companys.filter(company=>company.name===selectCompany))[0].id)
                .filter(unit=>unit.units_id===(units.filter(company=>company.name===selectUnit))[0].id)
                .map(active=>(
                  <Tr key={active.id}>
                    <Td>{active.name}</Td>
                    <Td>{active.description}</Td>
                    <Td>{active.responsible}</Td>
                    <Td>
                      <Button as='a' size='sm' fontSize='sm' colorScheme={statusColor(active.status)} >
                        {active.status}
                      </Button> 
                    </Td>
    
                    <Td>{active.health_level}</Td>
                    <Td >
                      <Link to={`/uactives/${active.id}`}>
                        <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                          Editar
                        </Button> 
                      </Link>
                    </Td>
                    <Td >
                      
                        <Button 
                          as='a' 
                          type='submit' 
                          size='sm' 
                          fontSize='sm' 
                          colorScheme='red'  
                          rightIcon={<Icon as={RiCloseLine} 
                          fontSize='16' />} 
                          onClick={() =>{handleDelete(active.id)}}
                        >
                          Deletar
                        </Button> 
                      
                    </Td>
                </Tr>
                ))
              ):(actives.filter(unit=>unit.company_id===(companys.filter(company=>company.name===selectCompany))[0].id).map(active=>(
                <Tr key={active.id}>
                  <Td>{active.name}</Td>
                  <Td>{active.description}</Td>
                  <Td>{active.responsible}</Td>
                  <Td>
                    <Button as='a' size='sm' fontSize='sm' colorScheme={statusColor(active.status)} >
                      {active.status}
                    </Button> 
                  </Td>
  
                  <Td>{active.health_level}</Td>
                  <Td >
                    <Link to={`/uactives/${active.id}`}>
                      <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                        Editar
                      </Button> 
                    </Link>
                  </Td>
                  <Td >
                    
                      <Button 
                        as='a' 
                        type='submit' 
                        size='sm' 
                        fontSize='sm' 
                        colorScheme='red'  
                        rightIcon={<Icon as={RiCloseLine} 
                        fontSize='16' />} 
                        onClick={() =>{handleDelete(active.id)}}
                      >
                        Deletar
                      </Button> 
                    
                  </Td>
              </Tr>)
              ))
            ):(
              actives.map(active=>(
              <Tr key={active.id}>
                <Td>{active.name}</Td>
                <Td>{active.description}</Td>
                <Td>{active.responsible}</Td>
                <Td>
                  <Button as='a' size='sm' fontSize='sm' colorScheme={statusColor(active.status)} >
                    {active.status}
                  </Button> 
                </Td>

                <Td>{active.health_level}</Td>
                <Td >
                  <Link to={`/uactives/${active.id}`}>
                    <Button as='a' size='sm' fontSize='sm' colorScheme='purple'  rightIcon={<Icon as={RiPencilLine} fontSize='16' />} >
                      Editar
                    </Button> 
                  </Link>
                </Td>
                <Td >
                  
                    <Button 
                      as='a'
                      type='submit' 
                      size='sm' 
                      fontSize='sm' 
                      colorScheme='red'  
                      rightIcon={<Icon as={RiCloseLine} 
                      fontSize='16' />} 
                      onClick={() =>{handleDelete(active.id)}}
                    >
                      Deletar
                    </Button> 
                  
                </Td>
            </Tr>
            )))}
          </Tbody>
        </Table>
      </Box>
    </Flex>  
  );
}