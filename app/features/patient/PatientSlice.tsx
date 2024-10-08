import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/toast';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import {
  IPatientState,
  PatientForm,
  PatientResponse,
  PatientsResponse,
} from 'types/patient';
import patientService from 'services/patient';
import { createBrearerAccessToken } from 'utils/token';

const toast = createStandaloneToast();

export const fetchPatients = createAsyncThunk(
  'patient/list',
  async (
    params: {
      page: number;
      perPage: number;
      query?: string;
      category?: string;
    },
    thunkApi,
  ) => {
    try {
      const data: PatientsResponse = await patientService.fetchPatients(params);

      const nomore = data.patients.length < params.perPage;

      return { page: params.page, nomore, ...data };
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message,
      );
    }
  },
);

export const fetchPatient = createAsyncThunk(
  'patient/single',
  async (patientId: string, thunkApi) => {
    try {
      const response = await axios.get<PatientResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/patients/${patientId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: createBrearerAccessToken(),
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message,
      );
    }
  },
);

export const createPatient = createAsyncThunk(
  'patient/create',
  async (patient: PatientForm, thunkApi) => {
    try {
      const data = new FormData();
      data.append('file', patient.userFiles[0]);
      data.append('name', patient.name);
      data.append('email', patient.email);
      data.append('contact', patient.contact);
      data.append('address', patient.address);
      data.append('gender', patient.gender);
      data.append('dob', patient.dob);

      const response = await axios.post<PatientResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/patients`,
        data,
        {
          headers: {
            Authorization: createBrearerAccessToken(),
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message,
      );
    }
  },
);

export const updatePatient = createAsyncThunk(
  'patient/update',
  async (patient: PatientForm, thunkApi) => {
    try {
      if (patient.userFiles.length < 0) delete patient.userFiles;
      const data = new FormData();
      data.append('file', patient.userFiles[0]);
      data.append('name', patient.name);
      data.append('email', patient.email);
      data.append('contact', patient.contact);
      data.append('address', patient.address);
      data.append('gender', patient.gender);
      data.append('dob', patient.dob);
      data.append('notes', patient.notes);

      const response = await axios.put<PatientResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/patients/${patient.id}`,
        data,
        {
          headers: {
            Authorization: createBrearerAccessToken(),
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message,
      );
    }
  },
);

export const deletePatient = createAsyncThunk(
  'patient/delete',
  async (patientId: number, thunkApi) => {
    try {
      const response = await axios.delete<PatientResponse>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/patients/${patientId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      response.data.patientId = patientId;
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error.response.data.message || error.message,
      );
    }
  },
);

export const initfetchPatients = (params: any) => async (dispatch: any) => {
  await dispatch(initPatients());
  return await dispatch(fetchPatients({ page: 1, perPage: 1 }));
};

export const fetchMorePatients =
  (params: any) => async (dispatch: any, getState: any) => {
    await dispatch(incrementPage());
    // return await dispatch(fetchPatients({ page: getState().post.page  }));
  };

const initialState: IPatientState = {
  patients: [],
  patientsLoading: false,
  patientsError: '',
  page: 1,
  perPage: 10,
  total: 1000,
  selectedRows: 1,
  nomore: false,
  paginationRowsPerPage: [10, 15, 20, 30, 50, 100],
  filter: {},

  patient: null,
  patientLoading: false,
  patientError: '',

  creating: false,
  createError: '',

  updating: false,
  updateError: '',

  deleting: false,
  deleteError: '',
};

export const AdminPostSlice = createSlice({
  name: 'admin/post',
  initialState,
  reducers: {
    handlePageChange: (state, data) => {
      console.log(data, 'handlePageChange');
      state.page = data.payload.page;
      state.perPage = data.payload.perPage;
    },

    handlePerRowsChange: (state, data) => {
      const { perPage, page } = data.payload;
      state.page = page;
      state.perPage = perPage;
      // setPage(page);
      // setPerPage(newPerPage);
    },

    handleFilter: (state, data) => {
      // setFilter(data);
      state.filter = data;
    },

    handleClick: (state, data) => {
      state.patient = data.payload.patient;
      // setSelectedUser(data);
      // $("#nameDetailModal").modal("toggle");
    },

    handleSelectedRowsChange: (state, data) => {
      state.selectedRows = data.payload.selectedRows;
    },

    rowDisabledCriteria: (row) => {
      // return !row.image_id || !row.register_no;
    },

    incrementPage: (row) => {
      // return !row.image_id || !row.register_no;
    },
    incrementPatient: (row) => {
      // return !row.image_id || !row.register_no;
    },
    initPatients: (state) => {
      state.patients = [];
      state.page = 1;
      state.nomore = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPatients.pending, (state, action) => {
        state.patientsLoading = true;
        state.patientsError = '';
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patientsLoading = false;
        state.nomore = action.payload.nomore;
        state.patients = action.payload.patients;
        state.total = action.payload.total;
      })
      .addCase(fetchPatients.rejected, (state, action: PayloadAction<any>) => {
        state.patientsLoading = false;
        state.patientsError = action.payload;
      })

      .addCase(fetchPatient.pending, (state, action) => {
        state.patientLoading = true;
        state.patient = null;
        state.patientError = '';
        state.updateError = '';
      })
      .addCase(
        fetchPatient.fulfilled,
        (state, action: PayloadAction<PatientResponse>) => {
          state.patientLoading = false;
          state.patient = action.payload.patient;
        },
      )
      .addCase(fetchPatient.rejected, (state, action: PayloadAction<any>) => {
        state.patientsLoading = false;
        state.patientsError = action.payload;
      })

      .addCase(createPatient.pending, (state, action) => {
        state.creating = true;
        state.createError = '';
      })
      .addCase(
        createPatient.fulfilled,
        (state, action: PayloadAction<PatientResponse>) => {
          state.creating = false;

          toast.toast({
            title: 'Patient Created successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
      )
      .addCase(createPatient.rejected, (state, action: PayloadAction<any>) => {
        state.creating = false;
        state.createError = action.payload;
      })

      .addCase(updatePatient.pending, (state, action) => {
        state.updating = true;
        state.updateError = '';
      })
      .addCase(
        updatePatient.fulfilled,
        (state, action: PayloadAction<PatientResponse>) => {
          state.updating = false;

          toast.toast({
            title: 'Patient edited successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
      )
      .addCase(updatePatient.rejected, (state, action: PayloadAction<any>) => {
        state.updating = false;
        state.updateError = action.payload;
      })

      .addCase(deletePatient.pending, (state, action) => {
        state.deleting = true;
        state.deleteError = '';
      })
      .addCase(
        deletePatient.fulfilled,
        (state, action: PayloadAction<PatientResponse>) => {
          state.deleting = false;
          state.patients = state.patients.filter((v) => {
            return !(v.id === action.payload.patientId);
          });

          toast.toast({
            title: 'Patient deleted successfully',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        },
      )
      .addCase(deletePatient.rejected, (state, action: PayloadAction<any>) => {
        state.deleting = false;
        state.deleteError = action.payload;
      });
  },
});
export const {
  rowDisabledCriteria,
  incrementPage,
  initPatients,
  handlePageChange,
  handleClick,
  handleFilter,
  handlePerRowsChange,
  handleSelectedRowsChange,
} = AdminPostSlice.actions;

// export const selectCount = (state: RootState) => state.auth.user;

export default AdminPostSlice.reducer;
