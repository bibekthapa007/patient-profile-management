import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Select, Textarea } from "@chakra-ui/react";
import { Flex, Heading, Text, Box, SimpleGrid } from "@chakra-ui/layout";

import paths from "utils/paths";

import { useAppDispatch, useAppSelector } from "store/hook";
import { checkFileSize, checkMimeType, maxSelectFile } from "utils/image";
import { createPatient, updatePatient } from "features/patient/PatientSlice";

import { PatientForm, PatientResponse } from "types/patient";

export default function CreatePatientForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const patientId = router.query.patientId;

  const { patient, updating, updateError, creating, createError } =
    useAppSelector((state) => state.patient);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { isDirty, errors },
  } = useForm<PatientForm>();

  const userFiles = watch("userFiles");
  const file = userFiles && userFiles[0];

  useEffect(() => {
    if (patient) {
      reset(patient);
    }
  }, [reset, patient]);

  const onSubmit = handleSubmit((data: any) => {
    if (!patientId) {
      dispatch(createPatient(data)).then((data) => {
        let payload = data.payload as PatientResponse;
        let requestStatus = data.meta.requestStatus as string;
        if (requestStatus === "fulfilled") {
          let id = payload.patient.id;
          if (id) {
            router.push(paths.editPatient(id));
          }
        }
      });
    } else {
      delete data.file;
      dispatch(updatePatient(data));
    }
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
  return (
    <Box pt={2} maxW="4xl" mx="auto">
      <form onSubmit={onSubmit}>
        <Heading fontSize="lg" mb={4} fontWeight="500">
          {patientId ? "Update Patient" : "Create Patient"}
        </Heading>

        <SimpleGrid columns={2} spacing={10}>
          <FormControl
            mb={4}
            id="name"
            isInvalid={Boolean(errors.name)}
            isRequired
          >
            <FormLabel>FullName</FormLabel>
            <Input
              borderColor="gray.300"
              isInvalid={Boolean(errors.name)}
              {...register("name", {
                required: "Please enter name.",
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
            isRequired
          >
            <FormLabel>Email</FormLabel>
            <Input
              borderColor="gray.300"
              isInvalid={Boolean(errors.email)}
              {...register("email", {
                required: "Please enter email.",
              })}
            />
            {errors.email && (
              <FormErrorMessage>
                {errors.email?.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={10}>
          <FormControl
            mb={4}
            id="phone"
            isInvalid={Boolean(errors.contact)}
            isRequired
          >
            <FormLabel>Contact no.</FormLabel>
            <Input
              borderColor="gray.300"
              isInvalid={Boolean(errors.contact)}
              {...register("contact", {
                required: "Please enter phone no.",
              })}
            />
            {errors.contact && (
              <FormErrorMessage>
                {errors.contact?.message as string}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            mb={4}
            id="dob"
            isInvalid={Boolean(errors.dob)}
            isRequired
          >
            <FormLabel>Dob</FormLabel>
            <Input
              borderColor="gray.300"
              isInvalid={Boolean(errors.dob)}
              type="datetime-local"
              {...register("dob", {
                required: "Please enter Dob.",
              })}
            />
            {errors.dob && (
              <FormErrorMessage>
                {errors.dob?.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={10}>
          <FormControl
            mb={4}
            id="phone"
            isInvalid={Boolean(errors.contact)}
            isRequired
          >
            <FormLabel>Gender.</FormLabel>
            <Select
              placeholder="Select gender"
              {...register("gender", {
                required: "Please enter Dob.",
              })}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Others</option>
            </Select>
            {errors.contact && (
              <FormErrorMessage>
                {errors.contact?.message as string}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            mb={4}
            id="address"
            isInvalid={Boolean(errors.address)}
            isRequired
          >
            <FormLabel>Address</FormLabel>
            <Input
              borderColor="gray.300"
              isInvalid={Boolean(errors.address)}
              {...register("address", {
                required: "Please enter address.",
              })}
            />
            {errors.address && (
              <FormErrorMessage>
                {errors.address?.message as string}
              </FormErrorMessage>
            )}
          </FormControl>
        </SimpleGrid>

        <FormControl
          mb={4}
          id="notes"
          isInvalid={Boolean(errors.address)}
          isRequired
        >
          <FormLabel>Notes</FormLabel>
          <Textarea
            borderColor="gray.300"
            isInvalid={Boolean(errors.address)}
            {...register("notes", {
              required: "Please enter notes.",
            })}
          />
          {errors.notes && (
            <FormErrorMessage>
              {errors.notes?.message as string}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormLabel>Add Image</FormLabel>

        <Input
          borderColor="gray.300"
          type="file"
          accept={"image/*"}
          id="userFiles"
          {...register("userFiles", {
            required: false,
          })}
        />
        {/* <input
          type="file"
          id="userFiles"
          {...register("userFiles", {
            required: false,
          })}
          // onChange={fileChangedHandler}
          name="userFiles"
          style={{ display: "none" }}
        /> */}

        <Flex
          align="center"
          direction="column"
          p={[4, 8]}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="8px"
          onClick={() => {
            let element = document.getElementById("userFiles");
            element && element.click();
          }}
        >
          {file ? (
            /* eslint-disable */
            <img
              alt="category"
              className="profile-user-img img-fluid"
              style={{
                cursor: "pointer",
                height: "auto",
                minHeight: "150px",
                maxHeight: "250px",
                width: "auto",
                border: "2px solid #ddd",
                objectFit: "cover",
              }}
              src={URL.createObjectURL(file)}
            />
          ) : (
            <Box>
              <Heading fontSize="md">Add the Images</Heading>
              <Text>or click to add</Text>
            </Box>
          )}
        </Flex>

        <Text color="red.700" fontSize="sm">
          {!patientId && createError && createError}
          {patientId && updateError && updateError}
        </Text>

        <Flex justify="flex-end">
          <Button
            type="submit"
            isLoading={patientId ? updating : creating}
            mx={2}
            colorScheme="blue"
            variant="solid"
            mb={8}
          >
            {patientId && (!updating ? "Update Patient" : "Updating")}
            {!patientId && (!creating ? "Create Patient" : "Creating")}
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
