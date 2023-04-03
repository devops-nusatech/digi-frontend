import React, { memo, useCallback, useMemo } from 'react';
import {
   Decimal,
   FlexCenter,
   Info,
   SVG,
   Skeleton,
   Text2xl,
   TextXs,
} from 'components';
import { CurrentMarket, MarketTicker, Translate } from 'types';
import { DEFAULT_TICKER } from '../../../constants';

interface TradingHeaderProps extends CurrentMarket, MarketTicker, Translate {}

export const TradingHeader = memo(
   ({ currentMarket, marketTickers, translate }: TradingHeaderProps) => {
      const ticker = useMemo(
         () =>
            currentMarket &&
            (marketTickers[currentMarket.id] || DEFAULT_TICKER),
         [currentMarket, marketTickers]
      );
      const isPositive = useMemo(
         () => currentMarket && /\+/.test(ticker?.price_change_percent),
         [currentMarket, ticker?.price_change_percent]
      );
      const bidUnit = useMemo(
         () => currentMarket && currentMarket.quote_unit.toUpperCase(),
         [currentMarket]
      );
      const name = useMemo(
         () => currentMarket && currentMarket?.name,
         [currentMarket]
      );
      const fullname = useMemo(
         () => currentMarket && currentMarket?.fullname,
         [currentMarket]
      );
      const pricePrecision = useMemo(
         () => currentMarket && currentMarket?.price_precision,
         [currentMarket]
      );

      const renderStatictics = useCallback(
         (icon: string, title: string, value: string) => (
            <div className="w-1/2 shrink-0 grow-0 basis-1/2 pr-6 md:w-auto md:grow md:basis-auto lg:grow-0 lg2:w-40 lg2:basis-40 md-max:mt-3 [&:not(:last-child)]:mr-6 [&:not(:last-child)]:border-r [&:not(:last-child)]:border-neutral6 [&:not(:last-child)]:dark:border-neutral3">
               <FlexCenter className="mb-1 gap-1">
                  <SVG
                     className="h-4 w-4 fill-neutral4"
                     xlinkHref={icon}
                  />
                  <TextXs
                     text={translate(`page.body.trade.toolBar.${title}`)}
                  />
               </FlexCenter>
               <div className="font-medium text-neutral1 dark:text-neutral8">
                  {value}
               </div>
            </div>
         ),
         [translate]
      );

      return (
         <div className="block rounded bg-neutral8 p-5 dark:bg-shade2 lg:flex lg:items-center">
            <div className="block md:flex md:items-center md-max:mb-6 lg-max:mb-4">
               <div className="md:mr-8 md-max:mb-2">
                  <div className="mb-1 flex items-center gap-1">
                     <Text2xl
                        text={
                           name || (
                              <Skeleton
                                 height={30}
                                 width={120}
                              />
                           )
                        }
                        className="text-neutral1 dark:text-neutral8"
                     />
                     <Info
                        text={ticker?.price_change_percent}
                        theme={isPositive ? 'positive' : 'negative'}
                     />
                  </div>
                  <TextXs
                     text={
                        fullname || (
                           <Skeleton
                              height={16}
                              width={70}
                           />
                        )
                     }
                     className="font-semibold"
                  />
               </div>
               <div>
                  <Text2xl
                     text={Decimal.format(ticker?.last, pricePrecision!, ',')}
                     className="text-primary4"
                  />
                  <div className="flex items-center gap-1">
                     <svg className="h-4 w-4 fill-neutral4">
                        <use xlinkHref="#icon-coin" />
                     </svg>
                     <TextXs
                        text={
                           Decimal.format(
                              +ticker?.last! - +ticker?.open!,
                              pricePrecision!,
                              ','
                           ) || (
                              <Skeleton
                                 height={16}
                                 width={70}
                              />
                           )
                        }
                        className="font-semibold"
                     />
                  </div>
               </div>
            </div>
            <div className="flex lg:ml-auto md-max:-mt-3 md-max:flex-wrap">
               {renderStatictics(
                  'clock',
                  'change',
                  ticker?.price_change_percent!
               )}
               {renderStatictics(
                  'arrow-top',
                  'highest',
                  `${Decimal.format(ticker?.high, pricePrecision!, ',')} ${
                     typeof bidUnit !== 'undefined' ? bidUnit : ''
                  }`
               )}
               {renderStatictics(
                  'arrow-bottom',
                  'lowest',
                  `${Decimal.format(ticker?.low, pricePrecision!, ',')} ${
                     typeof bidUnit !== 'undefined' ? bidUnit : ''
                  }`
               )}
               {renderStatictics(
                  'chart',
                  'volume',
                  `${Decimal.format(ticker?.volume, pricePrecision!, ',')} ${
                     typeof bidUnit !== 'undefined' ? bidUnit : ''
                  }`
               )}
            </div>
         </div>
      );
   }
);
