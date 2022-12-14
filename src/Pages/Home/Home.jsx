import { Box, Button, Heading, HStack, Text, Textarea } from "@chakra-ui/react";
import PostsLists from "../../Components/Post/PostList";
import { useAuth } from "../../Hooks/Auth";
import { useAddPost, usePosts } from "../../Hooks/Post";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();

  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    });
    reset();
  }

  return (
    <Box maxW="600px" mx="auto" py="10"  >
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between">
          <Heading size="lg">
           <Text
           bgGradient="linear(to-l,#63B3ED,#4FD1C5 )"
           bgClip='text'
           fontSize='5xl'
           fontWeight='extrabold'
           >
             New Post
           </Text>
          </Heading>
          <Button
            colorScheme="cyan"
            type="submit"
            isLoading={authLoading || addingPost}
            loadingText="Loading"
          >
            Post
          </Button>
        </HStack>
        <Textarea
          as={TextareaAutosize}
          resize="none"
          mt="5"
          placeholder="Create a new post..."
          minRows={3}
          {...register("text", { required: true })}
        />
      </form>
    </Box>
  );
}

export default function Dashboard() {
  const { posts, isLoading } = usePosts();

  if (isLoading) return "Loading posts...";

  return (
    <>
      <NewPost />
      <PostsLists posts={posts} />
    </>
  );
}