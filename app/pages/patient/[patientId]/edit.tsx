import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "store/hook";
import { fetchPost } from "features/adminPost/AdminPostSlice";
import DashboardLayout from "components/DashboardLayout";
import CreatePatientForm from "components/CreatePatientForm";
import { fetchPatient } from "features/patient/PatientSlice";

export default function EditPatient() {
  let dispatch = useAppDispatch();
  let router = useRouter();
  let id = router.query.patientId as string;

  useEffect(() => {
    dispatch(fetchPatient(id));
  }, [dispatch, id]);

  return (
    <DashboardLayout bgColor="white">
      <CreatePatientForm />
    </DashboardLayout>
  );
}
