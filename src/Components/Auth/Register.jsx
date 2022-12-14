import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { HOME, LOGIN } from "../../Routes/Routes"
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "../../Hooks/Auth"; 
import { useForm } from "react-hook-form";
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from "../../Utils/Validate"

export default function Register() {
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleRegister(data) {
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: HOME,
    });
  }

  return (
    <Center w="100%" h="100vh">
      <Box mx="2" maxW="md" p="10" borderWidth="1px" borderRadius="lg">
        <Heading mb="5" size="lg" textAlign="center">
          <Text
          bgGradient="linear(to-l,#63B3ED,#4FD1C5 )"
          bgClip='text'
          fontSize='5xl'
          fontWeight='extrabold'
          >
            REGISTER
          </Text>
        </Heading>

        <form onSubmit={handleSubmit(handleRegister)}>
          <FormControl isInvalid={errors.username} py="2">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="username"
              {...register("username", usernameValidate)}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} py="2">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password} py="2">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password123"
              {...register("password", passwordValidate)}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
          mt="4"
          type="submit"
          bgGradient='linear(to-r, cyan.500, teal.800)'
          _hover={{
            bgGradient: 'linear(to-r, teal.500, cyan.800)',
          }}
          size="md"
          w="full"
            isLoading={isLoading}
            loadingText="Signing Up"
          >
            Register
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="6">
          Already have an account?{" "}
          <Link
            as={RouterLink}
            to={LOGIN}
            color="telegram.100"
            fontWeight="bold"   
          >
            LogIn
          </Link>
        </Text>
      </Box>
    </Center>
  );
}