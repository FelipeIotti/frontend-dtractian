import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack} from "@chakra-ui/react";
import {Input} from '../../components/Form/Input';
import {useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Link, useHistory, useParams} from 'react-router-dom';
import api from "../../services/api";


interface CreateCompanyFormData {
  name: string;
  description: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
});

interface CompanyInput{
  name: string;
  description: string;
}

interface companyId {
  id: string;
}


export function UpdateCompany(){
  const companyId = useParams<companyId>();
  const history = useHistory();

  async function updateCompany (companyInput:CompanyInput){
    await api.put('/company/'+companyId.id,companyInput);
    history.push('/lcompany');
  }

  const {register, handleSubmit, formState, formState: { errors }} = useForm<CreateCompanyFormData>({resolver: yupResolver(createUserFormSchema),});

  return(
    <Box as='form' flex='1' borderRadius={8} bg='gray.800' p={['6','8']} onSubmit={handleSubmit(updateCompany)} >

      <Heading size='lg' fontWeight='normal'>Editar empresa</Heading>

      <Divider my='6' borderColor='gray.700' />

      <VStack spacing='8' >
        <SimpleGrid minChildWidth='240px' spacing={['6','8']} w='100%' >
          <Input  label='Nome completo' error={errors.name} {...register("name")}/>
          <Input  label='Descrição' error={errors.description} {...register("description")}/>
        </SimpleGrid>
      </VStack>
      <Flex mt='8' justify='flex-end' >
        <HStack>
          <Link to='/lcompany'>
            <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
          </Link>
          <Button type='submit' colorScheme='pink' isLoading={formState.isSubmitting}>
            Confirmar
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}