import React, { useState, useEffect } from 'react';

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  HStack,
  Input,
} from "@chakra-ui/react";

function Form() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [conhecimentos, setConhecimentos] = useState([]);

  useEffect(() => {
    const emailRegex = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
    if (emailRegex.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email, cpf]);

  const cpfMask = (e) => {
    // código encontrado em: https://tinyurl.com/yykqa5l9
    return e
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
  };

  const celularMask = (e) => {
    return e
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
  };

  const skillStack = ['Git', 'React', 'PHP', 'NodeJS', 'DevOps', 'Banco de Dados', 'TypeScript'];

  const renderConhecimentos = (skills) => {
    const checkboxElements = skills.map(skill => {
      return (
        <Checkbox
          value={skill}
          size="md"
          colorScheme="purple"
          onChange={e => setConhecimentosValues(e)}
          isDisabled={(conhecimentos.length === 3) ? (conhecimentos.includes(skill) ? false : true) : false}
        >
          {skill}
        </Checkbox>
      )
    });
    return checkboxElements;
  };

  const setConhecimentosValues = (e) => {
    if (conhecimentos.includes(e.target.value)) {
      const removedCheckbox = conhecimentos.filter(chkbx => chkbx !== e.target.value);
      setConhecimentos([...removedCheckbox]);
    } else {
      setConhecimentos([...conhecimentos, e.target.value]);
    };
  };

  const handleSubmit = async () => {
    await registerUser(nome, email, cpf, celular, conhecimentos);
  };

  return (
    <Container maxW="container.lg" centerContent>
      <Grid>
        <form onSubmit={handleSubmit()}>
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              onChange={e => setNome(e.target.value)}
              placeholder="Insira o seu nome completo"
              size="lg"
              focusBorderColor="blue.500"
              errorBorderColor="red"
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>E-mail</FormLabel>
            <Input
              type="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="Insira o seu e-mail"
              size="md"
              value={ email }
              focusBorderColor="blue.500"
              errorBorderColor="red"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>CPF</FormLabel>
            <Input
              type="text"
              placeholder="Insira o seu CPF"
              onChange={ e => setCpf(cpfMask(e.target.value)) }
              size="md"
              value={ cpf }
              focusBorderColor="blue.500"
              errorBorderColor="red"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Celular</FormLabel>
            <Input
              type="text"
              placeholder="Insira o número do seu celular"
              onChange={ e => setCelular(celularMask(e.target.value)) }
              size="md"
              value={ celular }
              focusBorderColor="blue.500"
              errorBorderColor="red"
            />
          </FormControl>
          <CheckboxGroup colorScheme="purple" isRequired>
            Escolha pelo menos 1 skill e no máximo 3:
            <HStack direction="row" spacing="24px">
              {renderConhecimentos(skillStack)}
            </HStack>
          </CheckboxGroup>
          <Button type="submit">Registrar</Button>
        </form>
      </Grid>
    </Container>
  );
}

export default Form;