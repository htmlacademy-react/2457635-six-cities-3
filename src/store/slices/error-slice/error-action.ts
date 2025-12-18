import { createAction } from '@reduxjs/toolkit';

export const setError = createAction<string | null>('/setError');
