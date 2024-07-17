import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../Api/query/UserSignup";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    mutationKey: ["forgot-password"],
    onSuccess: () => {
      // Invalidate and refetch
      toast({
        title: "Send Email",
        description: "Link send for Forgot password",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      navigate(`/forgotsuccess/${email}`);
    },
    onError: (error) => {
      toast({
        title: "error in forgot password",
        description: error.message,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    },
  });
  return (
    <Container>
      <Center minH={"100vh"}>
        <Card p="6" borderRadius="1rem" w="456px">
          <Link to={"/signin"}>
            <Text textStyle={"h1"}>
              <FaCircleArrowLeft />
            </Text>
          </Link>

          <Text textStyle="h2" color="black.60" mt="4">
            Forgot Password
          </Text>
          <Text textStyle="p2" color="black.60" mt="4">
            Enter your email address for which account you want to reset your
            password.
          </Text>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={yup.object({
              email: yup
                .string()
                .email("Invalid email address")
                .required("Required"),
            })}
            onSubmit={(value, { resetForm }) => {
              setEmail(value.email);
              mutate(value);
              resetForm();
            }}
            resetForm
          >
            {(formik) => {
              return (
                <Form>
                  <Stack mt={"10"} spacing={6}>
                    <FormControl
                      isInvalid={formik.touched.email && formik.errors.email}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input
                        name="email"
                        placeholder="Enter your email"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <FormErrorMessage>
                          {formik.errors.email}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>

                    <Button
                      isLoading={isPending}
                      colorScheme="green"
                      marginBottom={2}
                      w={"full"}
                      type="submit"
                    >
                      Reset Password
                    </Button>
                  </Stack>
                </Form>
              );
            }}
          </Formik>
        </Card>
      </Center>
    </Container>
  );
};

export default ForgotPassword;
