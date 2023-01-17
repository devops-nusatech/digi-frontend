import classnames from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { compose } from 'redux';
import { IntlProps } from '../../';
import { ChevronIcon } from '../../assets/images/ChevronIcon';
import { TipIcon } from '../../assets/images/TipIcon';
import { TrashBin } from '../../assets/images/TrashBin';
import {
   beneficiariesCreateData,
   beneficiariesDelete,
   Beneficiary,
   BeneficiaryBank,
   MemberLevels,
   memberLevelsFetch,
   RootState,
   selectBeneficiaries,
   selectBeneficiariesActivateSuccess,
   selectBeneficiariesCreate,
   selectBeneficiariesCreateSuccess,
   selectMemberLevels,
   selectMobileDeviceState,
   selectUserInfo,
   sendError,
   User,
} from '../../modules';
import { CommonError } from '../../modules/types';
import { BeneficiariesActivateModal } from './BeneficiariesActivateModal';
import { BeneficiariesAddModal } from './BeneficiariesAddModal';
import { BeneficiariesFailAddModal } from './BeneficiariesFailAddModal';
import { defaultBeneficiary } from 'screens/WalletDetails/types';

interface ReduxProps {
   beneficiaries: Beneficiary[];
   beneficiariesAddData: Beneficiary;
   beneficiariesAddSuccess: boolean;
   beneficiariesAddError?: CommonError;
   beneficiariesActivateError?: CommonError;
   memberLevels?: MemberLevels;
   beneficiariesActivateSuccess: boolean;
   userData: User;
   isMobileDevice: boolean;
}

interface DispatchProps {
   deleteAddress: typeof beneficiariesDelete;
   memberLevelsFetch: typeof memberLevelsFetch;
   beneficiariesCreateData: typeof beneficiariesCreateData;
   sendError: typeof sendError;
}

interface OwnProps {
   currency: string;
   type: 'fiat' | 'coin';
   onChangeValue: (beneficiary: Beneficiary) => void;
}

interface State {
   currentWithdrawalBeneficiary: Beneficiary;
   isOpenAddressModal: boolean;
   isOpenConfirmationModal: boolean;
   isOpenDropdown: boolean;
   isOpenTip: boolean;
   isOpenFailModal: boolean;
}

type Props = ReduxProps & DispatchProps & OwnProps & IntlProps;

// tslint:disable jsx-no-multiline-js
class BeneficiariesComponent extends React.Component<Props, State> {
   constructor(props: Props) {
      super(props);
      this.state = {
         currentWithdrawalBeneficiary: defaultBeneficiary,
         isOpenAddressModal: false,
         isOpenConfirmationModal: false,
         isOpenDropdown: false,
         isOpenTip: false,
         isOpenFailModal: false,
      };
   }

   public componentDidMount() {
      const { currency, beneficiaries, memberLevels } = this.props;
      if (currency && beneficiaries.length) {
         this.handleSetCurrentAddressOnUpdate(beneficiaries);
      }

      if (!memberLevels) {
         this.props.memberLevelsFetch();
      }
   }

   public componentWillReceiveProps(nextProps: Props) {
      const {
         currency,
         beneficiaries,
         beneficiariesAddSuccess,
         beneficiariesActivateSuccess,
      } = this.props;

      if ((nextProps.currency && nextProps.currency !== currency) ||
         (nextProps.beneficiaries.length && nextProps.beneficiaries !== beneficiaries)) {
         this.handleSetCurrentAddressOnUpdate(nextProps.beneficiaries);
      }

      if (nextProps.beneficiariesAddSuccess && !beneficiariesAddSuccess) {
         this.handleToggleAddAddressModal();
         this.handleToggleConfirmationModal();
      }

      if (nextProps.beneficiariesActivateSuccess && !beneficiariesActivateSuccess) {
         this.handleToggleConfirmationModal();
      }
   }

