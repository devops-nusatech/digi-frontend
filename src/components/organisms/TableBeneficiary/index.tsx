import React, { FC, useEffect, useMemo, useState } from 'react';
import { IcEmpty, IcShorting } from 'assets';
import { Button, InputGroup, InputOtp, Portal, Skeleton } from 'components';
import { arrayFilter, truncateMiddle } from 'helpers';
import { useBeneficiariesFetch } from 'hooks';
import {
   CommonError,
   RootState,
   beneficiariesActivate,
   beneficiariesDelete,
   beneficiariesResendPin,
   selectBeneficiaries,
   selectBeneficiariesActivateError,
   selectBeneficiariesActivateLoading,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesDeleteLoading,
   selectBeneficiariesDeleteSuccess,
   selectBeneficiariesFetchLoading,
   selectBeneficiariesResendPinLoading,
   selectMemberLevelsLoading,
} from 'modules';
import { FormattedMessage } from 'react-intl';
import { MapDispatchToPropsFunction, connect, useSelector } from 'react-redux';

interface OwnProps {
   withSearch?: boolean;
}

type ReduxProps = {
   beneficiariesDeleteLoading: boolean;
   beneficiariesDeleteSuccess: boolean;
   beneficiariesActivateLoading: boolean;
   beneficiariesActivateSuccess: boolean;
   beneficiariesResendLoading: boolean;
   beneficiariesActivateError?: CommonError;
};

type DispatchProps = {
   resendBeneficiary: typeof beneficiariesResendPin;
   activateBeneficiary: typeof beneficiariesActivate;
   deleteBeneficiary: typeof beneficiariesDelete;
};

type TableBeneficiaryProps = OwnProps & ReduxProps & DispatchProps;

