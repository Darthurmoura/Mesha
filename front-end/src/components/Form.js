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

import apiService from '../services/api';

function Form() {
  const [nome, setNome] = useState('');
  const [validNome, setValidNome] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [cpf, setCpf] = useState('');
  const [validCpf, setValidCpf] = useState(false);
  const [celular, setCelular] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [conhecimentos, setConhecimentos] = useState([]);

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

  const enableButton = () => {
    if (validNome && validEmail && validCpf && conhecimentos.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const validateNome = () => {
    if (nome.length > 0) {
      setValidNome(true);
    } else {
      setValidNome(false);
    }
  };

  const validateEmail = () => {
    const regex = /^[a-z0-9_.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
    const valid = regex.test(email);
    if (email.length > 0 && valid) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const validateCpf = () => {
    if (cpf.length === 14) {
      setValidCpf(true);
    } else {
      setValidCpf(false);
    }
  };

  useEffect(() => {
    validateNome();
    validateEmail();
    validateCpf();
    enableButton();
  }, [nome, email, cpf, conhecimentos]);

  const handleSubmit = () => {
    const user = { nome, email, cpf, celular, conhecimentos };
    apiService.registerUser(user);
    setNome('');
    setEmail('');
    setCpf('');
    setCelular('');
    setConhecimentos([]);
  };

  return (
    <Container maxW="container.lg" centerContent>
      <Grid>
        <form>
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              type="text"
              onChange={e => setNome(e.target.value)}
              placeholder="Insira o seu nome completo"
              isInvalid
              variant="filled"
              size="lg"
              value={nome}
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
              variant="filled"
              isInvalid
              size="md"
              value={email}
              focusBorderColor="blue.500"
              errorBorderColor="red"
            />
          </FormControl>
          <FormControl isRequired isInvalid={!validCpf}>
            <FormLabel>CPF</FormLabel>
            <Input
              type="text"
              placeholder="Insira o seu CPF"
              onChange={ e => setCpf(cpfMask(e.target.value)) }
              variant="filled"
              size="md"
              value={cpf}
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
              variant="filled"
              size="md"
              value={celular}
              focusBorderColor="blue.500"
              errorBorderColor="red"
            />
          </FormControl>
          <CheckboxGroup colorScheme="purple" isRequired isInvalid={conhecimentos.length === 0}>
            Escolha pelo menos 1 skill e no máximo 3:
            <HStack direction="row" spacing="24px">
              {renderConhecimentos(skillStack)}
            </HStack>
          </CheckboxGroup>
          <Button
            onClick={handleSubmit}
            isDisabled={isDisabled}
          >
            Registrar
          </Button>
        </form>
      </Grid>
    </Container>
  );
}

export default Form;