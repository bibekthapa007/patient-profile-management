import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "store/hook";
import { fetchPost } from "features/adminPost/AdminPostSlice";
import DashboardLayout from "components/DashboardLayout";
import CreatePatientForm from "components/CreatePatientForm";

export default function CreatePatient() {
  let dispatch = useAppDispatch();
  let router = useRouter();
  let slug = router.query.slug as string;

  useEffect(() => {
    dispatch(fetchPost(slug));
  }, [dispatch, slug]);

  return (
    <DashboardLayout bgColor="white">
      <CreatePatientForm />
    </DashboardLayout>
  );
}
