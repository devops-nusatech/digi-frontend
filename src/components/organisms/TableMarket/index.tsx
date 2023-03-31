import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { renderCurrencyIcon } from 'helpers';
import { useMarket } from 'hooks';
import {
   Nav,
   Button,
   PriceChart2,
   Th,
   Td,
   Heading2,
   Container,
   Section,
   FlexCenter,
} from 'components';
import { Push } from 'types';

interface TableMarketProps extends Push {}

export const TableMarket = memo(({ push }: TableMarketProps) => {
   const { formatMessage } = useIntl();

   const {
      filterMarkets,
      currentBidUnitsList,
      currentBidUnit,
      setCurrentBidUnit,
      handleRedirectToTrading,
   } = useMarket();

   return (
      <Section>
         <Container>
            <div className="mb-10 flex justify-between">
               <Heading2 text="Market trend" />
               <Button
                  text="View more"
                  variant="outline"
                  width="noFull"
                  onClick={() => push('/markets')}
               />
            </div>
            <FlexCenter className="mb-16 gap-6">
               {currentBidUnitsList
                  ?.splice(1, currentBidUnitsList.length)
                  ?.map((item, index) => (
                     <Nav
                        key={index}
                        title={
                           item
                              ? item.toUpperCase()
                              : formatMessage({
                                   id: 'page.body.marketsTable.filter.all',
                                })
                        }
                        onClick={() => setCurrentBidUnit(item)}
                        isActive={item === currentBidUnit}
                     />
                  ))}
            </FlexCenter>
            <div className="overflow-x-auto whitespace-nowrap">
               <table className="w-full table-auto">
                  <thead className="shadow-header dark:shadow-none">
                     <tr>
                        <Th text="#" />
                        <Th text="Market" />
                        <Th text="Last Price" />
                        <Th text="24 Change" />
                        <Th text="Chart" />
                        <Th text="Trade" />
                     </tr>
                  </thead>
                  <tbody>
                     {filterMarkets?.length > 0 ? (
                        filterMarkets
                           ?.slice(0, 10)
                           ?.map(
                              (
                                 {
                                    no,
                                    id,
                                    fullname,
                                    logo_url,
                                    last,
                                    change,
                                    price_change_percent,
                                    kline,
                                    base_unit,
                                 },
                                 index
                              ) => {
                                 const klinesData: number[][] = kline!;
                                 let labels: number[];
                                 let data: number[];
                                 labels = klinesData?.map(e => e[0]);
                                 data = klinesData?.map(e => e[2]);

                                 return (
                                    <tr
                                       key={index}
                                       className="group transition-background duration-200">
                                       <Td
                                          text={no}
                                          className="text-neutral4 group-hover:first:rounded-l-xl"
                                       />
                                       <Td
                                          text={
                                             <div className="flex items-center space-x-5">
                                                <div className="w-10 shrink-0">
                                                   <img
                                                      src={renderCurrencyIcon(
                                                         base_unit,
                                                         logo_url
                                                      )}
                                                      className={`w-full ${
                                                         renderCurrencyIcon(
                                                            base_unit,
                                                            logo_url
                                                         ).includes('http')
                                                            ? 'polygon bg-neutral8'
                                                            : ''
                                                      }`}
                                                      alt={fullname}
                                                      title={fullname}
                                                   />
                                                </div>
                                                <div className="flex space-x-3">
                                                   <div className="capitalize">
                                                      {fullname}
                                                   </div>
                                                   <div className="uppercase text-neutral5">
                                                      {base_unit}
                                                   </div>
                                                </div>
                                             </div>
                                          }
                                       />
                                       <Td text={last} />
                                       <Td
                                          text={
                                             <span
                                                className={
                                                   +(change || 0) < 0
                                                      ? 'text-primary4'
                                                      : 'text-chart1'
                                                }>
                                                {price_change_percent}
                                             </span>
                                          }
                                       />
                                       <Td
                                          text={
                                             <div className="w-24">
                                                <PriceChart2
                                                   id={base_unit}
                                                   theme={
                                                      price_change_percent.includes(
                                                         '+'
                                                      )
                                                         ? 'positive'
                                                         : 'negative'
                                                   }
                                                   labels={labels}
                                                   data={data}
                                                />
                                             </div>
                                          }
                                          className="!py-4.25"
                                       />
                                       <Td
                                          text={
                                             <Button
                                                onClick={() =>
                                                   handleRedirectToTrading(id)
                                                }
                                                text="Trade"
                                                size="normal"
                                                variant="outline"
                                                width="noFull"
                                             />
                                          }
                                          className="group-hover:last:rounded-r-xl"
                                       />
                                    </tr>
                                 );
                              }
                           )
                     ) : (
                        <tr>
                           <td>
                              <div className="">Null</div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </Container>
      </Section>
   );
});