   public render() {
      const {
         currency,
         type,
         beneficiaries,
         beneficiariesAddData,
         isMobileDevice,
      } = this.props;
      const {
         currentWithdrawalBeneficiary,
         isOpenAddressModal,
         isOpenConfirmationModal,
         isOpenFailModal,
      } = this.state;
      const filtredBeneficiaries = this.handleFilterByState(beneficiaries, ['active', 'pending']);

      return (
         <div className="space-y-3">
            <div className="text-xs text-neutral5 leading-none font-bold uppercase">
               {
                  type === 'coin'
                     ? this.translate('page.body.wallets.beneficiaries.title')
                     : this.translate('page.body.wallets.beneficiaries.fiat.title')
               }
            </div>
            {
               filtredBeneficiaries.length
                  ? this.renderAddressDropdown(filtredBeneficiaries, currentWithdrawalBeneficiary, type)
                  : this.renderAddAddress()
            }
            {isOpenAddressModal && (
               <BeneficiariesAddModal
                  currency={currency}
                  type={type}
                  isOpenAddressModal={isOpenAddressModal}
                  handleToggleAddAddressModal={this.handleToggleAddAddressModal}
                  handleToggleConfirmationModal={this.handleToggleConfirmationModal}
               />
            )}
            {isOpenConfirmationModal && (
               <BeneficiariesActivateModal
                  isOpenConfirmationModal={isOpenConfirmationModal}
                  beneficiariesAddData={beneficiariesAddData}
                  handleToggleConfirmationModal={this.handleToggleConfirmationModal}
               />
            )}
            {isOpenFailModal && (
               <BeneficiariesFailAddModal isMobileDevice={isMobileDevice} handleToggleFailModal={this.handleToggleFailModal} />
            )}
         </div>
      );
   }

   private renderAddAddress = () => {
      return (
         <div className="group flex items-center justify-between" onClick={this.handleClickToggleAddAddressModal()}>
            <div className="">
               {this.translate('page.body.wallets.beneficiaries.addAddress')}
            </div>
            <svg className="h-5 w-5 fill-neutral4 group-hover:fill-neutral2 transition-all duration-300">
               <use xlinkHref="#icon-plus" />
            </svg>
         </div>
      );
   };

   private renderDropdownItem = (item: Beneficiary, index: number, type: 'fiat' | 'coin') => {
      const isPending = item.state && item.state.toLowerCase() === 'pending';

      if (type === 'fiat') {
         return (
            <div key={index} className="group relative cursor-default select-none py-2 pl-10 pr-3.5">
               <div className="item__left" onClick={this.handleClickSelectAddress(item)}>
                  <span className="item__left__title">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.name')}</span>
                  <span className="item__left__address">{item.name}</span>
               </div>
               <div className="item__left" onClick={this.handleClickSelectAddress(item)}>
                  <span className="item__left__title">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.fullName')}</span>
                  <span className="item__left__address">{item.data ? (item.data as BeneficiaryBank).full_name : ''}</span>
               </div>
               <div className="item__right">
                  {isPending ? (
                     <span className="item__right__pending">{this.translate('page.body.wallets.beneficiaries.dropdown.pending')}</span>
                  ) : null}
                  <span className="item__right__delete" onClick={this.handleClickDeleteAddress(item)}><TrashBin /></span>
               </div>
            </div>
         );
      }

      return (
         <div key={index} onClick={this.handleClickSelectAddress(item)} className="group flex items-center justify-between relative cursor-default select-none py-2 pl-10 pr-3.5">
            <div>{item?.name}</div>
            <div className="flex items-center space-x-3">
               {isPending && (
                  <div className="text-primary4 text-x">
                     {this.translate('page.body.wallets.beneficiaries.dropdown.pending')}
                  </div>
               )}
               <TrashBin
                  onClick={this.handleClickDeleteAddress(item)}
                  className="w-4 h-4 fill-neutral2 hover:fill-neutral2 transition-all duration-300"
               />
            </div>
         </div>
      );
   };

   private renderDropdownBody = (beneficiaries: Beneficiary[], type: 'fiat' | 'coin') => {
      const dropdownBodyClassName = classnames('z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none', {
         'fiat-body': type === 'fiat',
      });

      return (
         <div className={dropdownBodyClassName}>
            {beneficiaries && beneficiaries.map((item, index) => this.renderDropdownItem(item, index, type))}
         </div>
      );
   };

   private renderDropdownTipCryptoNote = (note: string) => {
      return (
         <div>
            <div className="text-xs font-medium text-neutral4">{this.translate('page.body.wallets.beneficiaries.tipDescription')}</div>
            <div>{note}</div>
         </div>
      );
   };

   private renderDropdownTipCrypto = (currentWithdrawalBeneficiary: Beneficiary) => {
      if (currentWithdrawalBeneficiary) {
         return (
            <div className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
               <div className="py-2 px-3.5 space-y-3">
                  <div>
                     <div className="text-xs font-medium text-neutral4">Addresss</div>
                     <div className="">{currentWithdrawalBeneficiary.data.address}</div>
                  </div>
                  <div>
                     <div className="text-xs font-medium text-neutral4">{this.translate('page.body.wallets.beneficiaries.tipName')}</div>
                     <div>{currentWithdrawalBeneficiary.name}</div>
                  </div>
                  {currentWithdrawalBeneficiary.description && this.renderDropdownTipCryptoNote(currentWithdrawalBeneficiary.description)}
               </div>
            </div>
         );
      }

      return;
   };

