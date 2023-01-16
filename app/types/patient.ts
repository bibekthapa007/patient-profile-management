export interface Patient {
  id: number;
  name: string;
  email: string;
  contact: string;
  address: string;
  status: string;
  dob: string;
  imageLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientForm {
  id: number;
  name: string;
  email: string;
  dob: string;
  gender: string;
  contact: string;
  address: string;
  status: string;
  notes: string;
  userFiles: any;
}

export interface PatientsResponse {
  patients: Patient[];
  total: number;
  message: string;
}

export interface PatientResponse {
  patient: Patient;
  message: string;
  patientId?: number;
}

export interface IPatientState {
  patients: Patient[];
  patientsLoading: boolean;
  patientsError: string;
  page: number;
  perPage: number;
  total: number;
  selectedRows: number;
  filter: any;
  paginationRowsPerPage: number[];
  nomore: boolean;

  patient: Patient | null | undefined;
  patientLoading: boolean;
  patientError: string;

  creating: boolean;
  createError: "";

  deleting: boolean;
  deleteError: "";

  updating: boolean;
  updateError: "";
}

export interface IPatientAction {
  createPatient: (patient: Patient) => void;
  updatePatient: (patientId: number) => void;
  fetchPatients: () => void;
  fetchPatient: (patientId: number) => void;
  deletePatient: (patientId: number) => void;
}
