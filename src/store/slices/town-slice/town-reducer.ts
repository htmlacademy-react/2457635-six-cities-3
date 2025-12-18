import { createSelector } from '@reduxjs/toolkit';
import { City, CommonSlice } from '../../../types/models';

export const currentCityName = (state: CommonSlice) => state.towns.currentCity.name;
const currentCity = (state: CommonSlice) => state.towns.currentCity;

export const getCityName = createSelector([currentCityName], (name: string) => name);
export const getCity = createSelector([currentCity], (city: City) => city);
