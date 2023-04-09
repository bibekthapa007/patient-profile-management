import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

function Card({
  children,
  ...props
}: {
  children: ReactNode[] | ReactNode | null;
}) {
  return (
    <Box p={2} bgColor="white" width="100%" borderRadius={4} {...props}>
      {children}
    </Box>
  );
}

export default Card;
