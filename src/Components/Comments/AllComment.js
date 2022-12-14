import { Box } from "@chakra-ui/react";
import Post from "../Post/AllPost";
import { usePost } from "../../Hooks/Post";
import { useParams } from "react-router-dom";
import NewComment from "./NewComment";
import CommentList from "./CommentList";

export default function Comments() {
  const { id } = useParams();
  const { post, isLoading } = usePost(id);

  if (isLoading) return "Loading...";

  return (
    <Box align="center" pt="50">
      <Post post={post} />
      <NewComment post={post} />
      <CommentList post={post} />
    </Box>
  );
}