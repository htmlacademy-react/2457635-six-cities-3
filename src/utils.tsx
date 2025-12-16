import {AuthorizationStatus} from './constants';
import { Result } from './types/models';

export const authorization = (auth: AuthorizationStatus, trueResult: Result, falseResult: Result) => {
  if (auth === AuthorizationStatus.Auth) {
    return trueResult;
  }

  return falseResult;
};

export const getCurrentDate = (convertData: Date) => `${convertData.getFullYear()}-${convertData.getMonth() + 1}-${convertData.getDate()}`;

export const getMonthAndYear = (convertData: Date) => `${convertData.toLocaleString('default', {month: 'long'})}-${convertData.getFullYear()}`;