   private renderDropdownTipFiatDescription = (description: string) => {
      return (
         <div className="tip__content__block">
            <span className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.description')}</span>
            <span className="tip__content__block__value">{description}</span>
         </div>
      );
   };

   private renderDropdownTipFiat = (currentWithdrawalBeneficiary: Beneficiary) => {
      if (currentWithdrawalBeneficiary) {
         return (
            <div className="pg-beneficiaries__dropdown__tip tip fiat-tip">
               <div className="tip__content">
                  <div className="tip__content__block">
                     <span className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.name')}</span>
                     <span className="tip__content__block__value">{currentWithdrawalBeneficiary.name}</span>
                  </div>
                  {currentWithdrawalBeneficiary.description && this.renderDropdownTipFiatDescription(currentWithdrawalBeneficiary.description)}
                  <div className="tip__content__block">
                     <span className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.account')}</span>
                     <span className="tip__content__block__value">{(currentWithdrawalBeneficiary.data as BeneficiaryBank).account_number}</span>
                  </div>
                  <div className="tip__content__block">
                     <span className="tip__content__block__label">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.bankOfBeneficiary')}</span>
                     <span className="tip__content__block__value">{(currentWithdrawalBeneficiary.data as BeneficiaryBank).bank_name}</span>
                  </div>
               </div>
            </div>
         );
      }

      return;
   };

   private renderAddressDropdown = (beneficiaries: Beneficiary[], currentWithdrawalBeneficiary: Beneficiary, type: 'fiat' | 'coin') => {
      const { isOpenDropdown, isOpenTip } = this.state;
      const isPending = currentWithdrawalBeneficiary.state && currentWithdrawalBeneficiary.state.toLowerCase() === 'pending';

      if (type === 'fiat') {
         return (
            <div className="relative w-full h-12 pl-3.5 pr-12 rounded-xl font-medium leading-12 outline-none border-2 border-neutral6 bg-none bg-transparent shadow-none focus:border-neutral4 transition-all duration-300 dark:border-neutral3 dark:focus:border-neutral4">
               <div className="pg-beneficiaries__dropdown__select fiat-select select" onClick={this.handleToggleDropdown}>
                  <div className="select__left">
                     <span className="select__left__title">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.name')}</span>
                     <span className="select__left__address">{currentWithdrawalBeneficiary.name}</span>
                     <span className="select__left__title">{this.translate('page.body.wallets.beneficiaries.dropdown.fiat.fullName')}</span>
                     <span className="select__left__address">{currentWithdrawalBeneficiary.data ? (currentWithdrawalBeneficiary.data as BeneficiaryBank).full_name : ''}</span>
                  </div>
                  <div className="select__right">
                     {isPending ? (
                        <span className="select__right__pending">{this.translate('page.body.wallets.beneficiaries.dropdown.pending')}</span>
                     ) : null}
                     <span className="select__right__tip" onMouseOver={this.handleToggleTip} onMouseOut={this.handleToggleTip}><TipIcon /></span>
                     <span className="select__right__select">{this.translate('page.body.wallets.beneficiaries.dropdown.select')}</span>
                     <span className="select__right__chevron"><ChevronIcon /></span>
                  </div>
               </div>
               {isOpenDropdown && this.renderDropdownBody(beneficiaries, type)}
               {isOpenTip && this.renderDropdownTipFiat(currentWithdrawalBeneficiary)}
            </div>
         );
      }

      return (
         <div>
            <div className="relative">
               <button
                  type="button"
                  onClick={this.handleToggleDropdown}
                  className="w-full h-12 pl-3.5 pr-17 rounded-xl font-medium leading-12 outline-none border-2 border-neutral6 bg-none bg-transparent shadow-none focus:border-neutral4 transition-all duration-300 dark:border-neutral3 dark:focus:border-neutral4 read-only:bg-neutral7 text-left truncate"
               >
                  {currentWithdrawalBeneficiary.data.address}
               </button>
               <div className="absolute flex items-center right-0 top-0 h-12">
                  <TipIcon
                     onMouseOut={this.handleToggleTip}
                     onMouseOver={this.handleToggleTip}
                     className="w-4 h-4 fill-primary4 stroke-primary4 transition-all duration-300"
                  />
                  <button
                     type="button"
                     onClick={this.handleClickToggleAddAddressModal()}
                     className="flex items-center justify-center text-center w-12 transition-all duration-300"
                  >
                     <svg className="fill-neutral4 group-hover:fill-neutral2 h-6 w-6 transition-all duration-300">
                        <use xlinkHref="#icon-plus" />
                     </svg>
                  </button>
               </div>
               {isOpenDropdown && this.renderDropdownBody(beneficiaries, type)}
               {isOpenTip && this.renderDropdownTipCrypto(currentWithdrawalBeneficiary)}
            </div>
         </div>
      );
   };

