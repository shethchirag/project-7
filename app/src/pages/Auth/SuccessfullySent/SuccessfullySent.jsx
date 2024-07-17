import { Button, Card, Center, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const SuccessfullySent = () => {
  const { email } = useParams();
  return (
    <Center minH={"100vh"}>
      <Card w={"456px"} padding={"25px"}>
        <VStack spacing={6}>
          <Icon as={FaCircleCheck} boxSize={"3rem"} color="green" />
          <Text textStyle={"h2"}>Successfully Sent</Text>
          <Text textAlign={"center"} textStyle={"p2"} color={"p.black"}>
            We have sent instructions on how to reset your password to {email}{" "}
            Please follow the instructions from the email.
          </Text>
        </VStack>
      </Card>
    </Center>
  );
};

export default SuccessfullySent;
