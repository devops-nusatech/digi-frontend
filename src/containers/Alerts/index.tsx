import React, { Component, FunctionComponent } from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from '../../';
import {
   alertDelete,
   alertDeleteByIndex,
   AlertState,
   RootState,
   selectAlertState,
   selectCurrentColorTheme,
} from 'modules';
// import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface ReduxProps {
   alerts: AlertState;
   theme: string;
}

interface DispatchProps {
   alertDelete: typeof alertDelete;
   alertDeleteByIndex: typeof alertDeleteByIndex;
}

type Props = ReduxProps & DispatchProps & IntlProps;

class AlertComponent extends Component<Props> {
   public deleteAlertByIndex = (key: number) => this.props.alertDeleteByIndex(key);

   public translate = (id: string) => id ? this.props.intl.formatMessage({ id }) : '';

   public notify = (msg: string, type: string): string =>
      `${type === 'error'
         ? toast.error(msg)
         : toast.success(msg)}`;

   public render() {
      const { theme } = this.props;
      return (
         <>
            {this.props.alerts.alerts.map(({ message, type, code }) => typeof message?.map === 'function' ? message?.map((msg, index) => (
               <div
                  key={index}
                  className="hidden"
                  onClick={() => this.deleteAlertByIndex(index)}
               >
                  {this.notify(
                     `${this.translate(msg)} ${(code && code.toString(10)) === undefined ? '' : code && code.toString(10)}`,
                     `${type === 'error' ? 'error' : type}`
                  )}
               </div>
            )) : (
               this.notify('Server Error', 'error')
            ))}
            <ToastContainer
               autoClose={3000}
               theme={theme === 'dark' ? 'colored' : 'light'}
            />
         </>
      );
   }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
   alerts: selectAlertState(state),
   theme: selectCurrentColorTheme(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
   alertDelete: () => dispatch(alertDelete()),
   alertDeleteByIndex: payload => dispatch(alertDeleteByIndex(payload)),
});

export const Alerts = injectIntl(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(
      AlertComponent
   )) as FunctionComponent;
