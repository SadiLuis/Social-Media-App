import { Flex, IconButton } from "@chakra-ui/react";
import { useAuth } from "../../Hooks/Auth";
import {
  FaRegHeart,
  FaHeart,
  FaComment,
  FaRegComment,
  FaTrash,
} from "react-icons/fa";
import { useToggleLike, useDeletePost } from "../../Hooks/Post";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../Routes/Routes";
import { useComments } from "../../Hooks/Comments";



export default function Actions({ post }) {
    const { id, likes, uid } = post;
    const { user, isLoading: userLoading } = useAuth();
  
    const isLiked = likes.includes(user?.id);
    const config = {
      id,
      isLiked,
      uid: user?.id,
    };
  
    const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
    const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
    const { comments, isLoading: commentsLoading } = useComments(id);
  
    return (
      <Flex p="2">
        <Flex alignItems="center">
          <IconButton
            onClick={toggleLike}
            isLoading={likeLoading || userLoading}
            size="md"
            colorScheme="red"
            variant="ghost"
            icon={isLiked ? <FaHeart /> : <FaRegHeart />}
            isRound
          />
          {likes.length}
        </Flex>
        <Flex alignItems="center" ml="2">
          <IconButton
            as={Link}
            to={`${PROTECTED}/comments/${id}`}
            isLoading={commentsLoading}
            size="md"
            colorScheme="teal"
            variant="ghost"
            icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
            isRound
          />
          {comments?.length}
        </Flex>
  
        {!userLoading && user.id === uid && (
          <IconButton
            ml="auto"
            onClick={deletePost}
            isLoading={deleteLoading}
            size="lg"
            colorScheme="red"
            variant="solid"
            icon={<FaTrash />}
            isRound
          />
        )}
      </Flex>
    );
  }