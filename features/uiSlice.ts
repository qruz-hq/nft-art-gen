import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    isSuccess: false,
    successMessage: '',
    openModals: [] as string[],
    modalContent: {} as { [key: string]: any },
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
      console.log(action);
      state.openModals.push(action.payload.modalName);
      state.modalContent[action.payload.modalName] =
        action.payload.modalContent;
    },
    closeModal: (state, action) => {
      state.openModals = state.openModals.filter(
        modalName => modalName !== action.payload,
      );
      state.modalContent[action.payload] = undefined;
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
