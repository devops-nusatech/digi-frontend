import React, { useEffect, useState, FunctionComponent, useRef } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import {
   Button,
   InputGroup,
   InputOtp,
   LayoutProfile,
   Pagination,
   Portal,
   Skeleton,
   Switch,
} from 'components';
import { copyToClipboard, localeDate, setDocumentTitle } from 'helpers';
import {
   alertPush,
   ApiKeyCreateFetch,
   apiKeyCreateFetch,
   ApiKeyDataInterface,
   ApiKeyDeleteFetch,
   apiKeyDeleteFetch,
   ApiKeys2FAModal,
   apiKeys2FAModal,
   apiKeysFetch,
   ApiKeyStateModal,
   ApiKeyUpdateFetch,
   apiKeyUpdateFetch,
   RootState,
   selectUserInfo,
   User,
   selectApiKeys,
   selectApiKeysDataLoaded,
   selectApiKeysFirstElemIndex,
   selectApiKeysLastElemIndex,
   selectApiKeysLoading,
   selectApiKeysModal,
   selectApiKeysNextPageExists,
   selectApiKeysPageIndex,
} from 'modules';
import { IntlProps } from 'index';
import { IcEmpty, imgLock, imgLock2 } from 'assets';

interface ReduxProps {
   apiKeys: ApiKeyDataInterface[];
   dataLoaded: boolean;
   isLoading: boolean;
   modal: ApiKeyStateModal;
   user: User;
   pageIndex: number;
   firstElemIndex: number;
   lastElemIndex: number;
   nextPageExists: boolean;
}

interface DispatchProps {
   toggleApiKeys2FAModal: typeof apiKeys2FAModal;
   apiKeysFetch: typeof apiKeysFetch;
   createApiKey: typeof apiKeyCreateFetch;
   updateApiKey: typeof apiKeyUpdateFetch;
   deleteApiKey: typeof apiKeyDeleteFetch;
   fetchSuccess: typeof alertPush;
}

type Props = ReduxProps & DispatchProps & IntlProps;

