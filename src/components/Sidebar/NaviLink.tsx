import { Icon, Link as ChakraLink , Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from "react";
//import { ActiveLink } from "../ActiveLink";

interface NaviLinkProps extends ChakraLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NaviLink({icon, children, href, ...rest}:NaviLinkProps){
  return(
    // <ActiveLink href={href} passHref>
      <ChakraLink display='flex' align='center' {...rest} >
        <Icon as={icon} fontSize='20' />
        <Text ml='4' fontWeight='medium' >{children}</Text>
      </ChakraLink>
    // </ActiveLink>
  );
}