const TableBeneficiaryFC: FC<TableBeneficiaryProps> = ({
   withSearch,
   resendBeneficiary,
   activateBeneficiary,
   deleteBeneficiary,
   beneficiariesDeleteLoading,
   beneficiariesDeleteSuccess,
   beneficiariesActivateLoading,
   beneficiariesActivateSuccess,
   beneficiariesResendLoading,
   beneficiariesActivateError,
}) => {
   const [id, setId] = useState(0);
   const [pin, setPin] = useState('');
   const [openDelete, setOpenDelete] = useState(false);
   const [openActivate, setOpenActivate] = useState(false);
   const [searchBeneciciary, setSearchBeneciciary] = useState('');

   useBeneficiariesFetch();

   const beneficiaries = useSelector(selectBeneficiaries);
   const beneficiariesLoading = useSelector(selectBeneficiariesFetchLoading);
   const memberLevels = useSelector(selectMemberLevelsLoading);

   console.log('memberLevels :>> ', memberLevels);

   let beneficiariesList = beneficiaries || [];

   if (searchBeneciciary) {
      beneficiariesList = beneficiariesList.length
         ? arrayFilter(beneficiariesList, searchBeneciciary)
         : [];
   }

   // console.log('beneficiariesList', beneficiariesList)

   const handleShowModalActivate = (id: number, state: string) => {
      if (state === 'pending') {
         setOpenActivate(!openActivate);
      }
      setId(id);
   };
   const handleShowModalDelete = (id: number) => {
      setOpenDelete(!openDelete);
      setId(id);
   };

   const handleActivate = () => activateBeneficiary({ id, pin });

   useEffect(() => {
      if (pin.length === 6) {
         handleActivate();
      }
   }, [pin]);

   const renderContentDeleted = () => (
      <div className="space-y-8 pt-10">
         <div className="space-y-3">
            <div className="text-center font-dm text-2xl leading-9 tracking-custom">
               Sure delete?
            </div>
            <div className="mx-auto max-w-82 text-center text-xs leading-5 text-neutral4">
               you will remove the beneficiary by name{' '}
               <span className="font-semibold text-primary4">
                  {beneficiaries.find(e => e.id === id)?.name}
               </span>
            </div>
         </div>
         <Button
            text="Confirm"
            withLoading={beneficiariesDeleteLoading}
            onClick={() => deleteBeneficiary({ id })}
         />
      </div>
   );
   const renderContentActivate = () => (
      <div className="space-y-8 pt-10">
         <div className="space-y-3">
            <div className="text-center font-dm text-2xl leading-9 tracking-custom">
               Beneficiaries Activation
            </div>
            <div className="mx-auto max-w-82 text-center text-xs leading-5 text-neutral4">
               Save the new address, Please enter the code that we sent to your
               email.
            </div>
         </div>
         <InputOtp
            length={6}
            className="-mx-2 flex"
            onChangeOTP={setPin}
         />
         <div className="space-y-3 text-center">
            <Button
               text="Confirm"
               disabled={pin.length !== 6}
               onClick={handleActivate}
               withLoading={beneficiariesActivateLoading}
            />
            <button
               className={
                  beneficiariesResendLoading
                     ? ''
                     : 'font-medium text-primary1 hover:underline hover:underline-offset-4'
               }
               disabled={beneficiariesResendLoading}
               onClick={() => resendBeneficiary({ id })}>
               {!beneficiariesResendLoading ? (
                  'Resend code'
               ) : (
                  <Skeleton
                     width={100}
                     height={20}
                  />
               )}
            </button>
         </div>
      </div>
   );

   useEffect(() => {
      if (beneficiariesDeleteSuccess) {
         if (openDelete) {
            setOpenDelete(false);
         }
      }
      if (beneficiariesActivateSuccess) {
         if (openActivate) {
            setOpenActivate(false);
         }
      }
      if (pin.length === 6) {
         handleActivate();
      }
      if (beneficiariesActivateError?.message) {
         setPin('');
      }
   }, [
      beneficiariesDeleteSuccess,
      beneficiariesActivateSuccess,
      beneficiariesActivateError,
      pin,
   ]);

   const renderBeneficiaries = useMemo(
      () => (
         <table className="w-full table-auto">
            <thead>
               <tr>
                  <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <div className="flex cursor-pointer items-center space-x-1">
                        <div>#</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <div className="flex cursor-pointer items-center space-x-1">
                        <div>Label</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <div className="flex cursor-pointer items-center space-x-1">
                        <div>Address</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-8 text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <div className="flex cursor-pointer items-center space-x-1">
                        <div>Status</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
                  <th className="border-b border-neutral6 px-4 pb-8 text-right text-xs font-semibold leading-custom4 text-neutral4 dark:border-neutral2">
                     <div className="flex cursor-pointer items-center justify-end space-x-1">
                        <div>Action</div>
                        <IcShorting className="fill-neutral4" />
                     </div>
                  </th>
               </tr>
            </thead>
            <tbody>
               {beneficiariesLoading ? (
                  <>
                     <tr>
                        <td
                           colSpan={5}
                           className="px-4 py-3 last:pb-0">
                           <Skeleton
                              height={20}
                              isWithFull
                              rounded="md"
                           />
                        </td>
                     </tr>
                     <tr>
                        <td
                           colSpan={5}
                           className="px-4 py-3 last:pb-0">
                           <Skeleton
                              height={20}
                              isWithFull
                              rounded="md"
                           />
                        </td>
                     </tr>
                     <tr>
                        <td
                           colSpan={5}
                           className="px-4 py-3 last:pb-0">
                           <Skeleton
                              height={20}
                              isWithFull
                              rounded="md"
                           />
                        </td>
                     </tr>
                  </>
               ) : beneficiariesList.length ? (
                  beneficiariesList.map(
                     (
                        { id, name, data: { address }, state, blockchain_key },
                        index
                     ) => (
                        <tr
                           key={blockchain_key}
                           style={{ transition: 'background .2s' }}
                           className="group">
                           <td
                              onClick={() => handleShowModalActivate(id, state)}
                              className="rounded-l-xl p-4 align-middle text-xs font-semibold leading-custom4 text-neutral4 transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div>{index + 1} .</div>
                           </td>
                           <td
                              onClick={() => handleShowModalActivate(id, state)}
                              className="p-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div>{name}</div>
                           </td>
                           <td
                              onClick={() => handleShowModalActivate(id, state)}
                              className="p-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div>{truncateMiddle(String(address), 20)}</div>
                           </td>
                           <td
                              onClick={() => handleShowModalActivate(id, state)}
                              className="p-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div
                                 className={
                                    state === 'active'
                                       ? 'text-primary5 dark:text-chart1'
                                       : 'text-primary4'
                                 }>
                                 {state}
                              </div>
                           </td>
                           <td className="rounded-r-xl p-4 align-middle font-medium transition-all duration-300 group-hover:bg-neutral7 dark:group-hover:bg-neutral2">
                              <div className="flex items-center justify-end">
                                 <svg
                                    onClick={e => {
                                       e.stopPropagation();
                                       handleShowModalDelete(id);
                                    }}
                                    className="h-6 w-6 cursor-pointer fill-primary4 transition-colors duration-300">
                                    <use xlinkHref="#icon-close-circle" />
                                 </svg>
                              </div>
                           </td>
                        </tr>
                     )
                  )
               ) : (
                  <tr>
                     <td colSpan={5}>
                        <div className="flex min-h-96 flex-col items-center justify-center space-y-3">
                           <IcEmpty />
                           <div className="text-xs font-semibold text-neutral4">
                              <FormattedMessage id="noResultFound" />
                           </div>
                        </div>
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      ),
      [beneficiaries]
   );

   return (
      <>
         <div className="space-y-10">
            {withSearch && beneficiaries.length ? (
               <InputGroup
                  value={searchBeneciciary}
                  onChange={setSearchBeneciciary}
                  autoFocus
                  icon={
                     <svg className="h-5 w-5 fill-neutral4 transition-colors duration-200">
                        <use xlinkHref="#icon-search" />
                     </svg>
                  }
               />
            ) : null}
            <div className="overflow-x-auto">{renderBeneficiaries}</div>
         </div>
         <Portal
            show={openDelete}
            close={() => setOpenDelete(!openDelete)}>
            {renderContentDeleted()}
         </Portal>
         <Portal
            show={openActivate}
            close={() => setOpenActivate(!openActivate)}>
            {renderContentActivate()}
         </Portal>
      </>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   beneficiariesDeleteLoading: selectBeneficiariesDeleteLoading(state),
   beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
   beneficiariesActivateLoading: selectBeneficiariesActivateLoading(state),
   beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
   beneficiariesActivateError: selectBeneficiariesActivateError(state),
   beneficiariesResendLoading: selectBeneficiariesResendPinLoading(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   resendBeneficiary: payload => dispatch(beneficiariesResendPin(payload)),
   activateBeneficiary: payload => dispatch(beneficiariesActivate(payload)),
   deleteBeneficiary: ({ id }) => dispatch(beneficiariesDelete({ id })),
});

export const TableBeneficiary = connect(
   mapStateToProps,
   mapDispatchToProps
)(TableBeneficiaryFC) as any;

TableBeneficiaryFC.defaultProps = {
   withSearch: false,
};