const ApiKeysFC = ({
   apiKeysFetch,
   apiKeys,
   dataLoaded,
   isLoading,
   firstElemIndex,
   lastElemIndex,
   nextPageExists,
   pageIndex,
   user,
   intl,
   toggleApiKeys2FAModal,
   modal,
   createApiKey,
   deleteApiKey,
   fetchSuccess,
   updateApiKey,
}: Props) => {
   const history = useHistory();
   const [otpCode, setOtpCode] = useState('');
   const mainRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      setDocumentTitle('My API Keys');
      apiKeysFetch({ pageIndex: 0, limit: 2 });
   }, []);

   useEffect(() => {
      if (otpCode.length === 6) {
         renderOnClick();
      }
   }, [otpCode]);

   const translate = (key: string) => intl.formatMessage({ id: key });

   const onClickPrevPage = () =>
      apiKeysFetch({ pageIndex: Number(pageIndex) - 1, limit: 4 });
   const onClickNextPage = () =>
      apiKeysFetch({ pageIndex: Number(pageIndex) + 1, limit: 4 });

   const handleUpdateAPIKey = apiKey => {
      const payload: ApiKeys2FAModal['payload'] = {
         active: true,
         action: 'updateKey',
         apiKey,
      };
      toggleApiKeys2FAModal(payload);
   };

   const handleDestroyAPIKey = apiKey => {
      const payload: ApiKeys2FAModal['payload'] = {
         active: true,
         action: 'deleteKey',
         apiKey,
      };
      toggleApiKeys2FAModal(payload);
   };

   const handleCloseTFAModal = () => {
      const payload: ApiKeys2FAModal['payload'] = { active: false };
      toggleApiKeys2FAModal(payload);
      setOtpCode('');
   };

   // const renderModal = () => {

   // }

   const { otp } = user;

   const handleCopy = (url: string, type: string) => {
      copyToClipboard(url);
      fetchSuccess({
         message: [`success.api_keys.copied.${type}`],
         type: 'success',
      });
   };

   const handleAddCreateKey = () => {
      const payload: ApiKeys2FAModal['payload'] = {
         active: true,
         action: 'createKey',
      };
      toggleApiKeys2FAModal(payload);
      setOtpCode('');
   };

   const handleCreateKey = () => {
      const payload: ApiKeyCreateFetch['payload'] = { totp_code: otpCode };
      createApiKey(payload);
      setOtpCode('');
   };

   const handleCreateSuccess = () => {
      const payload: ApiKeys2FAModal['payload'] = { active: false };
      toggleApiKeys2FAModal(payload);
      setOtpCode('');
   };

   const handleUpdateKey = () => {
      const apiKey: ApiKeyDataInterface = { ...modal.apiKey } as any;
      apiKey.state = apiKey.state === 'active' ? 'disabled' : 'active';
      const payload: ApiKeyUpdateFetch['payload'] = {
         totp_code: otpCode,
         apiKey,
      };
      updateApiKey(payload);
      setOtpCode('');
   };

   const handleDeleteKey = () => {
      const payload: ApiKeyDeleteFetch['payload'] = {
         kid: (modal.apiKey && modal.apiKey.kid) || '',
         totp_code: otpCode,
      };
      deleteApiKey(payload);
      setOtpCode('');
   };

   const renderOnClick = () => {
      switch (modal.action) {
         case 'createKey':
            handleCreateKey();
            break;
         case 'createSuccess':
            handleCreateSuccess();
            break;
         case 'updateKey':
            handleUpdateKey();
            break;
         case 'deleteKey':
            handleDeleteKey();
            break;
         default:
            break;
      }
   };

   const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         if (otpCode.length === 6) {
            renderOnClick();
         }
      }
   };

   const renderModalBody = () => {
      const secret = modal && modal.apiKey ? modal.apiKey.secret : '';
      let body;
      let button;
      const isDisabled = !otpCode.match(/.{6}/g);
      switch (modal.action) {
         case 'createKey':
            button = (
               <Button
                  text={translate('page.body.profile.apiKeys.modal.btn.create')}
                  disabled={isDisabled}
                  onClick={handleCreateKey}
                  withLoading={isLoading}
               />
            );
            break;
         case 'createSuccess':
            button = (
               <Button
                  text={translate('page.body.profile.apiKeys.modal.btn.create')}
                  onClick={handleCreateSuccess}
                  withLoading={isLoading}
               />
            );
            body = (
               <>
                  <InputGroup
                     label={translate(
                        'page.body.profile.apiKeys.modal.access_key'
                     )}
                     parentClassName="w-full"
                     value={(modal.apiKey && modal.apiKey.kid) || ''}
                     icon={
                        <div
                           onClick={() =>
                              handleCopy(
                                 (modal.apiKey && modal.apiKey.kid) || '',
                                 'access'
                              )
                           }
                           className="cursor-copy rounded bg-primary1 p-1 text-x font-medium text-neutral8 transition-all duration-300 hover:p-1.5">
                           {translate('page.body.profile.content.copyLink')}
                        </div>
                     }
                  />
                  <div className="flex space-x-3">
                     <span className="text-5xl font-bold text-primary4">
                        &#9888;
                     </span>
                     <div>
                        <div className="font-medium">
                           {translate(
                              'page.body.profile.apiKeys.modal.secret_key'
                           )}
                        </div>
                        <div className="text-xs leading-custom4 tracking-wider text-neutral4">
                           {translate(
                              'page.body.profile.apiKeys.modal.secret_key_info'
                           )}{' '}
                           {translate(
                              'page.body.profile.apiKeys.modal.secret_key_store'
                           )}
                        </div>
                     </div>
                  </div>
                  <InputGroup
                     label={translate(
                        'page.body.profile.apiKeys.modal.secret_key'
                     )}
                     parentClassName="w-full"
                     value={secret || ''}
                     icon={
                        <div
                           onClick={() => handleCopy(secret || '', 'secret')}
                           className="rounded bg-primary1 p-1 text-x font-medium text-neutral8 transition-all duration-300 hover:p-1.5">
                           {translate('page.body.profile.content.copyLink')}
                        </div>
                     }
                  />
                  <div>
                     <div className="font-medium">
                        {translate('page.body.profile.apiKeys.modal.note')} :
                     </div>
                     <div className="text-xs leading-custom4 tracking-wider text-neutral4">
                        {translate(
                           'page.body.profile.apiKeys.modal.note_content'
                        )}
                     </div>
                  </div>
                  {button}
               </>
            );
            break;
         case 'updateKey':
            button = (
               <Button
                  text={
                     modal.apiKey && modal.apiKey.state === 'active'
                        ? translate(
                             'page.body.profile.apiKeys.modal.btn.disabled'
                          )
                        : translate(
                             'page.body.profile.apiKeys.modal.btn.activate'
                          )
                  }
                  disabled={isDisabled}
                  onClick={handleUpdateKey}
                  withLoading={isLoading}
               />
            );
            break;
         case 'deleteKey':
            button = (
               <Button
                  text={translate('page.body.profile.apiKeys.modal.btn.delete')}
                  disabled={isDisabled}
                  onClick={handleDeleteKey}
                  withLoading={isLoading}
               />
            );
            break;
         default:
            break;
      }
      body = !body ? (
         <div
            className={
               modal.action === 'createSuccess' ? '' : 'space-y-8 pt-10'
            }>
            <div className="space-y-3">
               <div className="text-center font-dm text-2xl leading-9 tracking-custom">
                  {translate('page.auth.2fa.title')}
               </div>
               <div className="mx-auto max-w-82 text-center text-xs leading-5 text-neutral4">
                  Enter 6 digit google authentication code to continue
               </div>
            </div>
            <InputOtp
               length={6}
               className="-mx-2 flex"
               onChangeOTP={setOtpCode}
               onKeyPress={handleEnterPress as any}
            />
            {button}
         </div>
      ) : (
         body
      );

      return <>{body}</>;
   };

   return (
      <>
         <LayoutProfile
            mainRef={mainRef}
            title="API keys"
            withBreadcrumbs={{
               display: 'Home',
               href: '/',
               active: 'API keys',
            }}>
            {otp ? (
               <div>
                  <div className="flex items-center justify-between">
                     <div className="text-2xl font-semibold leading-custom2 tracking-custom1">
                        My API keys
                     </div>
                     <Button
                        text="Generate new API key"
                        size="normal"
                        width="noFull"
                        variant="outline"
                        icLeft={
                           <svg className="mr-3 h-4 w-4 fill-neutral4 transition-all duration-300 group-hover:fill-neutral8">
                              <use xlinkHref="#icon-plus" />
                           </svg>
                        }
                        onClick={handleAddCreateKey}
                     />
                  </div>
                  <div className="mb-8 mt-6 text-xs leading-custom4 text-neutral4">
                     Digiassets APIs are a way for traders to access their
                     exchange account programmatically so they can trade without
                     logging into the exchange. With APIs, traders can use 3rd
                     party services to execute trades, manage their portfolio,
                     collect data on their account, and implement complex
                     strategies.
                  </div>
                  <div className="space-y-8">
                     <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                           <thead>
                              <tr className="border-b border-neutral7 dark:border-neutral2">
                                 <th className="p-4 pl-0 text-left text-xs font-semibold leading-custom4 dark:text-neutral5">
                                    {translate(
                                       'page.body.profile.apiKeys.table.header.kid'
                                    )}
                                 </th>
                                 <th className="p-4 text-left text-xs font-semibold leading-custom4 dark:text-neutral5">
                                    {translate(
                                       'page.body.profile.apiKeys.table.header.algorithm'
                                    )}
                                 </th>
                                 <th className="p-4 text-left text-xs font-semibold leading-custom4 dark:text-neutral5">
                                    {translate(
                                       'page.body.profile.apiKeys.table.header.state'
                                    )}
                                 </th>
                                 <th className="p-4 text-left text-xs font-semibold leading-custom4 dark:text-neutral5">
                                    {translate(
                                       'page.body.profile.apiKeys.table.header.created'
                                    )}
                                 </th>
                                 <th className="p-4 text-left text-xs font-semibold leading-custom4 dark:text-neutral5">
                                    {translate(
                                       'page.body.profile.apiKeys.table.header.updated'
                                    )}
                                 </th>
                                 <th className="p-4 text-xs font-semibold leading-custom4 dark:text-neutral5" />
                                 <th className="p-4 pr-0 text-xs font-semibold leading-custom4 dark:text-neutral5" />
                              </tr>
                           </thead>
                           <tbody>
                              {!!!dataLoaded ? (
                                 <>
                                    <tr>
                                       <td
                                          colSpan={7}
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
                                          colSpan={7}
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
                                          colSpan={7}
                                          className="px-4 py-3 last:pb-0">
                                          <Skeleton
                                             height={20}
                                             isWithFull
                                             rounded="md"
                                          />
                                       </td>
                                    </tr>
                                 </>
                              ) : apiKeys.length ? (
                                 apiKeys.map(apiKey => {
                                    const {
                                       kid,
                                       algorithm,
                                       state,
                                       created_at,
                                       updated_at,
                                    } = apiKey;
                                    return (
                                       <tr
                                          key={kid}
                                          className="[&:not(:last-child)]:border-b [&:not(:last-child)]:border-neutral6 dark:[&:not(:last-child)]:border-neutral3">
                                          <td className="p-4 pl-0">
                                             <div className="font-medium">
                                                {kid}
                                             </div>
                                          </td>
                                          <td className="p-4">
                                             <div className="font-medium">
                                                {algorithm}
                                             </div>
                                          </td>
                                          <td className="p-4">
                                             <div
                                                className={`font-medium ${
                                                   state === 'active'
                                                      ? 'text-primary5'
                                                      : state === 'disabled'
                                                      ? 'text-primary4'
                                                      : 'text-primary1'
                                                }`}>
                                                {state}
                                             </div>
                                          </td>
                                          <td className="p-4">
                                             <div className="font-medium">
                                                {localeDate(
                                                   created_at,
                                                   'shortDate'
                                                )
                                                   .split(' ')
                                                   .shift()}
                                             </div>
                                          </td>
                                          <td className="p-4">
                                             <div className="font-medium">
                                                {localeDate(
                                                   updated_at,
                                                   'shortDate'
                                                )
                                                   .split(' ')
                                                   .shift()}
                                             </div>
                                          </td>
                                          <td className="p-4 align-middle">
                                             <Switch
                                                onClick={() =>
                                                   handleUpdateAPIKey(apiKey)
                                                }
                                                checked={state === 'active'}
                                             />
                                          </td>
                                          <td className="p-4 pr-0">
                                             <svg
                                                onClick={() =>
                                                   handleDestroyAPIKey(apiKey)
                                                }
                                                className="h-6 w-6 cursor-pointer fill-neutral4 transition-all duration-300 hover:fill-neutral2 dark:hover:fill-neutral8">
                                                <use xlinkHref="#icon-close-circle" />
                                             </svg>
                                          </td>
                                       </tr>
                                    );
                                 })
                              ) : (
                                 <tr>
                                    <td colSpan={7}>
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
                        page={pageIndex}
                        nextPageExists={nextPageExists}
                        onClickPrevPage={onClickPrevPage}
                        onClickNextPage={onClickNextPage}
                     />
                  </div>
               </div>
            ) : (
               <div className="space-y-8">
                  <img
                     srcSet={`${imgLock2} 2x`}
                     src={imgLock}
                     alt="Images lock api keys"
                     title="Images lock api keys"
                     className="mx-auto"
                  />
                  <div className="text-center font-medium leading-custom4 text-neutral4">
                     Before you can access the api keys feature, you must enable
                     2FA
                  </div>
                  <div className="text-center">
                     <Button
                        text="Enable 2FA"
                        onClick={() => history.push('/2fa')}
                        width="noFull"
                     />
                  </div>
               </div>
            )}
         </LayoutProfile>
         <Portal
            show={modal.active}
            close={handleCloseTFAModal}
            title={
               modal.action === 'createSuccess'
                  ? translate('page.body.profile.apiKeys.modal.created_header')
                  : ''
            }>
            {renderModalBody()}
         </Portal>
      </>
   );
};

const mapStateToProps = (state: RootState): ReduxProps => ({
   apiKeys: selectApiKeys(state),
   dataLoaded: selectApiKeysDataLoaded(state),
   isLoading: selectApiKeysLoading(state),
   modal: selectApiKeysModal(state),
   user: selectUserInfo(state),
   pageIndex: selectApiKeysPageIndex(state),
   firstElemIndex: selectApiKeysFirstElemIndex(state, 4),
   lastElemIndex: selectApiKeysLastElemIndex(state, 4),
   nextPageExists: selectApiKeysNextPageExists(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
   DispatchProps,
   {}
> = dispatch => ({
   toggleApiKeys2FAModal: (payload: ApiKeys2FAModal['payload']) =>
      dispatch(apiKeys2FAModal(payload)),
   apiKeysFetch: payload => dispatch(apiKeysFetch(payload)),
   createApiKey: payload => dispatch(apiKeyCreateFetch(payload)),
   updateApiKey: payload => dispatch(apiKeyUpdateFetch(payload)),
   deleteApiKey: payload => dispatch(apiKeyDeleteFetch(payload)),
   fetchSuccess: payload => dispatch(alertPush(payload)),
});

export const ApiKeys = compose(
   injectIntl,
   withRouter,
   connect(mapStateToProps, mapDispatchToProps)
)(ApiKeysFC) as FunctionComponent;
