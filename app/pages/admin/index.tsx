import { useEffect } from "react";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchUserData } from "features/auth/AuthSlice";
import AdminLayout from "components/admin/AdminLayout";

export default function Home() {
  let dispatch = useAppDispatch();
  let router = useRouter();
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
