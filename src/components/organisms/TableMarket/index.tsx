import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { renderCurrencyIcon } from 'helpers';
import { useMarket } from 'hooks';
import { Nav, Button, PriceChart, Th, Td } from 'components';

export const TableMarket = memo(() => {
   const { formatMessage } = useIntl();

   const {
      filterMarkets,
      currentBidUnitsList,
      currentBidUnit,
      setCurrentBidUnit,
      handleRedirectToTrading,
   } = useMarket();

   return (
      <section className="relative lg:mb-28 lg2:mb-34">
         <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-20">
            <div className="mb-10 flex justify-between">
               <div className="whitespace-normal font-dm text-4.5xl font-bold md:text-5xl">
                  Market trend
               </div>
               <div className="inline-flex h-12 cursor-pointer items-center justify-center whitespace-nowrap rounded-3xl bg-none py-0 px-6 font-dm text-base shadow-border transition-all duration-300 hover:-translate-y-1 hover:bg-neutral2 hover:text-neutral8 hover:shadow-sm dark:border-2 dark:border-solid  dark:border-neutral4 dark:text-neutral8 dark:shadow-none">
                  View more
               </div>
            </div>
            <div className="mb-[70px] flex items-start space-x-6">
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
            </div>
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
                        filterMarkets?.map(
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
                                    className="transition-background group duration-200">
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
                                             <PriceChart
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
         </div>
      </section>
   );
});
