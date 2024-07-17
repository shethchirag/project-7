import { Button, Card, Center, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ResetPasswordSuccess = () => {
  return (
    <Center minH={"100vh"}>
      <Card w={"456px"} padding={"25px"}>
        <VStack spacing={6}>
          <Icon as={FaCircleCheck} boxSize={"3rem"} color="green" />
          <Text textStyle={"h2"}>Password Reset Done</Text>
          <Text textAlign={"center"} textStyle={"p2"} color={"p.black"}>
            Now you can access you account.
          </Text>
          <Link to={"/signin"}>
            <Button>Signin</Button>
          </Link>
        </VStack>
      </Card>
    </Center>
  );
};

export default ResetPasswordSuccess;
