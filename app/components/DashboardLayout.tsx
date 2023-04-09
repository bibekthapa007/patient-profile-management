import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/hooks';

import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
} from '@chakra-ui/modal';
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spinner,
} from '@chakra-ui/react';
import {
  Divider,
  Stack,
  Box,
  Grid,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/layout';

import {
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlineSetting,
} from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { MdPayment } from 'react-icons/md';
import { HiOutlineCalendar } from 'react-icons/hi';
import { BsPerson, BsQuestionCircle } from 'react-icons/bs';

import paths from 'utils/paths';
import { logout } from 'features/auth/AuthSlice';
import { useAppDispatch, useAppSelector } from 'store/hook';
import NavItem from './NavItem';

interface DashboardProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

interface DrawerProps {
  onOpen: () => void;
}

function DashboardDrawerItems({ onOpen }: DrawerProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <Stack w="100%">
      <Flex p={4} justifyContent="space-between" alignItems="center">
        <Flex flexDir="column">
          <Heading size="md">Zendenta</Heading>
          <Text>Patient Management App</Text>
        </Flex>
        {/* <IconButton
          aria-label="Main Drawer"
          onClick={onOpen}
          icon={<AiOutlineMenu />}
        /> */}
      </Flex>

      <NavItem icon={<BsQuestionCircle />} label="Overview" link={paths.home} />
      <NavItem
        icon={<HiOutlineCalendar />}
        label="Calender"
        link={paths.home}
      />
      <NavItem icon={<BsPerson />} label="Patient" link={paths.patient} />
      <NavItem
        icon={<BsPerson />}
        label="Appointment"
        link={paths.appointment}
      />
      <NavItem icon={<BsPerson />} label="Drugs" link={paths.drug} />
      <NavItem
        icon={<BsPerson />}
        label="Prescription"
        link={paths.prescription}
      />

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
          dispatch(logout()).then((data) => router.push('/login'));
        }}
        label="Log Out"
        link="/#"
      />
      <Divider color="gray.300" />
    </Stack>
  );
}

interface DashboardRouteProps {
  children: React.ReactNode | React.ReactNode[];
}

function DashboardRoute({ children }: DashboardRouteProps) {
  const { user, initialLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!initialLoading && !user) {
      Router.replace('/signin');
    }
  }, [user, initialLoading]);

  if (initialLoading) {
    return <Spinner />;
  }
  if (!initialLoading && user) {
    return <>{children}</>;
  }
  return null;
}

function DashboardDrawerContent({ onOpen }: DrawerProps) {
  return (
    <DrawerContent>
      <DrawerCloseButton />
      <DashboardDrawerItems onOpen={onOpen} />
    </DrawerContent>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  bgColor?: string;
}

function DashboardLayout({ children, bgColor }: DashboardLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const width = isSidebarOpen ? 300 : 0;

  return (
    <DashboardRoute>
      <Box>
        <Box bg={bgColor || 'gray.100'} minHeight="calc(100vh - 64px)">
          <Grid
            templateColumns={[
              'minmax(0px, auto)',
              'minmax(0px, auto)',
              `${width}px minmax(0px, 2fr)`,
              `${width}px minmax(0px, 3fr)`,
              `${width}px minmax(0px, 4fr)`,
            ]}
            autoRows="minmax(min-content, max-content)"
            position="relative"
            transition="200ms"
            overflow="hidden"
          >
            <Box
              display={['none', 'none', 'flex']}
              bg="white"
              height="100vh"
              maxWidth="100%"
              top={0}
              overflow="hidden"
            >
              <DashboardDrawerItems onOpen={onOpen} />
            </Box>
            <Box maxH="100vh" overflowY="scroll">
              <Flex bg="white" justifyContent="space-between" py="2" px="4">
                <IconButton
                  bg="white"
                  display={['auto', 'auto', 'none']}
                  aria-label="Main Drawer"
                  onClick={onOpen}
                  icon={<AiOutlineMenu />}
                />
                <IconButton
                  bg="white"
                  display={['none', 'none', 'flex']}
                  aria-label="Main Drawer"
                  onClick={() => {
                    setIsSidebarOpen((open) => !open);
                  }}
                  icon={<AiOutlineMenu />}
                />
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                  >
                    <Avatar
                      size="sm"
                      src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Setting</MenuItem>
                    <MenuDivider />
                    <MenuItem>Link 3</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
              {children}
            </Box>
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
