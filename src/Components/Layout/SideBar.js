import { Box, Button, Code, Stack } from "@chakra-ui/react";
import { useAuth } from "../../Hooks/Auth";
import { PROTECTED, USERS } from "../../Routes/Routes";
import { Link } from "react-router-dom";
import ProfileAvatar from "../../Pages/Profile/ProfilePhoto";

function ActiveUser() {
  const { user, isLoading } = useAuth();

  if (isLoading) return "Loading...";

  return (
    <Stack align="center" spacing="5" my="20">
      <ProfileAvatar user={user} />
      <Code>@{user.username}</Code>
      <Button
        colorScheme="teal"
        w="full"
        as={Link}
        to={`${PROTECTED}/profile/${user.id}`}
      >
        Edit Profile
      </Button>
    </Stack>
  );
}

export default function Sidebar() {
  return (
    <Box
      px="6"
      height="100vh"
      w="100%"
      maxW="300px"
      bgGradient="linear(to-t,#63B3ED,#4FD1C5 )"
      position="sticky"
      top="16"
      display={{ base: "none", md: "block" }}
    >
      <ActiveUser />
      <Box align="center">
        <Box as="ul" borderBottom="2px solid" borderColor="black" />
        <Button
          variant="solid"
          colorScheme="blackAlpha"
          as={Link}
          to={USERS}
          mt="4"
          size="sm"
        >
          ALL USERS
        </Button>
      </Box>
    </Box>
  );
}