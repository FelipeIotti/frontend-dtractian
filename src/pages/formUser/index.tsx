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


interface CreateUserFormData {
  name: string;
  description: string;
  company_id: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
});

interface UserInput{
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
export function FormUser(){
  const [companys, setCompanys] = useState<Company[]>([]);
  const [select, setSelect] = useState('');
  const [error,setError] = useState();
  const history = useHistory();

  useEffect( () => {
    api.get('/company').then(response => setCompanys(response.data));
  },[]);

  async function createUser (userInput:UserInput){

    companys.filter((company)=>{
      if(company.name===select){
        userInput.company_id=company.id;
      }
    });
    try{
      await api.post('/users',userInput);
      history.push("/lusers");
    }
    catch(err){
      setError(err);
    }
  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<CreateUserFormData>({resolver: yupResolver(createUserFormSchema),});

  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(createUser)} >

      <Heading size='lg' fontWeight='normal'>Criar Usuário</Heading>

      { error &&(
        <Alert status="error" variant='solid' borderRadius='md' mt='4' >
        <AlertIcon />
        <AlertTitle mr={2}>Esse usuário já existe!</AlertTitle>
        <AlertDescription>Crie um usuário com outro nome.</AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
      )}

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8' >
        <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%' >
          <Input  label='Nome completo' error={errors.name} {...register("name")}/>
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
            
            <Link to='/lusers'>
              <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
            </Link>  
              <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting} >Confirmar</Button>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
}