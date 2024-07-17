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
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";

import { useMutation } from "@tanstack/react-query";
import { UserSigning } from "../../../Api/query/UserSignin";
import { AuthContext } from "../../../AuthContext/AuthProvider";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const toast = useToast();
  const { userSignIn, setToken } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const { data, mutate, isError, isLoading, isPending } = useMutation({
    mutationFn: UserSigning,
    mutationKey: ["signin"],
    onSuccess: (data) => {
      setToken(data.token);
      const decoded = jwtDecode(data.token);
      debugger;
      setCookie("jwtToken", data.token, {
        path: "/",

        maxAge: decoded.exp,
        sameSite: true,
      });
      userSignIn(decoded);
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Signin error",
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
          <Text textStyle={"h1"}>WelCome to Crypto App</Text>
          <Text textStyle="p2" color="black.60" mt="4">
            Enter your credentials to access account
          </Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={yup.object({
              email: yup
                .string()
                .email("Invalid email address")
                .required("Required"),
              password: yup.string().required("Required"),
            })}
            onSubmit={(value, { resetForm }) => {
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
                    <FormControl
                      isInvalid={
                        formik.touched.password && formik.errors.password
                      }
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Input
                        name="password"
                        placeholder="Enter your password"
                        type="password"
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <FormErrorMessage>
                          {formik.errors.password}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>
                    <HStack justify={"space-between"}>
                      <Checkbox>Remember me</Checkbox>
                      <Text color="black.60" textAlign="center">
                        <Link
                          style={{ color: "#4d4df0" }}
                          to={"/forgotpassword"}
                        >
                          Forgot Password
                        </Link>
                      </Text>
                    </HStack>
                    <Box>
                      <Button
                        isLoading={isPending}
                        marginBottom={2}
                        w={"full"}
                        type="submit"
                      >
                        Login
                      </Button>
                      <Link to={"/signup"}>
                        <Button w={"full"}>Create Account</Button>
                      </Link>
                    </Box>
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

export default SignIn;
