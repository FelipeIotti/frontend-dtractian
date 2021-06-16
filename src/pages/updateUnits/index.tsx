import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,FormControl,Select} from "@chakra-ui/react";
import {Input} from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory, useParams} from 'react-router-dom';
import api from "../../services/api";
import { useEffect, useState } from "react";


interface CreateUnitFormData {
  name: string;
  description: string;
  company_id: string;
}

const createUnitFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
});

interface UnitInput{
  name: string;
  description: string;
  company_id: string;
}

interface Company {
  id: string;
  name: string;
  description: string;
  created_at: Date;
}

interface unitId {
  id: string;
}

export function UpdateUnit(){
  const [companys, setCompanys] = useState<Company[]>([]);
  const [selectCompany, setSelectCompany] = useState('');
  const history = useHistory();

  const unitId = useParams<unitId>();

  useEffect( () => {
    api.get('/company').then(response => setCompanys(response.data));
  },[]);

  async function createUnit (unitInput:UnitInput){

    companys.filter((company)=>{
      if(company.name===selectCompany){
        unitInput.company_id=company.id;
      }
    });

    await api.put('/units/'+unitId.id,unitInput);
    history.push('/lunits');
  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<CreateUnitFormData>({resolver: yupResolver(createUnitFormSchema),});

  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(createUnit)} >

      <Heading size='lg' fontWeight='normal'>Atualizar unidade</Heading>

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8' >
        <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%' >
          <Input  label='Nome completo' error={errors.name} {...register("name")}/>
          <Input  label='Descrição' error={errors.description} {...register("description")}/>
        </SimpleGrid>
      </VStack>
      <Flex>
        <FormControl mr='10' mt='8'>
          <Select placeholder="Selecionar empresa" onChange={event=>setSelectCompany(event.target.value)} >
            {companys.map(company =>(
              <option>{company.name}</option>
            ))}
          </Select>
        </FormControl>
        <Flex mt='8' justify='flex-end' >
          <HStack>        
            <Link to='/lunits'>
              <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
            </Link>  
              <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting} >Confirmar</Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}