export interface Patient {
    _id: string;
    name: string;
    email:string;
    phone: string;
    address: string;
    status: string;
    dob: string;
    imageLink?: string;
  }
  
  export interface PatientForm {
    _id: string;
    name: string;
    email:string;
    phone: string;
    address: string;
    status: string;
    dob: string;
    userFiles: any;
  }
  
  export interface PatientsResponse {
    patients: Patient[];
    message: string;
  }
  
  export interface PatientResponse {
    patient: Patient;
    message: string;
    patientId?: string;
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
  