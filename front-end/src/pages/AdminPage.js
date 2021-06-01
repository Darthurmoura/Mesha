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
  Container
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

import apiService from '../services/api';

export default function AdminPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    apiService.getUsers().then((result) => {
      setUsers(result);
    });
  });

  console.log(users);

  return (
    <Container w={[200, 600, 700]} centerContent>
      <Table
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        colorScheme="purple"
        size="md"
        w={[200, 400, 600]}
      >
        <Thead bg="gray.100" borderRadius={8}>
          <Tr>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Aprovação</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => {
            return (
              <Tr key={`${user} ${index}`}>
                <Td>{user.nome}</Td>
                <Td>{user.email}</Td>
                <Td>{user.aprovado ? "Aprovado" : "Não aprovado"}</Td>
                <Td>
                  <Link to={`/${user.cpf}/aprovar`}>
                    <ChevronRightIcon w={8} h={8} />
                  </Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
}
