import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps{
  showProfileData?: boolean;
}

export function Profile({showProfileData=true}:ProfileProps){
  return(
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box
          mr='4' textAlign='right'
        >
          <Text>Felipe Iotti</Text>
          <Text 
            color='gray.300' fontSize='small'
          >felipeizago@hotmail.com</Text>
        </Box>
      )}
      <Avatar
        size='md' name='Felipe Iotti' src='https://github.com/FelipeIotti.png'
      />
    </Flex>
  );
}