   private handleClickDeleteAddress = (item: Beneficiary) => () => {
      this.handleDeleteAddress(item);
   };

   private handleClickSelectAddress = (item: Beneficiary) => () => {
      if (item.state && item.state.toLowerCase() === 'pending') {
         this.props.beneficiariesCreateData({ id: item.id } as any);
         this.handleToggleConfirmationModal();
      } else {
         this.handleSetCurrentAddress(item);
      }
   };

   private handleClickToggleAddAddressModal = () => () => {
      const { memberLevels, userData, beneficiaries } = this.props;

      if (memberLevels && (userData.level < memberLevels.withdraw.minimum_level)) {
         this.handleToggleFailModal();
      } else if (beneficiaries && beneficiaries.length >= 10) {
         this.props.sendError({
            error: { message: ['error.beneficiaries.max10.addresses'] },
            processingType: 'alert',
         });
      } else {
         this.handleToggleAddAddressModal();
      }
   };

   private handleDeleteAddress = (item: Beneficiary) => {
      const payload = {
         id: item.id,
      };

      this.props.deleteAddress(payload);
   };

   private handleFilterByState = (beneficiaries: Beneficiary[], filter: string | string[]) => {
      if (beneficiaries.length) {
         return beneficiaries.filter(item => filter.includes(item.state.toLowerCase()));
      }

      return [];
   };

   private handleSetCurrentAddress = (item: Beneficiary) => {
      if (item.data) {
         this.setState({
            currentWithdrawalBeneficiary: item,
            isOpenDropdown: false,
         });
         this.props.onChangeValue(item);
      }
   };

   private handleSetCurrentAddressOnUpdate = (beneficiaries: Beneficiary[]) => {
      let filteredByState = this.handleFilterByState(beneficiaries, 'active');

      if (!filteredByState.length) {
         filteredByState = this.handleFilterByState(beneficiaries, 'pending');
      }

      if (filteredByState.length) {
         this.handleSetCurrentAddress(filteredByState[0]);
      }
   };

   private handleToggleAddAddressModal = () => {
      this.setState(prevState => ({
         isOpenAddressModal: !prevState.isOpenAddressModal,
      }));
   };

   private handleToggleConfirmationModal = () => {
      this.setState(prevState => ({
         isOpenConfirmationModal: !prevState.isOpenConfirmationModal,
      }));
   };

   private handleToggleFailModal = () => {
      this.setState(prevState => ({
         isOpenFailModal: !prevState.isOpenFailModal,
      }));
   };

   private handleToggleDropdown = () => {
      this.setState(prevState => ({
         isOpenDropdown: !prevState.isOpenDropdown,
      }));
   };

   private handleToggleTip = () => {
      this.setState(prevState => ({
         isOpenTip: !prevState.isOpenTip,
         isOpenDropdown: false,
      }));
   };

   private translate = (id: string) => this.props.intl.formatMessage({ id });
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   beneficiaries: selectBeneficiaries(state),
   beneficiariesAddData: selectBeneficiariesCreate(state),
   memberLevels: selectMemberLevels(state),
   beneficiariesAddSuccess: selectBeneficiariesCreateSuccess(state),
   userData: selectUserInfo(state),
   isMobileDevice: selectMobileDeviceState(state),
   beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
   deleteAddress: payload => dispatch(beneficiariesDelete(payload)),
   memberLevelsFetch: () => dispatch(memberLevelsFetch()),
   beneficiariesCreateData: payload => dispatch(beneficiariesCreateData(payload)),
   sendError: payload => dispatch(sendError(payload)),
});

// tslint:disable-next-line:no-any
export const Beneficiaries = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps),
)(BeneficiariesComponent) as any; // tslint:disable-line
