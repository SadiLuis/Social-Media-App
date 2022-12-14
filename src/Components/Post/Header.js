import { Box, Flex, Text } from "@chakra-ui/react";
import { useUser } from "../../Hooks/Users";
import { formatDistanceToNow } from "date-fns";
import ProfileAvatar from "../../Pages/Profile/ProfilePhoto";
import BtnUser from "../../Pages/Profile/UserBTN";



export default function Header({ post }) {
    const { uid, date } = post;
    const { user, isLoading } = useUser(uid);
  
    if (isLoading) return "Loading...";
  
    return (
      <Flex
        alignItems="center"
        borderBottom="2px solid"
        borderColor="black"
        shadow="dark-lg"
        p="3"
        bgGradient="linear(to-l,#63B3ED,#4FD1C5 )"
        
      >
        <ProfileAvatar user={user} size="md" />
  
        <Box ml="4">
          <BtnUser user={user}  />
          <Text fontSize="sm" color="black">
            {formatDistanceToNow(date)} ago
          </Text>
        </Box>
      </Flex>
    );
  }