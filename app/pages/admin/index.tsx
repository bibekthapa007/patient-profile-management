import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';

import AdminLayout from 'components/admin/AdminLayout';
import { fetchUserData } from 'features/auth/AuthSlice';
import { useAppDispatch, useAppSelector } from 'store/hook';

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <AdminLayout bgColor="white">
      <Text>This is admin dashboard</Text>
    </AdminLayout>
  );
}
