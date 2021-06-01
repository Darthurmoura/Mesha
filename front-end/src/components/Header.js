import React from 'react';
import {
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      color="black"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          Chakra UI
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "block" }}>
        <Link to='/registros'>
          Validar Registros
        </Link>
      </Box>
    </Flex>
  )
};

export default Header;
