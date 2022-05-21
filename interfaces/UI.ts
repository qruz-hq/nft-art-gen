export interface UIState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  isSuccess: boolean;
  successMessage: string;
  openModals: string[];
  modalContent: { [key: string]: any };
  traitMenu: undefined;
}
