import { RootState, TransferState } from 'modules';

export const selectTransferLoading = (state: RootState): TransferState['isLoading'] => state.user.transfer.isLoading;
export const selectTransferIsSuccess = (state: RootState): TransferState['isSuccess'] => state.user.transfer.isSuccess;
export const selectTransferIsError = (state: RootState): TransferState['isError'] => state.user.transfer.isError;
export const selectDetailUserLoading = (state: RootState): TransferState['detailUserLoading'] => state.user.transfer.detailUserLoading;
export const selectDetailUserData = (state: RootState): TransferState['detailUserData'] => state.user.transfer.detailUserData;
export const selectDetailUserIsError = (state: RootState): TransferState['detailUserError'] => state.user.transfer.detailUserError;
