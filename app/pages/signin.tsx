import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { signin, signup } from "features/auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import { SigninFrom } from "types/auth";
import paths from "utils/paths";

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      // router.replace("/");
    }
  }, [user]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SigninFrom>();

  const { signinError, isSigningIn } = useAppSelector((state) => state.auth);

  const onSubmit = handleSubmit((data: any) => {
    dispatch(signin(data)).then(() => {
      router.replace("/");
    });
  });

  return (
    <Box
      w={{ base: "100%", md: "60%" }}
      flex="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w={{ base: "full", md: "xl" }}
        px={{ base: "8", md: "16" }}
        mt={"20"}
      >
        <Box mt="10" p="0">
          <Box>
            <Heading mb={6}>Sign In</Heading>
            <form onSubmit={onSubmit}>
              <FormControl
                id="email"
                // isInvalid={errors["email"]}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Please enter email.",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors["email"] && (
                  <FormErrorMessage>
                    {" "}
                    {errors["email"]["message"]}{" "}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="email"
                mt="2"
                // isInvalid={errors["password"]}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Please enter password",
                    maxLength: {
                      value: 20,
                      message: "Max length 20 exceeded.",
                    },
                    minLength: { value: 5, message: "Min length 5." },
                  })}
                />
                {errors["password"] && (
                  <FormErrorMessage>
                    {" "}
                    {errors["password"]["message"]}
                  </FormErrorMessage>
                )}
              </FormControl>
              <Heading size="xs" mt="6">
                <Link href="/forgotPassword">Forgot Password?</Link>
              </Heading>
              <Text color="red.700" fontSize="sm">
                {signinError && signinError}
              </Text>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                pt="6"
                width="100%"
              >
                <Button
                  colorScheme="blue"
                  width="100%"
                  type="submit"
                  disabled={isSigningIn}
                >
                  Sign In
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
        <Flex my={2}>
          <Text mr={2}>Donot Have an account?</Text>
          <Link href={paths.signup}>SignUp</Link>
        </Flex>
      </Box>
    </Box>
  );
}
