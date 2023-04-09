import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Select } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';
import { Button, IconButton } from '@chakra-ui/button';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Box, Container, Flex, Heading, Text, Spacer } from '@chakra-ui/layout';

import paths from 'utils/paths';
import { logout } from 'features/auth/AuthSlice';
import { setLang } from 'features/i18n/i18nSlice';
import { useAppDispatch, useAppSelector } from 'store/hook';

import { AiOutlineMenu } from 'react-icons/ai';
import { IoIosArrowDown, IoMdMail } from 'react-icons/io';

import NepaliIcon from '../public/nepali.svg';
import EnglishIcon from '../public/english.svg';

interface NavbarProps {
  admin?: boolean;
  onOpen: () => void;
}

function Navbar({ admin, onOpen }: NavbarProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { lang, supportedLangs } = useAppSelector((state) => state.i18n);
  const imageLink = user?.imageLink;

  return (
    <Box
      borderBottom="1px solid"
      // bg="green.400"
      // color="white"
      borderColor="gray.200"
      py={3}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <Link href="/">
              <Heading ml={2} as="h6" fontSize="2xl">
                Zendenta
              </Heading>
            </Link>
            {/* <Button ml="4" onClick={setModalOpen}>
              Log in
            </Button> */}
          </Flex>
          <Flex align="center" flexGrow="0">
            <Flex display={['none', 'none', 'flex']}>
              <Box mr={2}>
                <Link href={paths.category}>Categories</Link>
              </Box>
              <Box mr={2}>
                <Link href={paths.post}>Post</Link>
              </Box>
            </Flex>

            <Select
              placeholder="Select languages"
              size="lg"
              width="100%"
              value={lang}
              onChange={(e) => {
                e.preventDefault();
                console.log(e.target.value, 'value');
                dispatch(setLang(e.target.value));
              }}
            >
              {[
                { lang: 'en', label: 'English', icon: EnglishIcon },
                { lang: 'np', label: 'Nepal', icon: NepaliIcon },
              ].map((data) => {
                return (
                  <option key={data.lang} value={data.lang}>
                    <Image
                      height={data.icon.height}
                      width={data.icon.width}
                      src={data.icon.src}
                      alt="icon"
                    />
                    {data.label}
                  </option>
                );
              })}
            </Select>

            <Flex align="center" mr={2} display={['none', 'none', 'flex']}>
              {user ? (
                <ProfileMenu imageLink={imageLink} />
              ) : (
                <Flex>
                  <Link href={paths.signin}>
                    <Button variant="ghost" colorScheme="green" mr="2">
                      Signin
                    </Button>
                  </Link>
                  <Link href={paths.signup}>
                    <Button variant="solid" colorScheme="green">
                      Register
                    </Button>
                  </Link>
                </Flex>
              )}
            </Flex>

            <IconButton
              aria-label="Main Drawer"
              onClick={onOpen}
              colorScheme="green"
              icon={<AiOutlineMenu />}
              display={['inherit', 'inherit', 'none', 'none']}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

function ProfileMenu({ imageLink }: { imageLink: string | undefined }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  let src =
    'https://lh3.googleusercontent.com/a-/AOh14Gh3sw6_MgWpekvdavKnuW95E8FPfS-_y07WzkjM=s100';
  imageLink && (src = imageLink);

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            _active={{}}
            _hover={{}}
            colorScheme="green"
            px={[0, 2]}
            outline="none"
            rightIcon={<IoIosArrowDown />}
            leftIcon={<Avatar size="sm" src={src} />}
          >
            <Text display={['none', 'none', 'block']}>Hello Bibek</Text>
          </MenuButton>
          <MenuList boxShadow="lg" border="none" color="green.700">
            <MenuItem>
              <Link href={paths.setting}>Profile</Link>
            </MenuItem>
            <MenuItem>
              <Link href={paths.category}>Category</Link>
            </MenuItem>
            <MenuItem>
              <Link href={paths.post}>Post</Link>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault();
                dispatch(logout());
              }}
            >
              Log Out
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
}

export default Navbar;
