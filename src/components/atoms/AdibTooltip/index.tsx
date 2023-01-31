import React from 'react';
import Tippy, { TippyProps } from '@tippy.js/react';
import { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

interface TooltipProps extends TippyProps {
   followCursorProps?: boolean;
}

export const AdibTooltip = ({
   followCursorProps,
   content,
   children,
   visible,
   enabled,
   className,
   singleton,
   ...props
}: TooltipProps) => (
   <Tippy
      content={content}
      visible={visible}
      enabled={enabled}
      className={className}
      singleton={singleton}
      followCursor={followCursorProps}
      plugins={[followCursor]}
      {...props}
   >
      {children}
   </Tippy>
)

AdibTooltip.defaultProps = {
   followCursorProps: true,
}
