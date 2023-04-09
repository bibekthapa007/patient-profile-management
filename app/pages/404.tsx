import { Box } from '@chakra-ui/react';

import DashboardLayout from 'components/DashboardLayout';

export default function NotFound() {
  return (
    <DashboardLayout bgColor="gray.50">
      <Box m={4}>Not Found.</Box>
    </DashboardLayout>
  );
}
