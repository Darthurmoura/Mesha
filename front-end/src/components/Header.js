import React from 'react';
import {
  Flex,
  Heading,
} from '@chakra-ui/react';

import AdminLoginPopover from './AdminLoginPopover';
import '../App.css';

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
        <Heading
          as="h1"
          className="header--title"
          fontFamily="Amatic SC"
          fontSize="3em"
          fontWeight="100"
          letterSpacing={"tighter"}>
          manga rosa
        </Heading>
      </Flex>

      <AdminLoginPopover />
    </Flex>
  )
};

export default Header;
