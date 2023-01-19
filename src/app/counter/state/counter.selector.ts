import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const COUNTER_FEATURE_KEY = 'counter';

export const getCounterState =
  createFeatureSelector<CounterState>(COUNTER_FEATURE_KEY);

export const getCounter = createSelector(
  getCounterState,
  (state: CounterState) => state.counter
);
