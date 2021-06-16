import { ActiveCardItem} from '../../components/ActiveCardItem';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import {FormControl,FormLabel,Select,Flex} from '@chakra-ui/react'

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
  status: string;
  health_level: number;
}

export function Home () {
  const [actives, setActives] = useState<Actives[]>([]);

  useEffect( () => {
    api.get('/actives').then(response => setActives(response.data));
  },[]);


  return(
    <>
      {actives.map(active =>(
        <ActiveCardItem
          description = {active.description}
          health_level = {active.health_level}
          image ={active.image}
          model = {active.model}
          name = {active.name}
          responsible = {active.responsible}
          status = {active.status}
          key = {active.id}
        />
      ))}
    </>
  )
}