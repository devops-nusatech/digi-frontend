import React, { FC } from 'react';
import { compose } from 'redux';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { injectIntl } from 'react-intl';
import { RootState } from 'modules';

interface NotificationsFC {
   q: string;
}

interface ReduxProps {
   type: string;
}

const NotificationsFC: FC<NotificationsFC> = ({ q }, { type }: ReduxProps) => {
   return (
      <div className="">
         Coba
         {q}
         {type}
      </div>
   );
};

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps: MapDispatchToPropsFunction<
   ReduxProps,
   {}
> = dispatch => ({
   type: '',
});

export const Notifications = compose(
   injectIntl,
   connect(mapStateToProps, mapDispatchToProps)
)(NotificationsFC as any) as any;
