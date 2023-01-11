import { RootState, TransferState } from 'modules';

export const selectTransferLoading = (state: RootState): TransferState['isLoading'] => state.user.transfer.isLoading;
export const selectTransferIsSuccess = (state: RootState): TransferState['isSuccess'] => state.user.transfer.isSuccess;
export const selectTransferIsError = (state: RootState): TransferState['isError'] => state.user.transfer.isError;
