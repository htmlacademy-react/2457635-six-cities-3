import { createSelector } from '@reduxjs/toolkit';
import { City } from '../../../types/models';
import { State } from '../../../types/state';
import { NameSpace } from '../../../constants';

export const currentCityName = (state: Pick<State, NameSpace.Town>) => state[NameSpace.Town].currentCity.name;
const currentCity = (state: Pick<State, NameSpace.Town>) => state[NameSpace.Town].currentCity;

export const getCityName = createSelector([currentCityName], (name: string) => name);
export const getCity = createSelector([currentCity], (city: City) => city);
