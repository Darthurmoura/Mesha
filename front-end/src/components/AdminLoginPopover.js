import { Button, ButtonGroup } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useDisclosure } from '@chakra-ui/hooks';
import { Input } from '@chakra-ui/input';
import { Box, Stack } from '@chakra-ui/layout';
import { Popover, PopoverArrow, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/popover';
import React, { useRef } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

const Form = ({ firstFieldRef, onCancel }) => {
  return (
    <Stack spacing={4}>
      <TextInput
        label="Login"
        id="login"
        ref={firstFieldRef}
        defaultValue=""
      />
      <TextInput label="Password" id="password" type="password" defaultValue="" />
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button colorScheme="teal">
          <Link to='/registros'>
            Login
          </Link>
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const AdminLoginPopover = () => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = useRef(null)

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
      >
        <PopoverTrigger>
          <Box d="inline-block" mr={3}>
            Validar Registros
          </Box>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
        </PopoverContent>
      </Popover>
    </>
  )
}

export default AdminLoginPopover;
