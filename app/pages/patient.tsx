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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";

import DataTable, { TableColumn } from "react-data-table-component";
import { FiEdit, FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";
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

import { Patient } from "types/patient";

const customStyles = {
  table: {
    style: {
      minHeight: "500px",
      background: "white",
    },
  },
};

export default function PatientList() {
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
          <Link href={paths.singlePatient(row.id)}>
            <Flex py={4}>
              <Image
                src={row.imageLink ? row.imageLink : "/profile.png"}
                alt={row.name}
                height="40"
                width="40"
              />
              <Flex flexDir={"column"} ml={2}>
                <Heading size={"sm"}>{row.name}</Heading>
                <Text fontSize={"sm"}>{row.email}</Text>
              </Flex>
            </Flex>
          </Link>
        ),
      },
      {
        name: "Phone Number",
        selector: (row) => row.contact,
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
        cell: (row: Patient) => {
          return (
            <Flex>
              <Menu>
                <MenuButton display={"flex"} alignContent="center">
                  <IconButton
                    aria-label="options"
                    icon={<FiMoreHorizontal />}
                  />
                </MenuButton>
                <Portal>
                  <MenuList>
                    <MenuItem as={Link} href={paths.editPatient(row.id)}>
                      <FiEdit /> Edit
                    </MenuItem>
                    <MenuItem>
                      <AiOutlineDelete /> View
                    </MenuItem>
                    <MenuItem>
                      <AiOutlineDelete /> Delete
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Flex>
          );
        },
        ignoreRowClick: true,
      },
    ],
    []
  );

  return (
    <DashboardLayout bgColor="gray.100">
      <Container width="100%" maxW="full" p={0}>
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
          borderTop="1px solid"
          borderBottom="1px solid"
          borderColor={"gray.200"}
          py={4}
          px={4}
        >
          <Flex alignItems={"baseline"}>
            <Flex alignItems={"baseline"} mr={6}>
              <Heading mr={2} color="blue.400">
                {total}
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
        <Box mx="4" maxW={"100%"}>
          <DataTable
            data={patients}
            columns={columns}
            selectableRows={false}
            style={{ minHeight: "500px" }}
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
            customStyles={customStyles}
            pagination
            paginationServer
            persistTableHead
            highlightOnHover
            pointerOnHover
          />
        </Box>
      </Container>
    </DashboardLayout>
  );
}
