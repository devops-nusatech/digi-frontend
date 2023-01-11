import { IcEmty, IcShorting } from 'assets';
import { InputGroup, Skeleton } from 'components';
import { arrayFilter, truncateMiddle } from 'helpers';
import { useBeneficiariesFetch, useMemberLevelFetch } from 'hooks';
import { selectBeneficiaries, selectBeneficiariesFetchLoading, selectMemberLevelsLoading } from 'modules';
import React, { FC, memo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

interface TableBeneficiaryProps {
   withSearch?: boolean;
}

export const TableBeneficiary: FC<TableBeneficiaryProps> = memo(({ withSearch }) => {
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

   return (
      <div className="space-y-10">
         {(withSearch && (beneficiaries.length && searchBeneciciary)) ? (
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
                           <td className="rounded-l-xl text-neutral4 align-middle font-semibold text-xs p-4 leading-custom4 group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                              <div>{index + 1}</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                              <div>{name}</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                              <div>{truncateMiddle(String(address), 20)}</div>
                           </td>
                           <td className="p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 transition-all duration-300">
                              <div>{state}</div>
                           </td>
                           <td className="rounded-r-xl p-4 align-middle font-medium group-hover:bg-neutral7 dark:group-hover:bg-neutral2 text-right transition-all duration-300">
                              <svg className="w-6 h-6 fill-primary4 transition-colors duration-300">
                                 <use xlinkHref="#icon-close-circle" />
                              </svg>
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
   )
});

TableBeneficiary.defaultProps = {
   withSearch: false,
}
