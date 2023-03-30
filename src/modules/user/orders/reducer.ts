import { CommonError, CommonState } from '../../types';
import { OrdersAction } from './actions';
import {
   ORDER_EXECUTE_DATA,
   ORDER_EXECUTE_ERROR,
   ORDER_EXECUTE_FETCH,
   ORDERS_SET_AMOUNT,
   ORDERS_SET_CURRENT_PRICE,
   ORDERS_SET_ORDER_TYPE,
   ORDERS_SET_AVAILABLE_QUOTE,
   ORDERS_SET_AVAILABLE_BASE,
} from './constants';

export interface OrdersState extends CommonState {
   executeLoading: boolean;
   executeError?: CommonError;
   currentPrice: number | undefined;
   amount: string;
   orderType: string;
   availableQuote: number;
   availableBase: number;
}

const initialState: OrdersState = {
   executeLoading: false,
   currentPrice: undefined,
   amount: '',
   orderType: '',
   availableQuote: 0,
   availableBase: 0,
};

export const ordersReducer = (state = initialState, action: OrdersAction) => {
   switch (action.type) {
      case ORDER_EXECUTE_FETCH:
         return {
            ...state,
            executeLoading: true,
            executeError: undefined,
         };
      case ORDER_EXECUTE_DATA:
         return {
            ...state,
            executeLoading: false,
            executeError: undefined,
         };
      case ORDER_EXECUTE_ERROR:
         return {
            ...state,
            executeLoading: false,
            executeError: action.error,
         };
      case ORDERS_SET_CURRENT_PRICE:
         return {
            ...state,
            currentPrice: action.payload,
         };
      case ORDERS_SET_AMOUNT:
         return {
            ...state,
            amount: action.payload,
         };
      case ORDERS_SET_ORDER_TYPE:
         return {
            ...state,
            orderType: action.payload,
         };

      case ORDERS_SET_AVAILABLE_QUOTE:
         return {
            ...state,
            availableQuote: action.payload,
         };
      case ORDERS_SET_AVAILABLE_BASE:
         return {
            ...state,
            availableBase: action.payload,
         };
      default:
         return state;
   }
};
