import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { updateUser } from 'features/auth/AuthSlice';
import ProtectedRoute from 'components/ProtectedRoute';
import DashboardLayout from 'components/DashboardLayout';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { checkFileSize, checkMimeType, maxSelectFile } from 'utils/image';

import { UserProfileForm } from 'types/auth';

const isEqual = (arr1: string[] | undefined, arr2: string[] | undefined) => {
  let same = true;
  if (!arr1 || !arr2) return false;

  if (arr1.length !== arr2.length) return false;

  arr1.map((data) => {
    if (!arr2.includes(data)) {
      same = false;
    }
  });
  return same;
};

export default function Setting() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user, loading, updating, updateError } = useAppSelector(
    (state) => state.auth,
  );

  const [oldRelevent, setOldRelevent] = useState(user?.releventCategories);
  const [relevent, setRelevent] = useState(user?.releventCategories);
  const modified = !isEqual(oldRelevent, relevent);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm<UserProfileForm>();

  const userFiles = watch('userFiles');
  const file = userFiles && userFiles[0];

  const onSubmit = handleSubmit((data: any) => {
    dispatch(
      updateUser({ name: data.name, releventCategories: relevent }),
    ).then((data) => {
      const requestStatus = data.meta.requestStatus as string;
      if (requestStatus === 'fulfilled') {
        toast({
          title: 'User updated successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    });
  });

  const fileChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      if (
        maxSelectFile(event) &&
        checkMimeType(event) &&
        checkFileSize(event)
      ) {
      }
    }
  };

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email });
      setRelevent(user?.releventCategories);
      setOldRelevent(user?.releventCategories);
    }
  }, [reset, user]);

  const handleRelevent = (categoryId: string, checked: boolean) => {
    if (!relevent) {
      return console.log('No relevent found.');
    }

    if (checked) {
      if (!relevent.includes(categoryId)) {
        setRelevent([...relevent, categoryId]);
      }
    } else if (relevent.includes(categoryId)) {
      if (relevent.length === 1) {
        return alert('There must be at least one category');
      }

      const newRelevent = relevent.filter(
        (category) => category !== categoryId,
      );

      setRelevent(newRelevent);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <DashboardLayout>
      <ProtectedRoute>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box pt={2} maxW="xl" mx="auto">
          <Heading> Settings Page</Heading>
          <form onSubmit={onSubmit}>
            <Heading size="md" mb={4} fontWeight="500">
              Profile
            </Heading>

            <FormControl
              mb={4}
              id="name"
              isInvalid={Boolean(errors.name)}
              isRequired
            >
              <FormLabel>Name</FormLabel>
              <Input
                borderColor="gray.300"
                placeholder="Name"
                isInvalid={Boolean(errors.name)}
                {...register('name', {
                  required: 'Please enter name.',
                })}
              />
              {errors.name && (
                <FormErrorMessage>
                  {errors.name?.message as string}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              mb={4}
              id="email"
              isInvalid={Boolean(errors.email)}
              isDisabled
              isRequired
              {...register('email', {
                required: 'Please enter email.',
              })}
            >
              <FormLabel>Email</FormLabel>
              <Input
                borderColor="gray.300"
                size="sm"
                placeholder="Description"
              />
            </FormControl>

            <Box my={6}>
              <Heading size="md" mb={2} fontWeight={500}>
                View Sensitive Content
              </Heading>
              <Checkbox
                // isChecked={}
                mr={4}
              >
                See Sensitive Content
              </Checkbox>
            </Box>

            <Text color="red.700" fontSize="sm">
              {updateError && updateError}
            </Text>
            <Flex justify="flex-end">
              <Button
                type="submit"
                isLoading={updating}
                isDisabled={!isDirty && !modified}
                mx={2}
                colorScheme="blue"
                variant="solid"
                mb={8}
              >
                {updating ? 'Updating' : 'Update User'}
              </Button>
            </Flex>
          </form>
        </Box>
      </ProtectedRoute>
    </DashboardLayout>
  );
}
