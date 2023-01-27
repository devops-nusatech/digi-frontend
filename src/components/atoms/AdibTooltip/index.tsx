import React from 'react';
import Tippy, { TippyProps } from '@tippy.js/react';
import { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

interface TooltipProps extends TippyProps { }

export const AdibTooltip = ({
   content,
   children,
   visible,
   enabled,
   className,
   singleton,
}: TooltipProps) => (
   <Tippy
      content={content}
      visible={visible}
      enabled={enabled}
      className={className}
      singleton={singleton}
      followCursor={true}
      plugins={[followCursor]}
   >
      {children}
   </Tippy>
)
