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
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "./../../../Api/query/UserSignup";

const ResetPassword = () => {
  const { token } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    mutationKey: ["resetPassword"],
    onSuccess: () => {
      // Invalidate and refetch
      toast({
        title: "Password Reset",
        description: "Your Password Reset Successfully",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate(`/resetpasswordsuccess`);
      }, 1100);
    },
    onError: (error) => {
      toast({
        title: "Password Reset Error",
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
          <Text textStyle={"h1"}>Reset Password</Text>
          <Text textStyle="p2" color="black.60" mt="4">
            Enter your new newPassword.
          </Text>
          <Formik
            initialValues={{
              newPassword: "",
              repeatPassword: "",
            }}
            validationSchema={yup.object({
              newPassword: yup.string().required("Required"),
              repeatPassword: yup
                .string()
                .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
            })}
            onSubmit={(value, { resetForm }) => {
              const sendValue = {
                password: value.newPassword,
                token: token,
              };
              mutate(sendValue);
              resetForm();
            }}
            resetForm
          >
            {(formik) => {
              return (
                <Form>
                  <Stack mt={"10"} spacing={6}>
                    <FormControl
                      isInvalid={
                        formik.touched.newPassword && formik.errors.newPassword
                      }
                    >
                      <FormLabel htmlFor="newPassword">New Password</FormLabel>
                      <Input
                        name="newPassword"
                        placeholder="Enter your New Password"
                        type="newPassword"
                        {...formik.getFieldProps("newPassword")}
                      />
                      {formik.touched.newPassword &&
                      formik.errors.newPassword ? (
                        <FormErrorMessage>
                          {formik.errors.newPassword}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>
                    <FormControl
                      isInvalid={
                        formik.touched.repeatPassword &&
                        formik.errors.repeatPassword
                      }
                    >
                      <FormLabel htmlFor="repeatPassword">
                        Repeat Password
                      </FormLabel>
                      <Input
                        name="repeatPassword"
                        placeholder="Enter your repeatPassword"
                        type="newPassword"
                        {...formik.getFieldProps("repeatPassword")}
                      />
                      {formik.touched.repeatPassword &&
                      formik.errors.repeatPassword ? (
                        <FormErrorMessage>
                          {formik.errors.repeatPassword}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>

                    <Button
                      isLoading={isPending}
                      type="submit"
                      marginBottom={2}
                      w={"full"}
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

export default ResetPassword;
