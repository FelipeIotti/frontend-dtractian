import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,FormControl,Select,FormLabel} from "@chakra-ui/react";
import {Input} from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory, useParams} from 'react-router-dom';
import api from "../../services/api";
import { useEffect, useState } from "react";


interface CreateActiveFormData {
  name: string;
  image: string;
  description: string;
  model: string;
  units_id: string;
  responsible_id: string;
  responsible: string;
  company_id: string;
  status: string ;
  health_level: number;
}

const createActiveFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  image: yup.string().required('Imagem obrigatória').url('url inválida'),
  model: yup.string().required('modelo obrigatório'),
  health_level: yup.number().required('Nivel de saúde obrigatório').min(1,'Valor entre 0 a 100').max(100,'Valor entre 0 a 100').positive('Apenas valor positivo')
});

interface ActiveInput{
  name: string;
  image: string;
  description: string;
  model: string;
  units_id: string;
  responsible_id: string;
  responsible: string;
  company_id: string;
  status: string;
  health_level: number;
}


interface Unit {
  id: string;
  name: string;
  description: string;
  company_id: string;
  created_at: Date;
}

interface User {
  id: string;
  name: string;
  company_id: string;
  created_at: Date;
}

interface activeId {
  id: string;
}


export function UpdateActive(){
  const [units, setUnits] = useState<Unit[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectStatus, setSelectStatus] = useState('');
  const [companyId, setCompanyId] =useState('');
  const [selectUnits, setSelectUnits] = useState('');
  const [selectUser, setSelectUser] = useState('');
  const history = useHistory();

  const activeId = useParams<activeId>();

  useEffect( () => {
    api.get('/units').then(response => setUnits(response.data));
    api.get('/users').then(response => setUsers(response.data));
  },[]);

  async function createActive (activeInput:ActiveInput){

    units.filter((unit)=>{
      if(unit.name===selectUnits){
        activeInput.units_id=unit.id;
        activeInput.company_id=unit.company_id
      }
    });

    users.filter((user)=>{
      if(user.name===selectUser){
        activeInput.responsible_id=user.id;
        activeInput.responsible= user.name;
        activeInput.status = selectStatus;
        
      }
    });
    console.log (selectStatus);
    console.log(activeInput)
    await api.put('/actives/'+activeId.id,activeInput);
    history.push('/lactives')
  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<CreateActiveFormData>({resolver: yupResolver(createActiveFormSchema),});

  function handleSelect(event: string){
    setSelectUnits(event);
    const unitHandle = units.filter(unit =>unit.name ===event);
    setCompanyId(unitHandle[0].company_id);
  }

  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(createActive)} >

      <Heading size='lg' fontWeight='normal'>Atualizar ativo</Heading>

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8' >
        <SimpleGrid minChildWidth='400px' spacing={['6','8']} w='100%' >
          <Input  label='Nome completo' error={errors.name} {...register("name")}/>
          <Input  label='Endereço da imagem' error={errors.image} {...register("image")}/>
          <Input  label='Descrição' error={errors.description} {...register("description")}/>
          <Input  label='Modelo' error={errors.model} {...register("model")}/>
          <Input  label='Nivel de saúde %' error={errors.health_level} {...register("health_level")}/>
          <FormControl mr='10' >
            <FormLabel>Status</FormLabel>
            <Select placeholder='Selecionar status' onChange={event=>setSelectStatus(event.target.value)} >
              <option>Em operação</option>
              <option>Em alerta</option>
              <option>Em parada</option>
            </Select>
          </FormControl>
        </SimpleGrid>
      </VStack>
      <Flex>
        <FormControl mr='10' mt='8'>
          <Select placeholder="Selecionar unidade" onChange={event=>handleSelect(event.target.value)} >
            {units.map(unit =>(
              <option>{unit.name}</option>
            ))}
          </Select>
        </FormControl>
        <FormControl mr='10' mt='8'>
          <Select placeholder="Selecionar resposável" onChange={event=>setSelectUser(event.target.value)} >
          {
            users.filter(user=> user.company_id=== companyId).map(filteredUser => (
              <option>
                {filteredUser.name}
              </option>
            ))
          }
          </Select>
        </FormControl>
        <Flex mt='8' justify='flex-end' >
          <HStack>
            
            <Link to='/lactives'>
              <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
            </Link>  
              <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting} >Confirmar</Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}