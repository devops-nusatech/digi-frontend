import { IcEmty, IcShorting } from 'assets';
import { Button, InputGroup, InputOtp, Portal, Skeleton } from 'components';
import { arrayFilter, truncateMiddle } from 'helpers';
import { useBeneficiariesFetch, useMemberLevelFetch } from 'hooks';
import { CommonError, RootState, beneficiariesActivate, beneficiariesDelete, beneficiariesResendPin, selectBeneficiaries, selectBeneficiariesActivateError, selectBeneficiariesActivateLoading, selectBeneficiariesActivateSuccess, selectBeneficiariesDeleteLoading, selectBeneficiariesDeleteSuccess, selectBeneficiariesFetchLoading, selectBeneficiariesResendPinLoading, selectMemberLevelsLoading } from 'modules';
import React, { FC, memo, useEffect, useState } from 'react';
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
}

type DispatchProps = {
   resendBeneficiary: typeof beneficiariesResendPin;
   activateBeneficiary: typeof beneficiariesActivate;
   deleteBeneficiary: typeof beneficiariesDelete;
}

type TableBeneficiaryProps = OwnProps & ReduxProps & DispatchProps;

const TableBeneficiaryFC: FC<TableBeneficiaryProps> = memo(({
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
   useMemberLevelFetch();
   const beneficiaries = useSelector(selectBeneficiaries);
   const beneficiariesLoading = useSelector(selectBeneficiariesFetchLoading);
   const memberLevels = useSelector(selectMemberLevelsLoading);
   console.log('memberLevels :>> ', memberLevels);

   let beneficiariesList = beneficiaries || [];

   if (searchBeneciciary) {
      beneficiariesList = beneficiariesList.length ? arrayFilter(beneficiariesList, searchBeneciciary) : [];
   }

   const handleShowModalActivate = (id: number, state: string) => {
      if (state === 'pending') {
         setOpenActivate(!openActivate);
      }
      setId(id);
   }
   const handleShowModalDelete = (id: number) => {
      setOpenDelete(!openDelete);
      setId(id);
   }

   const handleActivate = () => activateBeneficiary({ id, pin });

   const renderContentDeleted = () => (
      <div className="pt-10 space-y-8">
         <div className="space-y-3">
            <div className="font-dm text-2xl leading-9 text-center tracking-custom">
               Sure delete?
            </div>
            <div className="max-w-82 mx-auto text-center text-xs text-neutral4 leading-5">
               you will remove the beneficiary by name <span className="font-semibold text-primary4">{beneficiaries.find(e => e.id === id)?.name}</span>
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
      <div className="pt-10 space-y-8">
         <div className="space-y-3">
            <div className="font-dm text-2xl leading-9 text-center tracking-custom">
               Beneficiaries Activation
            </div>
            <div className="max-w-82 mx-auto text-center text-xs text-neutral4 leading-5">
               Save the new address, Please enter the code that we sent to your email.
            </div>
         </div>
         <InputOtp
            length={6}
            className="flex -mx-2"
            isNumberInput
            onChangeOTP={setPin}
         />
         <div className="space-y-3 text-center">
            <Button
               text={'Confirm'}
               disabled={pin.length !== 6}
               onClick={handleActivate}
               withLoading={beneficiariesActivateLoading}
            />
            <button
               className={beneficiariesResendLoading ? '' : 'text-primary1 font-medium hover:underline hover:underline-offset-4'}
               disabled={beneficiariesResendLoading}
               onClick={() => resendBeneficiary({ id })}
            >
               {!beneficiariesResendLoading ? 'Resend code' : (
                  <Skeleton width={100} height={20} />
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
   }, [beneficiariesDeleteSuccess, beneficiariesActivateSuccess, beneficiariesActivateError, pin]);

   return (
      <>
         <div className="space-y-10">
            {(withSearch && beneficiaries.length) ? (
               <InputGroup
                  value={searchBeneciciary}
                  onChange={setSearchBeneciciary}
                  autoFocus
                  icon={
                     <svg className="w-5 h-5 fill-neutral4 transition-colors duration-200">
                        <use xlinkHref="#icon-search" />
                     </svg>
                  }
               />
            ) : null}
            <div className="overflow-x-auto">
               <table className="w-full table-auto">
                  <thead>
                     <tr>
                        <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                           <div className="flex items-center space-x-1 cursor-pointer">
                              <div>#</div>
                              <IcShorting className="fill-neutral4" />
                           </div>
                        </th>
                        <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                           <div className="flex items-center space-x-1 cursor-pointer">
                              <div>Label</div>
                              <IcShorting className="fill-neutral4" />
                           </div>
                        </th>
                        <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                           <div className="flex items-center space-x-1 cursor-pointer">
                              <div>Address</div>
                              <IcShorting className="fill-neutral4" />
                           </div>
                        </th>
                        <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4">
                           <div className="flex items-center space-x-1 cursor-pointer">
                              <div>Status</div>
                              <IcShorting className="fill-neutral4" />
                           </div>
                        </th>
                        <th className="px-4 pb-8 border-b border-neutral6 dark:border-neutral2 text-xs leading-custom4 font-semibold text-neutral4 text-right">
                           <div className="flex items-center space-x-1 cursor-pointer justify-end">
                              <div>Action</div>
                              <IcShorting className="fill-neutral4" />
                           </div>
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        beneficiariesLoading ? (
                           <>
                              <tr>
                                 <td colSpan={5} className="px-4 py-3 last:pb-0">
                                    <Skeleton height={20} isWithFull rounded="md" />
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={5} className="px-4 py-3 last:pb-0">
                                    <Skeleton height={20} isWithFull rounded="md" />
                                 </td>
                              </tr>
                              <tr>
                                 <td colSpan={5} className="px-4 py-3 last:pb-0">
                                    <Skeleton height={20} isWithFull rounded="md" />
                                 </td>
                              </tr>
                           </>
                        ) : beneficiariesList.length ? beneficiariesList.map(({ id, name, data: { address }, state, currency }, index) => (
                           <tr
                              key={index}
                              style={{ transition: 'background .2s' }}
                              className="group"
                           >
                              <td onClick={() => handleShowModalActivate(id, state)} className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs p-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                                 <div>{index + 1}</div>
                              </td>
                              <td onClick={() => handleShowModalActivate(id, state)} className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                                 <div>{name}</div>
                              </td>
                              <td onClick={() => handleShowModalActivate(id, state)} className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                                 <div>{truncateMiddle(String(address), 20)}</div>
                              </td>
                              <td onClick={() => handleShowModalActivate(id, state)} className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                                 <div className={state === 'active' ? 'text-primary5 dark:text-chart1' : 'text-primary4'}>{state}</div>
                              </td>
                              <td className="rounded-r-xl p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                                 <div className="flex justify-end items-center">
                                    <svg
                                       onClick={e => {
                                          e.stopPropagation();
                                          handleShowModalDelete(id);
                                       }}
                                       className="cursor-pointer w-6 h-6 fill-primary4 transition-colors duration-300"
                                    >
                                       <use xlinkHref="#icon-close-circle" />
                                    </svg>
                                 </div>
                              </td>
                           </tr>
                        )) : (
                           <tr>
                              <td colSpan={5}>
                                 <div className="min-h-96 flex flex-col items-center justify-center space-y-3">
                                    <IcEmty />
                                    <div className="text-xs font-semibold text-neutral4">
                                       <FormattedMessage id="noResultFound" />
                                    </div>
                                 </div>
                              </td>
                           </tr>
                        )
                     }

                  </tbody>
               </table>
            </div>
         </div>
         <Portal
            show={openDelete}
            close={() => setOpenDelete(!openDelete)}
         >
            {renderContentDeleted()}
         </Portal>
         <Portal
            show={openActivate}
            close={() => setOpenActivate(!openActivate)}
         >
            {renderContentActivate()}
         </Portal>
      </>
   );

});

const mapStateToProps = (state: RootState): ReduxProps => ({
   beneficiariesDeleteLoading: selectBeneficiariesDeleteLoading(state),
   beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
   beneficiariesActivateLoading: selectBeneficiariesActivateLoading(state),
   beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
   beneficiariesActivateError: selectBeneficiariesActivateError(state),
   beneficiariesResendLoading: selectBeneficiariesResendPinLoading(state),
})

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   resendBeneficiary: payload => dispatch(beneficiariesResendPin(payload)),
   activateBeneficiary: payload => dispatch(beneficiariesActivate(payload)),
   deleteBeneficiary: ({ id }) => dispatch(beneficiariesDelete({ id })),
});

export const TableBeneficiary = connect(mapStateToProps, mapDispatchToProps)(TableBeneficiaryFC) as any;

TableBeneficiaryFC.defaultProps = {
   withSearch: false,
}
