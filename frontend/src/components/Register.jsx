import { useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import './Register.css';
import validateEmail from '../utilities/validateEmail.js';
import validatePassword from '../utilities/validatePassword.js';
import matchPasswords from '../utilities/matchPasswords.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [image, setImage] = useState('');
  const [show, setShow] = useState(false);
  const [showRe, setShowRe] = useState(false);
  const [error, setError] = useState('');

  const handlerSubmit = (e) => {
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isMatchPasswords = matchPasswords(password, rePassword);

    if (isValidEmail && isValidPassword && isMatchPasswords) {
      const data = {
        name: name,
        email: email,
        password: password,
        rePassword: rePassword,
        image: image,
      };
      const registerUser = async () => {
        try {
          const res = await axios.post('http://localhost:3002/register', data, {
            withCredentials: true,
          });
        } catch (err) {
          setError(err);
        }
      };
      registerUser();
    }
  };

  const handlerShow = (e) => {
    setShow(!show);
  };
  const handlerShowRe = (e) => {
    setShowRe(!showRe);
  };

  return (
    <VStack spacing="5px">
      <FormControl>
        <p>{error}</p>
        {/* name */}
        <FormLabel>Name:</FormLabel>
        <Input
          id="name"
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* email */}
        <FormLabel>Email:</FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* password */}
        <FormLabel>Password:</FormLabel>
        <InputGroup>
          <Input
            id="password"
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
        {/* rePassword */}
        <FormLabel>rePassword:</FormLabel>
        <InputGroup>
          <Input
            id="re-password"
            type={showRe ? 'text' : 'password'}
            placeholder="Confirm Your Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handlerShowRe}>
              {showRe ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        {/* photo */}
        <FormLabel>Photo:</FormLabel>
        <Input
          id="image"
          placeholder="Enter Your Photo"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
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

export default Register;
