import { GroupMember, RootState } from '../..';

export const selectGroupMember = (state: RootState): GroupMember =>
   state.user.groupMember.data;
