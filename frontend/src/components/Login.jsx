import { useState } from 'react';
import './Login.css';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import validateEmail from '../utilities/validateEmail';
import validatePassword from '../utilities/validatePassword';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handlerSubmit = (e) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (isValidEmail && isValidPassword) {
      const data = {
        email: email,
        password: password,
      };

      const postLogin = async () => {
        try {
          const res = await axios.post('http://localhost:3002/login', data, {
            withCredentials: true,
          });
        } catch (err) {
          setError('Invalid email or password');
        }
      };
      postLogin();
    }
  };

  const handlerShow = () => {
    setShow(!show);
  };

  return (
    <VStack spacing="5px">
      <FormControl>
        <p>{error}</p>
        <FormLabel>Email:</FormLabel>
        <Input
          type="email"
          id="name-log"
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel>Password:</FormLabel>
        <InputGroup>
          <Input
            id="password-log"
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlerShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* button */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={(e) => handlerSubmit(e)}
      >
        Confirm
      </Button>
    </VStack>
  );
};

export default Login;
