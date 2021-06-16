import { Box, Text,Image,Flex,Button, theme } from '@chakra-ui/react';
import Chart from "react-apexcharts";

//const Chart =dynamic(()=> import('react-apexcharts'),{ssr:false});


const options = {
    labels: ['Nivel Saúde',''],
    title: {
      text: 'Nivel Saúde',
      style: {
        fontSize:  '14px',
        fontWeight:  'bold',
        fontFamily:  undefined,
        color: 'white'
      }
    },
    chart: {
      toolbar:{
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip:{
      enabled: false,
    },
    fill: {
      type: 'solid',
      colors: ['#6B46C1','#B83280'],
    },
    legend:{
      show: false,
    },
    stroke: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: false,
            name: {
              show:true,
              showAlways: true,
              fontSize: '20px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              color: '#FFFFFF'
            },
            value: {
              show:true,
              showAlways: true,
              fontSize: '20px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              color: '#FFFFFF'
            },
            
          }
        }
      }
    }
    
};

interface ActiveCardItemProps {
  name: string;
  image: string;
  description: string;
  model: string;
  responsible: string;
  status: string;
  health_level: number;
}

export function ActiveCardItem({description, name,health_level,image,model,responsible,status,}:ActiveCardItemProps){
  function statusColor (value: string){
    if(value === 'Em operação'){
      return 'green';
    }
    else if(value === 'Em alerta'){
      return 'yellow' ;
    }
    else if(value === 'Em parada'){
      return 'red';
    }
  }
  return(
    <Box
      p={['6','6']}
      bg='gray.800'
      borderRadius={8}
      pb='4'
    > 
    <Flex justify="space-between" mb='2' >
      <Button as='a' size='sm' fontSize='sm' colorScheme='pink' minWidth='150'  >
        {name}
      </Button> 
      <Button as='a' size='sm' fontSize='sm' colorScheme='purple' minWidth='150' >
        {responsible}
      </Button> 
      <Button as='a' size='sm' fontSize='sm' colorScheme={statusColor(status)} minWidth='150' variant='outline' >
         {status}
      </Button> 
    </Flex>
      <Flex justify="space-between">
        <Chart options={options} series={[health_level,100-health_level]} type='donut' width='160'/>
        <Flex direction='column' maxWidth='150' hight= '150'justify='space-between' align='flex-start'>
          <Text fontSize='md'  minWidth='150' minHight= '100'>{description}</Text>
          <Button as='a' size='sm' fontSize='sm'  colorScheme='purple' minWidth='150'>
            {model}
          </Button> 
        </Flex>
        <Image 
          src={image} 
          alt={name} 
          borderRadius='md' 
          maxWidth='150'
        />
      </Flex>
    </Box>
  );
}