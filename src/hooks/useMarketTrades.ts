import { recentTradesFetch, selectCurrentMarket, selectRecentTrades } from "modules";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useMarketTrades = () => {
   const dispatch = useDispatch();
   let currentMarket;
   currentMarket = useSelector(selectCurrentMarket);
   const trades = useSelector(selectRecentTrades);
   useEffect(() => {
      dispatch(recentTradesFetch(currentMarket));
   }, [dispatch, currentMarket, trades]);
}
