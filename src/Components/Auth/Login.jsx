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
import { HOME, REGISTER } from "../../Routes/Routes";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "../../Hooks/Auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "../../Utils/Validate";

export default function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    login({
      email: data.email,
      password: data.password,
      redirectTo: HOME,
    });
  }

  return (
    <Center  w="100%" h="100vh" >
      <Box mx="2" maxW="md" p="10" borderWidth="1px" borderRadius="lg" >
        <Heading mb="5" size="lg" textAlign="center">
          <Text
            bgGradient="linear(to-l,#63B3ED,#4FD1C5 )"
            bgClip='text'
            fontSize='5xl'
            fontWeight='extrabold'
          >
            LOGIN
          </Text>
        </Heading>

        <form onSubmit={handleSubmit(handleLogin)}>
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
            loadingText="Logging In"
          >
            Login
          </Button>
        </form>

        <Text fontSize="xlg" align="center" mt="6">
          Don't have an account?{" "}
          <Link
            as={RouterLink}
            to={REGISTER}
            color="telegram.100"
            fontWeight="bold"            
          >
            Register
          </Link>
        </Text>
      </Box>
    </Center>
  );
}