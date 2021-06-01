import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  StackDivider,
  VStack
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import apiService from '../services/api';

function ApprovalPage() {
  const [user, setUser] = useState({});
  const [aprovado, setAprovado] = useState();
  const [conhecimentos, setConhecimentos] = useState([]);

  const { nomedocolaborador } = useParams();
  console.log(nomedocolaborador)

  useEffect(() => {
    apiService.getUser(nomedocolaborador).then(response => {
      setUser(response.data[0]);
      setConhecimentos(response.data[0].conhecimentos);
      setAprovado(response.data[0].aprovado);
    });
  }, []);

  const renderConhecimentos = () => {
    return (
      <Box>
        <Heading size="sm">Skills:</Heading>
        {conhecimentos.map(skill => `|${skill}| `)}
      </Box>
    )
  };

  const approveRegistration = () => {
    apiService.updateUser({ nome: nomedocolaborador });
    setAprovado(true);
  };

  return (
    <Container>
      <Heading size="lg">{user.nome}</Heading>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        <Box>
        <Heading size="sm">E-mail:</Heading>
          {user.email}
        </Box>
        <Box>
        <Heading size="sm">CPF:</Heading>
          {user.cpf}
        </Box>
        <Box>
        <Heading size="sm">Celular:</Heading>
          {user.celular}
        </Box>
        {renderConhecimentos()}
        <Box>
        <Heading size="sm">Registro aprovado?</Heading>
          {aprovado ? 'Sim' : 'Não'}
        </Box>
        <Button onClick={approveRegistration}>
          Validar Registro
        </Button>
      </VStack>
    </Container>
  );
}

export default ApprovalPage;
