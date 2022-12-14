import { Box, Text } from "@chakra-ui/react";
import Post from "./AllPost";

export default function PostsList({ posts }) {
  return (
    <Box px="6" align="center">
      {posts?.length === 0 ? (
        <Text textAlign="center" fontSize="xl">
        You haven't posted anything yet, quickly connect with others!
        </Text>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </Box>
  );
}