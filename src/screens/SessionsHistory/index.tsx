import React, { FunctionComponent, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { injectIntl } from 'react-intl';
import { IntlProps } from 'index';
import { LayoutProfile, Pagination, Skeleton } from 'components';
import { localeDate, setDocumentTitle, getUserAgent } from 'helpers';
import {
   getUserActivity,
   RootState,
   selectTotalNumber,
   selectUserActivity,
   selectUserActivityCurrentPage,
   selectUserActivityFirstElemIndex,
   selectUserActivityLastElemIndex,
   selectUserActivityLoading,
   selectUserActivityNextPageExists,
   selectUserActivityPageCount,
   UserActivityDataInterface,
} from 'modules';
import { IcEmpty } from 'assets';

// import { useTable } from 'react-table';

// const columns: ColumnDef<any, any>[] = [
//    {
//       accessorKey: 'created_at',
//       header: 'Date / time',
//    }, {
//       accessorKey: 'action',
//       header: 'Action',
//    }
// ]

interface ReduxProps {
   loading: boolean;
   total: number;
   page: number;
   pageCount: number;
   firstElemIndex: number;
   lastElemIndex: number;
   nextPageExists: boolean;
   userActivity: UserActivityDataInterface[];
}

interface DispatchProps {
   getUserActivity: typeof getUserActivity;
}

const paginationLimit = 10;

type Props = ReduxProps & DispatchProps & IntlProps;

const SessionsHistoryFC = ({
   loading,
   userActivity,
   getUserActivity,
   intl,
   firstElemIndex,
   lastElemIndex,
   total,
   page,
   nextPageExists,
   pageCount,
}: Props) => {
   useEffect(() => {
      setDocumentTitle('Sessions History');
      getUserActivity({ page: 0, limit: paginationLimit });
   }, []);

   const mainRef = useRef<HTMLDivElement>(null);

   const translate = (id: string) => intl.formatMessage({ id });

   const getResultOfUserAction = (value: string) => {
      switch (value) {
         case 'login':
            return translate('page.body.profile.content.action.login');
         case 'logout':
            return translate('page.body.profile.content.action.logout');
         case 'request QR code for 2FA':
            return translate('page.body.profile.content.action.request2fa');
         case 'enable 2FA':
            return translate('page.body.profile.content.action.enable2fa');
         case 'login::2fa':
            return translate('page.body.profile.content.action.login.2fa');
         case 'request password reset':
            return translate(
               'page.body.profile.content.action.requestPasswordReset'
            );
         case 'password reset':
            return translate('page.body.profile.content.action.passwordReset');
         default:
            return value;
      }
   };

   const onClickPrevPage = () =>
      getUserActivity({ page: page - 1, limit: paginationLimit });

   const onClickNextPage = () =>
      getUserActivity({ page: page + 1, limit: paginationLimit });

   return (
      <LayoutProfile
         mainRef={mainRef}
         title="Sessions history"
         withBreadcrumbs={{
            display: 'Home',
            href: '/',
            active: 'Sessions history',
         }}>
         <div className="space-y-4">
            <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
               Sessions history
            </div>
            {/* <Table columns={columns} data={userActivity} /> */}
            <div className="overflow-x-auto">
               <table className="w-full table-auto">
                  <thead>
                     <tr className="border-b border-neutral7 dark:border-neutral2">
                        <th className="p-4 pl-0 text-left text-xs font-semibold leading-custom4 dark:text-neutral5">
                           Date / time
                        </th>
                        <th className="p-4 text-left text-xs font-semibold leading-custom4 dark:text-neutral5">
                           Action
                        </th>
                        <th className="p-4 text-left text-xs font-semibold leading-custom4 dark:text-neutral5">
                           IP address
                        </th>
                        <th className="p-4 text-left text-xs font-semibold leading-custom4 dark:text-neutral5">
                           Device
                        </th>
                        <th className="p-4 pr-0 text-right text-xs font-semibold leading-custom4 dark:text-neutral5">
                           Status
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {loading ? (
                        <>
                           <tr>
                              <td
                                 colSpan={5}
                                 className="py-3 last:pb-0">
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
                                 className="py-3 last:pb-0">
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
                                 className="py-3 last:pb-0">
                                 <Skeleton
                                    height={20}
                                    isWithFull
                                    rounded="md"
                                 />
                              </td>
                           </tr>
                        </>
                     ) : userActivity.length ? (
                        userActivity.map(
                           (
                              {
                                 created_at,
                                 action,
                                 result,
                                 user_ip,
                                 user_agent,
                              },
                              index
                           ) => (
                              <tr
                                 key={index}
                                 className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                 <td className="p-4 pl-0">
                                    <div className="whitespace-nowrap font-medium">
                                       {localeDate(created_at, 'shortDate')
                                          .split(' ')
                                          .shift()}
                                    </div>
                                    <div className="text-neutral4">
                                       {localeDate(created_at, 'time')}
                                    </div>
                                 </td>
                                 <td className="p-4">
                                    <div className="whitespace-nowrap font-medium">
                                       {getResultOfUserAction(action)}
                                    </div>
                                 </td>
                                 <td className="p-4">
                                    <div className="w-24 truncate font-medium">
                                       {user_ip}
                                    </div>
                                 </td>
                                 <td className="p-4">
                                    <div className="font-medium">
                                       {getUserAgent(user_agent)}
                                    </div>
                                 </td>
                                 <td className="p-4 pr-0 text-right">
                                    <div
                                       className={`${
                                          result === 'succeed'
                                             ? 'text-primary1'
                                             : 'text-primary4'
                                       }`}>
                                       {translate(
                                          `page.body.profile.content.result.${result}`
                                       )}
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
                                    {translate('noResultFound')}
                                 </div>
                              </div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
            <Pagination
               firstElemIndex={firstElemIndex}
               lastElemIndex={lastElemIndex}
               total={total}
               page={page}
               nextPageExists={nextPageExists}
               onClickPrevPage={onClickPrevPage}
               onClickNextPage={onClickNextPage}
            />
         </div>
      </LayoutProfile>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   userActivity: selectUserActivity(state),
   loading: selectUserActivityLoading(state),
   total: selectTotalNumber(state),
   page: selectUserActivityCurrentPage(state),
   pageCount: selectUserActivityPageCount(state, paginationLimit),
   firstElemIndex: selectUserActivityFirstElemIndex(state, paginationLimit),
   lastElemIndex: selectUserActivityLastElemIndex(state, paginationLimit),
   nextPageExists: selectUserActivityNextPageExists(state, paginationLimit),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   getUserActivity: params => dispatch(getUserActivity(params)),
});

export const SessionsHistory = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(SessionsHistoryFC) as FunctionComponent;
