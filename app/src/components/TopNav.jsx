import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaBars, FaUserTie } from "react-icons/fa";
import { AuthContext } from "../AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const TopNav = ({ title, onOpen }) => {
  const { setUserDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"]);

  const logOutHandler = () => {
    setUserDetails("");
    removeCookie("jwtToken", { path: "/" });
    navigate("/signin");
  };
  return (
    <Box px="4" bg="white">
      <HStack maxW="70rem" h="16" justify="space-between" mx="auto">
        <Icon
          as={FaBars}
          onClick={onOpen}
          display={{
            base: "block",
            lg: "none",
          }}
        />
        <Heading fontWeight="medium" fontSize="28px">
          {title}
        </Heading>

        <Menu>
          <MenuButton>
            <Icon as={FaUserTie} fontSize="24px" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={logOutHandler}>Logout</MenuItem>
            <MenuItem>Support</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};

export default TopNav;
