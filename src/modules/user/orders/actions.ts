import { CommonError, OrderSide } from '../../types';
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

export interface OrderExecution {
    market: string;
    side: OrderSide;
    volume: string;
    price?: string;
    ord_type?: string;
}

export interface OrderExecuteFetch {
    type: typeof ORDER_EXECUTE_FETCH;
    payload: OrderExecution;
}

export interface OrderExecuteData {
    type: typeof ORDER_EXECUTE_DATA;
}

export interface OrderExecuteError {
    type: typeof ORDER_EXECUTE_ERROR;
    error: CommonError;
}

export interface SetCurrentPrice {
    type: typeof ORDERS_SET_CURRENT_PRICE;
    payload: number | undefined;
}

export interface SetAmount {
    type: typeof ORDERS_SET_AMOUNT;
    payload: string;
}

export interface SetOrderType {
    type: typeof ORDERS_SET_ORDER_TYPE;
    payload: string;
}

export interface SetAvailableQuote {
    type: typeof ORDERS_SET_AVAILABLE_QUOTE;
    payload: number;
}

export interface SetAvailableBase {
    type: typeof ORDERS_SET_AVAILABLE_BASE;
    payload: number;
}

export type OrdersAction =
    OrderExecuteFetch
    | OrderExecuteData
    | OrderExecuteError
    | SetCurrentPrice
    | SetAmount
    | SetOrderType
    | SetAvailableQuote
    | SetAvailableBase;

export const orderExecuteFetch =
    (payload: OrderExecuteFetch['payload']): OrderExecuteFetch => ({
        type: ORDER_EXECUTE_FETCH,
        payload,
    });

export const orderExecuteData = (): OrderExecuteData => ({
    type: ORDER_EXECUTE_DATA,
});

export const orderExecuteError = (error: CommonError): OrderExecuteError => ({
    type: ORDER_EXECUTE_ERROR,
    error,
});

export const setCurrentPrice =
  (payload: SetCurrentPrice['payload']): SetCurrentPrice => ({
    type: ORDERS_SET_CURRENT_PRICE,
    payload,
  });

export const setAmount =
    (payload: SetAmount['payload']): SetAmount => ({
        type: ORDERS_SET_AMOUNT,
        payload,
    });

export const setOrderType =
    (payload: SetOrderType['payload']): SetOrderType => ({
        type: ORDERS_SET_ORDER_TYPE,
        payload,
    });

export const setAvailableQuote = (payload: SetAvailableQuote['payload']): SetAvailableQuote => ({
   type: ORDERS_SET_AVAILABLE_QUOTE,
   payload,
});
export const setAvailableBase = (payload: SetAvailableBase['payload']): SetAvailableBase => ({
   type: ORDERS_SET_AVAILABLE_BASE,
   payload,
});
