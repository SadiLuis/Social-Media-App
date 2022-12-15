import {
    Button,
    Divider,
    Flex,
    HStack,
    Stack,
    Text,
    useDisclosure,
  } from "@chakra-ui/react";
  import PostsList from "../../Components/Post/PostList";
  import { usePosts, useToggleLike } from "../../Hooks/Post";
  import { useUser } from "../../Hooks/Users";
  import { useParams } from "react-router-dom";
  import ProfileAvatar from "./ProfilePhoto";
  import { format } from "date-fns";
  import EditProfile from "./EditProfile";
  import { useAuth } from "../../Hooks/Auth";
  
  export default function Profile() {
    const { id } = useParams();
    const { posts, isLoading: postsLoading } = usePosts(id);
    const { user, isLoading: userLoading } = useUser(id);
    const { user: authUser, isLoading: authLoading } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    if (userLoading) return "Loading...";
  
    return (
      <Stack spacing="5">
        <Flex p={["4", "6"]} pos="relative" align="center">
          <ProfileAvatar size="2xl" user={user} />
  
          {!authLoading && authUser.id === user.id && (
            <Button
              pos="absolute"
              mb="2"
              top="6"
              right="6"
              colorScheme="teal"
              onClick={onOpen}
            >
              Change avatar
            </Button>
          )}
  
          <Stack ml="10">
            <Text fontSize="2xl">{user.username}</Text>
            <HStack spacing="10">
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Posts: {posts?.length}
              </Text>
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Likes:{useToggleLike?.length}
              </Text>
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Joined: {format(user.date, "MMMM YYY")}
              </Text>
            </HStack>
          </Stack>
  
          <EditProfile isOpen={isOpen} onClose={onClose} />
        </Flex>
        <Divider />
  
        {postsLoading ? (
          <Text>Posts are loading...</Text>
        ) : (
          <PostsList posts={posts} />
        )}
      </Stack>
    );
  }