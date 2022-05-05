import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    isSuccess: false,
    successMessage: '',
    isModalOpen: false,
    modalContent: {},
    traitMenu: undefined,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: state => {
      state.isModalOpen = false;
      state.modalContent = {};
    },
    setModalContent: (state, action) => {
      state.modalContent = action.payload;
    },
    setTraitMenu: (state, action) => {
      state.traitMenu = action.payload;
    },
  },
});

export const { openModal, setModalContent, closeModal, setTraitMenu } =
  uiSlice.actions;

export default uiSlice.reducer;
