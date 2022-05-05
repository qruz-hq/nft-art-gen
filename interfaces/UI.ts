export interface UIState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  isSuccess: boolean;
  successMessage: string;
  isModalOpen: boolean;
  modalContent: Function;
  traitMenu: undefined;
}
