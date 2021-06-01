import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  StackDivider,
  VStack
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import apiService from '../services/api';

function ApprovalPage() {
  const [user, setUser] = useState({});

  const { cpf } = useParams();

  useEffect(() => {
    apiService.fetchUser(cpf).then((result) => setUser(result));
  }, []);

  console.log(user);
  const { conhecimentos } = user;
  return (
    <Container>
      <Heading size="lg">{user.nome}</Heading>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Box>{user.email}</Box>
        <Box>{user.cpf}</Box>
        <Box>{user.celular}</Box>
        <Box>{`${conhecimentos[0]}, ${conhecimentos[1]}, ${conhecimentos[2]}`}</Box>
      </VStack>
    </Container>
  );
}

export default ApprovalPage;
