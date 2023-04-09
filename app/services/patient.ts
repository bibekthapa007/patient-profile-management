import axios from 'axios';

import { createBrearerAccessToken } from 'utils/token';

import { PatientsResponse, PatientResponse } from 'types/patient';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchPatients = async (params = {}) => {
  const { data } = await axios.get<PatientsResponse>(
    `${baseUrl}/api/patients`,
    {
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: createBrearerAccessToken(),
      },
    },
  );

  return data;
};

export const fetchPatientById = async (patientId: number, params = {}) => {
  const { data } = await axios.get<PatientResponse>(
    `${baseUrl}/api/patients/${patientId}`,
    {
      params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: createBrearerAccessToken(),
      },
    },
  );

  return data;
};

export const createPatient = async (body: any) => {
  const { data } = await axios.post<PatientResponse>(
    `${baseUrl}/api/patients`,
    body,
    {
      headers: {
        Authorization: createBrearerAccessToken(),
      },
    },
  );

  return data;
};

export const updatePatient = async (patientId: number, body: any) => {
  const { data } = await axios.put<PatientResponse>(
    `${baseUrl}/api/patients/${patientId}`,
    body,
    {
      headers: {
        Authorization: createBrearerAccessToken(),
      },
    },
  );

  return data;
};

export const deletePatient = async (patientId: number) => {
  const { data } = await axios.delete<PatientResponse>(
    `${baseUrl}/api/patients/${patientId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: createBrearerAccessToken(),
      },
      withCredentials: true,
    },
  );

  return data;
};

const patientSerives = {
  fetchPatients,
  fetchPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};

export default patientSerives;
