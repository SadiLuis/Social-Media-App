import { Button, Flex, Link } from "@chakra-ui/react";
import { HOME } from "../../Routes/Routes";
import { Link as RouterLink  } from "react-router-dom";
import { useLogout } from "../../Hooks/Auth";


 export default function NavBar () {
    const { logout, isLoading } = useLogout();

  return (
    <Flex
      shadow="md"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="teal.400"
      height="16"
      zIndex="3"
      justify="center"
      bgGradient="linear(to-l, #63B3ED, #4FD1C5)"
    >
      <Flex px="4" w="full" align="center" maxW="1200px">
        <Button
         as={RouterLink}
         to={HOME}
         colorScheme="cyan"
         size="sm"
        >
         Home
        </Button>

       

        <Button
          ml="auto"
          colorScheme="teal"
          size="sm"
          onClick={logout}
          isLoading={isLoading}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}

