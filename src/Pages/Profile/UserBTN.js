import { PROTECTED } from "../../Routes/Routes";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

export default function BtnUser ({ user }) {
    return (
        <Button
        as={Link}
        to={ `${PROTECTED}/profile/${user.id}` }
        colorScheme="teal.500"
        variant="link"
        >
            {user.username}        
        </Button>
    )
}