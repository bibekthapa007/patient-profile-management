import { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchMorePosts, fetchPost } from "features/post/PostSlice";
import DashboardLayout from "components/DashboardLayout";
import Card from "components/Card";
import Link from "next/link";
import { fetchPatient } from "features/patient/PatientSlice";

function InfoItem({ heading, text }: { heading: string; text: string }) {
  return (
    <Flex
      flexDir="column"
      borderBottom={"1px solid"}
      borderColor="gray.100"
      py={3}
    >
      <Heading size="sm" color={"gray.500"} py={2}>
        {heading}
      </Heading>
      <Heading size="sm">{text}</Heading>
    </Flex>
  );
}

export default function SinglePatient({}) {
  let dispatch = useAppDispatch();
  let router = useRouter();
  let patientId = router.query.patientId as string;
  const { patient, patientLoading, patientError } = useAppSelector(
    (state) => state.patient
  );

  useEffect(() => {
    dispatch(fetchPatient(patientId));
  }, [dispatch, patientId]);

  return (
    <DashboardLayout>
      <Container maxW="container.xl">
        {!patientLoading && patient && (
          <Grid templateColumns={"5fr 2fr"} gap="4">
            <VStack spacing="4">
              <Grid templateColumns={"1fr 2fr"} width="100%" gap="1">
                <Card>
                  <Flex flexDir={"column"} alignItems="center" my={4} mx={2}>
                    <Avatar size="lg" />
                    <Heading size="md" mt={4}>
                      {patient.name}
                    </Heading>
                    <Text>{patient.email}</Text>
                    <Flex my={4}>
                      <Flex flexDir="column" alignItems="center" mx="4">
                        <Heading size="md">15</Heading>
                        <Text color="gray.400" fontSize="sm">
                          Post
                        </Text>
                      </Flex>
                      <Flex flexDir="column" alignItems="center" mx="4">
                        <Heading size="md">2</Heading>
                        <Text color="gray.400" fontSize="sm">
                          Upcoming
                        </Text>
                      </Flex>
                    </Flex>

                    <Button width="full" variant="outline">
                      Send Message
                    </Button>
                  </Flex>
                </Card>
                <Card>
                  <SimpleGrid columns={3} spacing={4}>
                    <InfoItem heading="Gender" text="Male" />
                    <InfoItem heading="Birthday" text="2056/07/10" />
                    <InfoItem heading="Phone Number" text={patient.phone} />
                    <InfoItem heading="Street Address" text={patient.address} />
                    <InfoItem heading="City" text="Kathmandu" />
                    <InfoItem heading="Zip Code" text="4001" />
                    <InfoItem heading="Member Status" text={patient.status} />
                    <InfoItem heading="Registered Date" text="Feb 24 2018" />
                  </SimpleGrid>
                </Card>
              </Grid>

              <Card>
                <Tabs variant="unstyled">
                  <TabList bgColor={"gray.100"} borderRadius={8} p="1">
                    {[
                      "Upcoming Appointments",
                      "Post Appointments",
                      "Medical Reports",
                    ].map((item, index) => {
                      return (
                        <Tab
                          key={index}
                          fontSize="sm"
                          fontWeight={500}
                          _selected={{
                            bgColor: "white",
                            color: "blue",
                            borderRadius: "8px",
                          }}
                        >
                          {item}
                        </Tab>
                      );
                    })}
                  </TabList>
                  <TabPanels height="60vh">
                    <TabPanel py={4}>
                      <Box
                        bg="gray.100"
                        borderRadius={"lg"}
                        position="relative"
                        overflowY={"scroll"}
                        p={4}
                        height="60vh"
                      >
                        <Flex justifyContent="space-between">
                          <Heading size="md">Root Canal Treatment</Heading>
                          <Button>Show Previous Treatment</Button>
                        </Flex>

                        <Box m="4">
                          {Array(10)
                            .fill(10)
                            .map((appointment, index) => {
                              return (
                                <Card key={index}>
                                  <Flex justifyContent={"space-between"} m={4}>
                                    <Box>
                                      <Heading size="sm"> 26 Nov 19</Heading>
                                      <Text>09:00-10:00</Text>
                                    </Box>
                                    <Box>
                                      <Text>Treatment</Text>
                                      <Heading size="sm"> Open Access</Heading>
                                    </Box>
                                    <Box>
                                      <Text>Dentist</Text>
                                      <Heading size="sm"> Dr. Adman H.</Heading>
                                    </Box>
                                    <Box>
                                      <Text>Nurse</Text>
                                      <Heading size="sm">Jessicamila</Heading>
                                    </Box>
                                    <Button>Notes</Button>
                                  </Flex>
                                </Card>
                              );
                            })}
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                      <p>three!</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Card>
            </VStack>

            <VStack spacing="4">
              <Card>
                <Flex justifyContent={"space-between"}>
                  <Heading size="sm">Notes</Heading>
                  <Link href="/">
                    <Text size="sm" color="blue">
                      See All
                    </Text>
                  </Link>
                </Flex>
                <Textarea></Textarea>
              </Card>
              <Card>
                <Flex justifyContent={"space-between"}>
                  <Heading size="sm">Files and documents</Heading>
                  <Link href="/">
                    <Text size="sm" color="blue">
                      See All
                    </Text>
                  </Link>
                </Flex>
              </Card>
            </VStack>
          </Grid>
        )}
      </Container>
    </DashboardLayout>
  );
}
