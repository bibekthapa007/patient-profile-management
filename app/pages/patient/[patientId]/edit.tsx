import { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { useAppDispatch } from 'store/hook';
import DashboardLayout from 'components/DashboardLayout';
import CreatePatientForm from 'components/CreatePatientForm';
import { fetchPatient } from 'features/patient/PatientSlice';

export default function EditPatient() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = router.query.patientId as string;

  useEffect(() => {
    dispatch(fetchPatient(id));
  }, [dispatch, id]);

  return (
    <DashboardLayout bgColor="gray.50">
      <Box m={4}>
        <CreatePatientForm />
      </Box>
    </DashboardLayout>
  );
}
