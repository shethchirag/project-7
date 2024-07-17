import {
  Button,
  Card,
  Center,
  Icon,
  Spinner,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { emailVerifyToken } from "../../../Api/query/UserSignup";

const RegisterSuccess = () => {
  const { token } = useParams();
  const navigator = useNavigate();
  const toast = useToast();
  const { data, isLoading, isSuccess, error, isError } = useQuery({
    queryFn: () => emailVerifyToken({ token }),
    queryKey: ["token-verify"],
    enabled: !!token,
  });
  if (isError) {
    toast({
      title: "Email verify Successfully",
      description: error.message,
      status: "error",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => {
      navigator("/signup");
    }, 3000);
  }
  if (isSuccess) {
    toast({
      title: "Email verify Successfully",
      description: data.message,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }
  if (isLoading) {
    return (
      <Center minH={"100vh"}>
        <Spinner />
      </Center>
    );
  }
  return (
    isSuccess && (
      <Center minH={"100vh"}>
        <Card w={"456px"} padding={"25px"}>
          <VStack spacing={6}>
            <Icon as={FaCircleCheck} boxSize={"3rem"} color="p.purple" />
            <Text textStyle={"h2"}>Successfully Register</Text>
            <Text textAlign={"center"} textStyle={"p2"} color={"p.black"}>
              Hurray! You have successfully created your account. Enter the app
              to explore all it’s features.
            </Text>
            <Link to={"/signin"}>
              <Button w={"full"} variant={"outline"}>
                Enter the App
              </Button>
            </Link>
          </VStack>
        </Card>
      </Center>
    )
  );
};

export default RegisterSuccess;
