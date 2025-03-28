import { create } from 'zustand';
import { SystemUser } from '@/types/chat';
import { getAll } from '@services/patientService';

type PatientState = {
  patients: SystemUser[];
  loading: boolean;
  error: string | null;
};

type PatientActions = {
  fetchPatients: () => Promise<void>;
  addPatient: (patient: SystemUser) => void;
  updatePatient: (id: string, updatedData: Partial<SystemUser>) => void;
  deletePatient: (id: string) => void;
  reset: () => void;
};

const initialState: PatientState = {
  patients: [],
  loading: false,
  error: null,
};

export const usePatientStore = create<PatientState & PatientActions>((set) => ({
  ...initialState,

  fetchPatients: async () => {
    set({ loading: true, error: null });
    try {
      const patients = await getAll();
      set({ patients, loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch patients' 
      });
    }
  },

  addPatient: (patient) => {
    set((state) => ({
      patients: [...state.patients, patient],
    }));
  },

  updatePatient: (id, updatedData) => {
    set((state) => ({
      patients: state.patients.map((patient) =>
        patient.user_id === id ? { ...patient, ...updatedData } : patient
      ),
    }));
  },

  deletePatient: (id) => {
    set((state) => ({
      patients: state.patients.filter((patient) => patient.user_id !== id),
    }));
  },

  reset: () => {
    set(initialState);
  },
}));