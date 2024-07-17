import {
  Button,
  Card,
  Center,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { UserSignup } from "../../../Api/query/UserSignup";
import { useMutation, useQuery } from "@tanstack/react-query";

const SignUp = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending, error, isError } = useMutation({
    mutationKey: ["signup"],
    mutationFn: UserSignup,
    onSuccess: () => {
      // Invalidate and refetch
      toast({
        title: "User created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate(`/emailverify/${email}`);
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: "sign up error",
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
            Create a free account by filling data below
          </Text>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              password: "",
              repeatPassword: "",
            }}
            validationSchema={yup.object({
              name: yup
                .string()
                .min(3, "enter min 3 letter")
                .required("Required"),
              surname: yup
                .string()
                .min(3, "enter min 3 letter")
                .required("Required"),
              email: yup
                .string()
                .email("Invalid email address")
                .required("Required"),
              password: yup.string().required("Required"),
              repeatPassword: yup
                .string()
                .oneOf([yup.ref("password"), null], "Passwords must match"),
            })}
            onSubmit={(value, { resetForm }) => {
              mutate(value);
              setEmail(value.email);
              resetForm();
            }}
            resetForm
          >
            {(formik) => {
              return (
                <Form>
                  <Stack mt={"10"} spacing={6}>
                    <Flex gap={"4"}>
                      <FormControl
                        isInvalid={formik.touched.name && formik.errors.name}
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                          name="name"
                          placeholder="Enter your name"
                          {...formik.getFieldProps("name")}
                        />

                        {formik.touched.name && formik.errors.name ? (
                          <FormErrorMessage>
                            {formik.errors.name}
                          </FormErrorMessage>
                        ) : (
                          ""
                        )}
                      </FormControl>
                      <FormControl
                        isInvalid={
                          formik.touched.surname && formik.errors.surname
                        }
                      >
                        <FormLabel htmlFor="surname">Surname</FormLabel>
                        <Input
                          name="surname"
                          placeholder="Enter your surname"
                          {...formik.getFieldProps("surname")}
                        />
                        {formik.touched.surname && formik.errors.surname ? (
                          <FormErrorMessage>
                            {formik.errors.surname}
                          </FormErrorMessage>
                        ) : null}
                      </FormControl>
                    </Flex>
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
                        type="password"
                        {...formik.getFieldProps("repeatPassword")}
                      />
                      {formik.touched.repeatPassword &&
                      formik.errors.repeatPassword ? (
                        <FormErrorMessage>
                          {formik.errors.repeatPassword}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>
                    <Checkbox>
                      I agree with{" "}
                      <Text as={"span"} color="p.purple">
                        Terms and Conditions
                      </Text>
                    </Checkbox>
                    <Button isLoading={isPending} type="submit">
                      Create Account
                    </Button>
                    <Text color="black.60" textAlign="center">
                      Already Have and account ?{" "}
                      <Link style={{ color: "purple" }} to={"/signin"}>
                        Login
                      </Link>
                    </Text>
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

export default SignUp;
