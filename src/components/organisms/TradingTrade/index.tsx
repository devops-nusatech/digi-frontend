import React from 'react';
import { Tab } from '@headlessui/react';
import {
   TradingTradeMyRecent,
   TradingTradeOpenOrder,
} from 'components';

export const TradingTrade = () => {
   const { Group, List, Panels, Panel } = Tab;
   return (
      <div className="lg:block mt-1 rounded p-4 bg-neutral8 dark:bg-shade2">
         <Group>
            <List className="flex items-center space-x-4 mb-4">
               <Tab className={({ selected }) => `flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 outline-none transition-all duration-300  ${selected ? 'bg-neutral6 dark:bg-neutral3' : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'}`}>
                  My trades
               </Tab>
               <Tab className={({ selected }) => `flex py-1.5 px-3 rounded-1xl font-dm font-bold leading-custom3 outline-none transition-all duration-300  ${selected ? 'bg-neutral6 dark:bg-neutral3' : 'text-neutral4 hover:text-neutral2 dark:hover:text-neutral8'}`}>
                  Open orders
               </Tab>
            </List>
            <Panels>
               <Panel>
                  <TradingTradeMyRecent />
               </Panel>
               <Panel>
                  <TradingTradeOpenOrder />
               </Panel>
            </Panels>
         </Group>
      </div>
   )
}
