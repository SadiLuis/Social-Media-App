import { LOGIN } from "../../Routes/Routes";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/Auth";
import Navbar from "../Layout/NavBar";
import Sidebar from "../Layout/SideBar";
import { Box, Flex, Spacer } from "@chakra-ui/react";

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading]);

  if (isLoading) return "Loading auth user...";

  return (
    <>
      <Navbar />
      <Flex pt="16" pb="12" mx="auto" w="full" maxW="full" right="full" >
        <Box w="900px">
          <Outlet />
        </Box>
        <Spacer/>
        <Sidebar/>
      </Flex>
    </>
  );
}