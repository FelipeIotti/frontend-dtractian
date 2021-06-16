import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack,FormControl,Select,Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,CloseButton} from "@chakra-ui/react";
import {Input} from '../../components/Form/Input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory} from 'react-router-dom';
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
export function FormUnit(){
  const [companys, setCompanys] = useState<Company[]>([]);
  const [select, setSelect] = useState('');
  const [error,setError] = useState();
  const history = useHistory();

  useEffect( () => {
    api.get('/company').then(response => setCompanys(response.data));
  },[]);

  async function createUnit (unitInput:UnitInput){

    companys.filter((company)=>{
      if(company.name===select){
        unitInput.company_id=company.id;
      }
    });
    try{
      await api.post('/units',unitInput);
      history.push('/lunits');
    }
    catch(err){
      setError(err);
    }
  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<CreateUnitFormData>({resolver: yupResolver(createUnitFormSchema),});

  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(createUnit)} >

      <Heading size='lg' fontWeight='normal'>Criar Unidade</Heading>

      { error &&(
        <Alert status="error" variant='solid' borderRadius='md' mt='4' >
        <AlertIcon />
        <AlertTitle mr={2}>Esse unidade já existe!</AlertTitle>
        <AlertDescription>Crie um unidade com outro nome.</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
      )}

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8' >
        <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%' >
          <Input  label='Nome completo' error={errors.name} {...register("name")}/>
          <Input  label='Descrição' error={errors.description} {...register("description")}/>
        </SimpleGrid>
      </VStack>
      <Flex>
        <FormControl mr='10' mt='8'>
          <Select placeholder="Selecionar empresa" onChange={event=>setSelect(event.target.value)} >
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