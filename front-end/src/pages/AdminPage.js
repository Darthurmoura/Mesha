import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Container,
  Tooltip
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

import apiService from '../services/api';

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiService.getUsers().then(response => setUsers(response.data))
  }, []);

  console.log(users);

  return (
    <Container w={[200, 600, 700]} centerContent>
      <Table
        borderWidth={0}
        borderRadius={8}
        boxShadow="xl"
        mt="20%"
        size="md"
        w={[200, 400, 600]}
      >
        <Thead
          bg="gray.100"
          borderRadius={8}
        >
          <Tr>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Aprovação</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody bg="gray.200">
        {users.map((user, index) => {
            return (
              <Tooltip
                label={`
                  Clique na seta ao lado para ver os detalhes deste usuário e validar o registro`}
              >
                <Tr
                  transition="all 0.2s ease"
                  _hover={{
                    background: "yellow.50",
                    color: "orange.600"
                  }}
                  key={`${user} ${index}`}
                >
                  <Td>{user.nome}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.aprovado ? "Validado" : "Não validado"}</Td>
                  <Td>
                    <Link to={`/${user.nome}/validar`}>
                      <ChevronRightIcon w={8} h={8} />
                    </Link>
                  </Td>
                </Tr>
              </Tooltip>
            );
          })}        </Tbody>
      </Table>
    </Container>
  );
}
