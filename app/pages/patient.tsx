import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  Tooltip,
} from "@chakra-ui/react";

import DataTable, { TableColumn } from "react-data-table-component";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineX, HiSearch, HiPlus } from "react-icons/hi";

import { useAppDispatch, useAppSelector } from "store/hook";
import {
  handleSelectedRowsChange,
  handlePerRowsChange,
  handlePageChange,
} from "features/adminPost/AdminPostSlice";
import { fetchPatients, initPatients } from "features/patient/PatientSlice";
import DashboardLayout from "components/DashboardLayout";
import paths from "utils/paths";
import { Post } from "types/post";

export default function AdminPost() {
  let dispatch = useAppDispatch();
  let router = useRouter();
  const {
    patients,
    patientsLoading,
    page,
    perPage,

    total,
    patientsError,
    paginationRowsPerPage,
  } = useAppSelector((state) => state.patient);

  useEffect(() => {
    dispatch(initPatients());
  }, []);

  useEffect(() => {
    dispatch(fetchPatients({ page, perPage }));
  }, [dispatch, page, perPage]);

  // @ts-ignore
  const columns: TableColumn<Patient>[] = useMemo(
    () => [
      {
        name: "Basic Info",
        grow: 3,
        selector: (row) => (
          <Flex py={4}>
            <Image
              src={row.imageLink ? row.imageLink : ""}
              alt={row.title}
              height="70"
              width="70"
            />
            <Flex flexDir={"column"} ml={2}>
              <Heading size={"sm"}>{row.name}</Heading>
              <Text fontSize={"sm"}>{row.email}</Text>
            </Flex>
          </Flex>
        ),
      },
      {
        name: "Phone Number",
        selector: (row) => row.phone,
      },
      {
        name: "Address",
        grow: 0,
        selector: (row) => row.address,
      },
      {
        name: "Next Appointment",
        grow: 1,
        selector: (row) => row.createdAt,
      },
      {
        name: "Last Appointment",
        grow: 1,
        selector: (row) => row.createdAt,
      },
      {
        name: "Register Date",
        grow: 1,
        selector: (row) => row.createdAt,
      },

      {
        name: "Action",
        cell: (row: Post) => {
          return (
            <Flex>
              <Tooltip label="Update the Patient" aria-label="Edit Patient">
                <Link href={paths.editPatient(row._id)}>
                  <IconButton
                    size="sm"
                    colorScheme="green"
                    ml={1}
                    aria-label="Edit Patient"
                    icon={<FiEdit />}
                  />
                </Link>
              </Tooltip>
              <Tooltip label="Delete the Patient" aria-label="Delete Patient">
                <IconButton
                  ml={1}
                  size="sm"
                  aria-label="Delete"
                  colorScheme={"red"}
                  onClick={(e) => {
                    e.preventDefault();
                    // return handleModalOpen(vaccine.id);
                  }}
                  icon={<AiOutlineDelete />}
                />
              </Tooltip>
            </Flex>
          );
        },
        ignoreRowClick: true,
      },
    ],
    []
  );

  return (
    <DashboardLayout bgColor="white">
      <Container width="100%" maxW={"full"} mx={"auto"}>
        <Flex
          alignItems={"center"}
          justifyContent="space-between"
          flexWrap={"wrap"}
          mx="2"
          my="4"
        >
          <Heading size="md">Patient List</Heading>
          <Flex mb={4}>
            <Link href={paths.createPatient}>
              <Button
                rounded="full"
                colorScheme="blue"
                mr={4}
                width="40px"
                height="40px"
              >
                <HiPlus fontSize={"30px"} />
              </Button>
            </Link>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<HiSearch color="gray.300" />}
              />
              <Input type="tel" placeholder="Search for a Keyword" />
              <InputRightElement
                pointerEvents="none"
                children={<HiOutlineX color="gray.300" />}
              />
            </InputGroup>
          </Flex>
        </Flex>

        <Flex
          justifyContent="space-between"
          border="1px solid"
          borderColor={"gray.200"}
          py={4}
        >
          <Flex alignItems={"baseline"}>
            <Flex alignItems={"baseline"} mr={6}>
              <Heading mr={2} color="blue.400">
                76
              </Heading>
              <Text>patients</Text>
            </Flex>
            <Flex alignItems={"center"} width="max-content">
              <Heading
                size="sm"
                color={"gray.600"}
                whiteSpace={"nowrap"}
                mr={2}
              >
                Sort By:
              </Heading>
              <Select size="md" width={"100%"}>
                {["Last Appointment", "Register Date"].map((sort) => {
                  return <option value="sort">{sort}</option>;
                })}
              </Select>
            </Flex>
          </Flex>
          <Flex>
            <Button variant="outline" mx={1}>
              Print
            </Button>
            <Button variant="outline" mx={1}>
              Filter
            </Button>
          </Flex>
        </Flex>
        <Box mx="4">
          {/* <DataTable
            data={patients}
            columns={columns}
            selectableRows={true}
            onSelectedRowsChange={({ selectedCount }) => {
              dispatch(handleSelectedRowsChange({ selectedCount }));
            }}
            progressPending={patientsLoading}
            paginationTotalRows={total}
            onChangeRowsPerPage={(perPage) => {
              dispatch(handlePerRowsChange({ perPage }));
            }}
            onChangePage={(page: number) => {
              dispatch(handlePageChange({ page, perPage }));
            }}
            paginationRowsPerPageOptions={paginationRowsPerPage}
            // selectableRowsComponent={<input type="checkbox" />}
            pagination
            paginationServer
            persistTableHead
            highlightOnHover
            pointerOnHover
          /> */}
        </Box>
      </Container>
    </DashboardLayout>
  );
}
