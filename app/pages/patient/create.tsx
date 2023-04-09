import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useAppDispatch } from 'store/hook';
import DashboardLayout from 'components/DashboardLayout';
import CreatePatientForm from 'components/CreatePatientForm';

export default function CreatePatient() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const slug = router.query.slug as string;

  useEffect(() => {
    // dispatch(fetchPost(slug));
  }, [dispatch, slug]);

  return (
    <DashboardLayout bgColor="gray.50">
      <Box m={4}>
        <CreatePatientForm />
      </Box>
    </DashboardLayout>
  );
}
