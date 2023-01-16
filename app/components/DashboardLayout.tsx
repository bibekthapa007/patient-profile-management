import {
  Divider,
  Stack,
  Box,
  Grid,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/layout";
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/hooks";
import { IconButton, Spinner } from "@chakra-ui/react";

import {
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlineSetting,
} from "react-icons/ai";
import { BsPerson, BsQuestionCircle } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { HiOutlineCalendar } from "react-icons/hi";

import NavItem from "./NavItem";
import paths from "utils/paths";
import { useAppDispatch, useAppSelector } from "store/hook";
import { logout } from "features/auth/AuthSlice";

interface DashboardProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

interface DrawerProps {
  onOpen: () => void;
}

const DashboardDrawerItems = ({ onOpen }: DrawerProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <Stack w="100%">
      <Flex p={4} justifyContent="space-between" alignItems={"center"}>
        <Flex flexDir="column">
          <Heading size="md">Zendenta</Heading>
          <Text>Patient Management App</Text>
        </Flex>
        <IconButton
          aria-label="Main Drawer"
          onClick={onOpen}
          icon={<AiOutlineMenu />}
        />
      </Flex>

      <NavItem icon={<BsQuestionCircle />} label="Overview" link={paths.home} />
      <NavItem
        icon={<HiOutlineCalendar />}
        label="Calender"
        link={paths.home}
      />
      <NavItem icon={<BsPerson />} label="Patient List" link={paths.patient} />
      <NavItem icon={<AiOutlineMessage />} label="Messages" link={paths.home} />
      <NavItem
        icon={<MdPayment />}
        label="Payment Information"
        link={paths.home}
      />
      <NavItem icon={<AiOutlineSetting />} label="Settings" link={paths.home} />

      <Divider color="gray.300" />
      <NavItem
        icon={<BiLogOut />}
        onClick={(e) => {
          e.preventDefault();
          dispatch(logout()).then((data) => router.push("/login"));
        }}
        label="Log Out"
        link="/#"
      />
      <Divider color="gray.300" />
    </Stack>
  );
};

interface DashboardRouteProps {
  children: React.ReactNode | React.ReactNode[];
}

const DashboardRoute = ({ children }: DashboardRouteProps) => {
  const { user, initialLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!initialLoading && !user) {
      Router.replace("/signin");
    }
  }, [user, initialLoading]);

  if (initialLoading) {
    return <Spinner />;
  }
  if (!initialLoading && user) {
    return <>{children}</>;
  }
  return null;
};

const DashboardDrawerContent = ({ onOpen }: DrawerProps) => {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DashboardDrawerItems onOpen={onOpen} />
    </DrawerContent>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

function DashboardLayout({ children, bgColor }: DashboardLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DashboardRoute>
      <Box>
        <Box bg={bgColor || "gray.100"} minHeight="calc(100vh - 64px)">
          <Grid
            templateColumns={[
              "minmax(0px, auto)",
              "minmax(0px, auto)",
              "300px minmax(0px, 2fr)",
              "300px minmax(0px, 3fr)",
              "300px minmax(0px, 4fr)",
            ]}
            autoRows={`minmax(min-content, max-content)`}
            position="relative"
            overflow="hidden"
          >
            <Box
              display={["none", "none", "flex"]}
              bg="white"
              // minHeight="calc(100vh - 64px)"
              minHeight={"100vh"}
              maxHeight="100vh"
              position="sticky"
              top={0}
            >
              <DashboardDrawerItems onOpen={onOpen} />
            </Box>
            <Box>{children}</Box>
          </Grid>
        </Box>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DashboardDrawerContent onOpen={onOpen} />
        </Drawer>
      </Box>
    </DashboardRoute>
  );
}

export default DashboardLayout;
