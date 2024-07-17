import {
  Button,
  Card,
  Center,
  Icon,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { emailVerify } from "../../../Api/query/UserSignup";

const RegisterEmailVerify = () => {
  const toast = useToast();
  const { email } = useParams();

  const { mutate, isPending } = useMutation({
    mutationKey: ["email-verify"],
    mutationFn: () => emailVerify({ email }),
    enable: !!email,
    onSuccess: () => {
      toast({
        title: "Email send Successfully",
        description: "Send verification  link on your email",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Email send Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });
  useEffect(() => {
    mutate(email);
  }, []);
  return (
    <Center minH={"100vh"}>
      <Card w={"456px"} padding={"25px"}>
        <VStack spacing={6}>
          <Icon as={MdEmail} boxSize={"3rem"} color="p.purple" />
          <Text textStyle={"h2"}>Email Verification</Text>
          <Text textAlign={"center"} textStyle={"p2"} color={"p.black"}>
            We have send you an email verification to {email} . if you didn't
            receive it ,click the button below
          </Text>
          <Button
            isLoading={isPending}
            onClick={() => mutate(email)}
            w={"full"}
            variant={"outline"}
          >
            Re-send Email
          </Button>
        </VStack>
      </Card>
    </Center>
  );
};

export default RegisterEmailVerify;
