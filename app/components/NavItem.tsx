import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/layout';

interface NavItemProps {
  icon: any;
  label: string;
  link: string;
  onClick?: (e: any) => void;
}

function NavItem({ icon, label, link, onClick }: NavItemProps) {
  const router = useRouter();

  let active = false;

  if (router.pathname.split('/')[1] === link.split('/')[1]) {
    active = true;
  }

  return (
    <Link href={link} onClick={onClick}>
      <Box
        display="flex"
        alignItems="center"
        p={2}
        mt={0}
        bg={active ? 'blue.50' : ''}
        color={active ? 'blue.600' : 'gray.700'}
        borderLeft="4px"
        borderLeftColor={active ? 'blue.600' : 'transparent'}
        _hover={{
          bg: active ? 'blue.50' : 'gray.100',
        }}
      >
        <Flex align="center">
          {React.cloneElement(icon, { size: '20px' })}
          <Box ml={3} fontWeight="500">
            {label}
          </Box>
        </Flex>
      </Box>
    </Link>
  );
}

export default NavItem;
